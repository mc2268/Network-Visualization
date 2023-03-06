import * as d3 from 'd3';
import useScale from '../hooks/useScale';
import drag from './drag';
import linkArc from './linkArc';
import type { IConfig, IState } from '@/views/NetworkGraph/index.vue';
import drawMeta, { createMeta } from './drawMeta';
import drawText from '@/views/NetworkGraph/RenderBoard/components/ForceDirected/func/drawText';
import { useThrottleFn } from '@vueuse/core';
import drawLink from '@/views/NetworkGraph/RenderBoard/components/ForceDirected/func/drawLink';

export interface INode {
  properties: {
    // 中心度
    centrality: number;
    // [入度，出度]
    inAndOut: [number, number];
  };
  config: {
    // 节点性形状
    shape?: string;
    // 节点颜色
    color: string | [string, string];
    // 是否显示标签
    label: boolean;
    // 节点大小
    size: number;
  };
  id: string;
  vx: number;
  vy: number;
  x: number;
  y: number;
  selected: boolean;
}

export interface ILink {
  id: string;
  source: INode;
  target: INode;
  config: {
    // 形状
    shape: string;
    // 填充色
    stroke: string;
    // 宽度
    strokeWidth: string;
    // 连接长度
    distance: number;
  };
  selected: boolean;
}

export interface IData {
  nodes: INode[];
  links: ILink[];
}

export function renderInit(state: IState) {
  // 根据svg大小设置宽高
  const width = (document.querySelector('#svg') as any).clientWidth;
  const height = (document.querySelector('#svg') as any).clientHeight;

  const initScale = 0.8;

  const svg = d3.select('#svg');

  const mainGroup = svg
    .append('g')
    .attr('width', width)
    .attr('height', height)
    .attr('id', 'mainGroup')
    .attr('transform', `translate(${width / 2},${height / 2}) scale(${initScale})`);

  initZoom();

  const linkGroup = mainGroup
    .append('g')
    .attr('id', 'linkGroup')
    .attr('fill', 'lightgrey') //改之前none
    .attr('stroke-width', 1.5);

  // 在svg中绘制节点
  const nodeGroup = mainGroup.append('g').attr('id', 'nodeGroup'); //节点颜色
  const viewBox = computed(() => [0, 0, width, height]);
  const tooltip = d3.select('#svg-container').append('div').attr('id', 'tooltip').style('display', 'none');
  //用于css设置类样式
  const menu = d3.select('#menu');

  //阻止默认右击事件
  svg.on('contextmenu', function (e) {
    e.preventDefault();
  });

  //点击空白隐藏菜单
  svg.on('click', function () {
    menu.style('display', 'none');
  });

  function initZoom() {
    d3.zoom().scaleTo(svg, initScale);
    d3.zoom().translateTo(svg, 0, 0);

    // scaleExtent缩放范围
    svg.call(getZoom()).on('dblclick.zoom', null);

    function getZoom() {
      return d3
        .zoom()
        .scaleExtent([0.3, 5])
        .on('zoom', d => {
          console.log('d.transform', d.transform);
          mainGroup.attr('transform', function () {
            return `translate(${d.transform.x},${d.transform.y}) scale(${d.transform.k})`;
          });
        });
    }
  }
}

export function render(data: IData, event: { onNodeSelect: (d: INode) => any; onLinkSelect: (d: ILink) => any }) {
  const svg = d3.select('#svg');
  const width = +svg.attr('width');
  const height = +svg.attr('height');
  const tooltip = d3.select('#tooltip');
  const menu = d3.select('#menu');
  const container = d3.select('#mainGroup');

  let nodes = data.nodes;
  let links = data.links;

  const linkGroup = d3.select('#linkGroup');
  const nodeGroup = d3.select('#nodeGroup');

  const STATIC = {
    strength: -10000,
    alpha: 1,
    alphaDecay: 1,
    distanceMax: 600,
    distanceMin: 100,
    scaleExtent: [0.05, 10],
  };

  let simulation: any, graphNodes: any, graphLinks: any;

  init();

  simulation.on('tick', () => {
    initNodesPosition();
    initLinksPosition();
  });

  function init() {
    initSimulation();
    initMarker(); //初始化连线箭头
    initLinks(); //连线需要在节点之前，否则会盖住
    initNodes();
    initDrag();
    // 初始化右键菜单事件
    initMenu();
    // 初始化节点及连接选中事件
    initSelect();
  }

  function initSimulation() {
    simulation = d3
      .forceSimulation(nodes)
      .alpha(STATIC.alpha)
      .force('charge', d3.forceManyBody().distanceMax(STATIC.distanceMax).distanceMin(STATIC.distanceMin))
      .force(
        'link',
        d3
          .forceLink(links)
          .id(d => d.id)
          .distance((d: any) => d.config?.distance || 100)
          .strength(1),
      )
      .force('center', d3.forceCenter(width / 2, height / 2)); //布局中心点
  }

  function initMarker() {
    container
      .append('marker')
      .attr('id', 'resolved')
      .attr('markerUnits', 'userSpaceOnUse')
      .attr('viewBox', '0 -5 10 10') //坐标系的区域
      .attr('refX', 12) //箭头坐标
      .attr('refY', 0)
      .attr('markerWidth', 12) //标识的大小
      .attr('markerHeight', 12)
      .attr('orient', 'auto') //绘制方向，可设定为：auto（自动确认方向）和 角度值
      .attr('stroke-width', 2) //箭头宽度
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5') //箭头的路径
      .attr('fill', '#6cbfed'); //箭头颜色
  }

  function initLinks() {
    graphLinks = linkGroup.selectAll('g.link').data(links).enter().append('g').attr('class', 'link');

    enterLinks(graphLinks);
  }

  function initDrag() {
    graphNodes.call(d3.drag().on('start', dragStart).on('drag', dragging).on('end', dragEnd));
    function dragStart(d: any) {
      if (!d.active) simulation.alphaTarget(0.1).restart();
    }
    function dragging(d: any) {
      d.subject.x = d.x;
      d.subject.y = d.y;
    }
    function dragEnd(d: any) {
      if (!d.active) simulation.alphaTarget(0);
    }
  }

  function initNodes() {
    graphNodes = nodeGroup
      .selectAll('g.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('stroke', (d: any) => {
        return d.selected ? 'red' : 'none';
      });

    enterNodes(graphNodes);
  }

  function initMenu() {
    graphNodes.on('contextmenu', function (e: any, d: any) {
      e.preventDefault();
      console.log('e', e);
      tooltip.style('display', 'none');
      menu
        .style('display', 'block')
        .style('left', `${e.offsetX}px`)
        .style('top', `${e.offsetY}px`)
        .attr('rightClickNode', JSON.stringify(d));
    });
  }

  function initSelect() {
    graphNodes.on('dblclick', function (e: any, d: any) {
      e.stopPropagation();
      event.onNodeSelect(d);
    });

    graphLinks.on('dblclick', function (e: any, d: any) {
      e.stopPropagation();
      event.onLinkSelect(d);
    });
  }

  function enterLinks(selection: any) {
    drawLink(selection);
  }

  function enterNodes(selection: any) {
    drawMeta(selection);
    drawText(selection);
  }

  function reRender(reData: IData) {
    nodes = reData.nodes;
    links = reData.links;

    reInitNodes();
    reInitLinks();

    simulation.nodes(nodes);
    simulation.force(
      'links',
      d3
        .forceLink(links)
        .id((d: any) => d.id)
        .distance((d: any) => d.config?.distance || 100),
    );

    initDrag();
    initMenu();
    initSelect();

    simulation.alpha(STATIC.alpha).alphaDecay(STATIC.alphaDecay).restart();
  }

  function reInitLinks() {
    const linksUpdate = d3.select('g#linkGroup').selectAll('g.link').data(links);

    // 更新
    updateLinks(linksUpdate);

    linksUpdate.exit().remove();

    const linksEnter = linksUpdate.enter().append('g').attr('class', 'link');
    enterLinks(linksEnter);

    graphLinks = linksEnter.merge(linksUpdate);
  }

  function updateLinks(selection: any) {
    selection.each(function (d: any) {
      const self = d3.select(this);
      const path = self.selectAll('path');
      path.remove();
      drawLink(self);
    });
  }

  function reInitNodes() {
    let nodesUpdate = d3
      .select('g#nodeGroup')
      .selectAll('g.node')
      .data(nodes)
      .attr('stroke', (d: any) => {
        return d.selected ? 'red' : 'none';
      });

    updateNodes(nodesUpdate);

    nodesUpdate.exit().remove();

    let nodesEnter = nodesUpdate.enter().append('g').attr('class', 'node');

    enterNodes(nodesEnter);

    graphNodes = nodesEnter.merge(nodesUpdate);
  }

  function updateNodes(selection: any) {
    updateNodeMeta(selection);
    updateNodeText(selection);
  }

  function updateNodeMeta(selection: any) {
    selection.each(function (d) {
      const self = d3.select(this);
      const nodeMeta = self.select('g.nodeMeta');
      const meta = self.select('g.meta');
      meta.remove();
      // 如果没有图元则创建图
      createMeta(nodeMeta);
    });
  }

  function updateNodeText(selection: any) {
    selection
      .select('text')
      .text(d => d.id)
      .style('font-size', (d: any) => d.config?.size / 2)
      .style('display', (d: any) => {
        if (!d.config.label) {
          return 'none';
        }
      });
  }

  function initLinksPosition() {
    graphLinks
      .selectAll('path')
      .attr('d', function (d: any) {
        // M x y L x y 移到M点，画到L点
        return `M ${d.source.x} ${d.source.y} L ${d.target.x} ${d.target.y}`;
      })
      .attr('marker-end', 'url(#resolved)');
  }

  function initNodesPosition() {
    graphNodes.attr('transform', function (d: any) {
      let halfWidth = d.config.size / 2;
      let halfHeight = d.config.size / 2;
      return `translate(${d.x},${d.y})`;
    });
  }

  return {
    reRender,
  };
}
