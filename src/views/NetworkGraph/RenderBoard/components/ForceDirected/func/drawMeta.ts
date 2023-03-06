import type { INodeConfig, shape } from '@/views/NetworkGraph/index.vue';
import * as d3 from 'd3';

// 绘制图元
export default function drawMeta(selection: any) {
  // 图元组,设置该组，内容变化，不会影响图元和文字的层级关系
  const gNodeMeta = selection.append('g').attr('class', 'nodeMeta');
  createMeta(gNodeMeta);
}

// 创建图元
export function createMeta(el: any) {
  const meta = el.append('g').attr('class', 'meta');
  meta.each(function (d: any) {
    const currentTarget = d3.select(this);
    // 有自己的配置则采用自己的，没有自己的配置使用全局配置
    createSingleMeta(currentTarget, {
      shape: d?.config?.shape,
      size: d?.config?.size,
      color: d?.config?.color,
    });
  });

  function createSingleMeta(el: any, { shape, size, color }: { shape: string; size: number; color: string }) {
    switch (shape) {
      case 'circle':
        return circle(el);
      case 'rect':
        return rect(el);
      case 'triangle':
        return triangle(el);
      case 'pie':
        return pie(el, { size, color });
    }
  }
}

// 各自单独的绘画
export function circle(el: any) {
  return el
    .append('circle')
    .attr('class', 'circle')
    .attr('r', (d: any) => d.config.size / 2)
    .attr('fill', (d: any) => d.config.color[0] || '#000');
}

export function rect(el: any) {
  return el
    .append('rect')
    .attr('class', 'rect')
    .attr('width', (d: any) => d.config.size)
    .attr('height', (d: any) => d.config.size)
    .attr('x', (d: any) => -d.config.size / 2)
    .attr('y', (d: any) => -d.config.size / 2)
    .attr('fill', (d: any) => d.config?.color[0] || '#000');
}

export function triangle(el: any) {
  return el
    .append('polygon')
    .attr('class', 'triangle')
    .attr(
      'points',
      (d: any) =>
        `0,-${d.config.size / 2},${d.config.size / 2},${d.config.size / 2}, -${d.config.size / 2},${
          d.config.size / 2
        } `,
    )
    .attr('fill', (d: any) => d.config?.color[0] || '#000');
}

function pie(el: any, config: { size: number; color: string }) {
  const w = config.size;
  const h = config.size;
  const outerRadius = w / 2;
  const innerRadius = 0;
  const color = d3.schemeCategory10;
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const tooltip = d3.select('#tooltip');

  function arcs(data) {
    return d3.pie()(data);
  }

  const pieGroup = el.append('g').attr('class', 'pie').join('g');

  pieGroup
    .append('path')
    .attr('fill', (d, i) => {
      return d.config?.color[0] || '#000';
    })
    .attr('d', d => arc(arcs(d.properties.inAndOut)[0]));

  pieGroup
    .append('path')
    .attr('fill', (d, i) => {
      return d.config?.color[1] || '#000';
    })
    .attr('d', d => arc(arcs(d.properties.inAndOut)[1]));

  pieGroup.on('mouseover', handleMouseover).on('mouseout', handleMouseout);

  function handleMouseover(e, d) {
    const x = d.x;
    const y = d.y;

    const tooltipText = `in:${d.properties.inAndOut[0]} out:${d.properties.inAndOut[1]} `;

    tooltip
      .html(tooltipText)
      .style('left', e.offsetX + 'px')
      .style('top', e.offsetY + 'px')
      .style('display', 'flex');
  }

  function handleMouseout(e, d) {
    tooltip.style('display', 'none');
  }

  return pieGroup;
}
