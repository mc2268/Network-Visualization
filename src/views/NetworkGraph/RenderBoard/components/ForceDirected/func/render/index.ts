import * as d3 from 'd3';
import init from '@/views/NetworkGraph/RenderBoard/components/ForceDirected/func/init/init';

export default function render(el: any, data: { nodes: any[]; links: any[] }) {
  const svg = d3.select(el);

  const nodes = data.nodes;
  const links = data.links;
  const width = +svg.attr('width');
  const height = +svg.attr('height');

  const mainGroup = svg.append('g').attr('id', 'mainGroup');

  let force;

  init({ force });
}
