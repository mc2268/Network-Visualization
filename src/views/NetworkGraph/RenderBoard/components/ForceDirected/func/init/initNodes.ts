import * as d3 from 'd3';

export default function initNodes(selection: any, nodes: any[]) {
  return selection
    .append('g')
    .attr('class', 'nodeGroup')
    .selectAll('g.node')
    .data(nodes)
    .enter()
    .append('g')
    .attr('class', 'node');
}
