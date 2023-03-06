import * as d3 from 'd3';

export default class ForceDirected {
  svg: any;
  width: number;
  height: number;
  nodes: any[];
  links: any[];
  tooltip: any;
  container: any;
  force: any;
  graphLinks: any;

  strength = -10000;
  alpha = 1;
  alphaDecay = 0.05;
  distanceMax = 500;
  scaleExtent = [0.05, 10];
  nodeOption = {
    textColor: '#000',
    nodeTextSize: 16,
    imageWidth: 40,
    imageHeight: 40,
    tipsOffset: [10, 10],
  };
  lineOption = {
    textColor: '#000',
    strokeWidth: 4,
    lineTextSize: 10,
    stroke: 'rgb(169,204,255)',
    strokeAnimation: '#b8faff',
    strokeError: 'red',
  };

  constructor(el: string, data: { nodes: any; links: any }) {
    this.svg = d3.select(el);
    this.width = this.svg.attr('width');
    this.height = this.svg.attr('height');
    this.nodes = data.nodes;
    this.links = data.links;
    this.tooltip = d3.select('#tooltips');
  }

  render() {
    this.container = this.svg.append('g').attr('class', 'mainGroup');
    this.init();
  }

  init() {
    this.initForce(); //初始化力模型
    this.initMarker(); //初始化连线箭头
    this.initLinks(); //连线需要在节点之前，否则会盖住
    this.initNodes(); //初始化节点
    this.initDrag(); //初始化节点拖拽
    // this.initZoom(); //初始化缩放
    // this.initNodeHover(); //初始化hover节点信息展示
  }

  initForce() {
    this.force = d3
      .forceSimulation(this.nodes)
      .alpha(this.alpha) //力迭代次数[0,1]，越大布局越好
      .force('charge', d3.forceManyBody().strength(this.strength).distanceMax(this.distanceMax)) //strength节点之间引力，负值越大分的越开。distanceMax连线距离
      .force(
        'link',
        d3.forceLink(this.links).id((d: any) => d.id),
      )
      .force('center', d3.forceCenter(this.width / 2, this.height / 2)); //布局中心点
  }

  initMarker() {
    this.svg
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

  initLinks() {
    this.graphLinks = this.container
      .append('g')
      .attr('class', 'link-group')
      .selectAll('g.link')
      .data(this.links)
      .enter()
      .append('g')
      .attr('class', 'link');

    this.enterLinks(this.graphLinks);
  }
  initNodes() {}

  enterLinks(selection) {
    let _this = this;
    selection.each(function (d) {
      let self = d3.select(this);
      if (d.status !== 2) {
        drawLinkPath.call(_this, self);
      } else {
        drawLinkAnimatePath.call(_this, self);
      }
      if (d.netspeed) {
        drawLinkText.call(_this, self);
      }
    });
  }

  initDrag() {}
}

function drawLinkPath(selection: any) {
  selection
    .append('path')
    .style('stroke', d => {
      if (d.status === 0) {
        return this.lineOption.strokeError;
      } else {
        return this.lineOption.stroke;
      }
    })
    .style('stroke-width', this.lineOption.strokeWidth)
    .attr('class', 'line-path')
    .attr('marker-end', 'url(#resolved)');
}

function drawLinkText(selection: any) {
  selection
    .append('text')
    .text(d => d.netspeed)
    .style('fill', this.lineOption.textColor)
    .style('font-size', this.lineOption.lineTextSize);
}

function drawLinkAnimatePath(selection) {
  selection
    .append('path')
    .style('stroke', this.lineOption.strokeAnimation)
    .style('stroke-width', this.lineOption.strokeWidth)
    .attr('class', 'animate-path')
    .attr('marker-end', 'url(#resolved)');
}
