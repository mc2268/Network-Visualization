import * as d3 from 'd3';

export default function drawLink(selection: any) {
  selection.each(function (d: any) {
    let self = d3.select(this);
    switch (d.config?.shape) {
      case 'normal':
        return normal(self);
      case 'animate':
        return animate(self);
    }
  });
}

export function normal(selection: any) {
  return selection
    .append('path')
    .attr('source', d => d.source.id)
    .attr('target', d => d.target.id)
    .style('stroke', (d: any) => {
      return d.selected ? 'red' : d.config?.stroke || 'rgb(169,204,255)';
    })
    .style('stroke-width', (d: any) => d.config?.strokeWidth || 4)
    .attr('class', 'linePath')
    .attr('marker-end', 'url(#resolved)');
}

export function animate(selection: any) {
  // 放在底层否则懂得线无法点击到事件
  normal(selection).style('opacity', '0');

  return selection
    .append('path')
    .style('stroke', (d: any) => {
      return d.selected ? 'blue' : d.config?.stroke || 'rgb(169,204,255)';
    })
    .style('stroke-width', d => d.config?.strokeWidth || 4)
    .attr('class', 'animatePath')
    .attr('marker-end', 'url(#resolved)');
}
