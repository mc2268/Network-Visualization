import * as d3 from 'd3';

export default function initForce({ nodes, links, alpha, strength, distanceMax, centerX, centerY }) {
  return d3
    .forceSimulation(nodes)
    .alpha(alpha)
    .force('charge', d3.forceManyBody().strength(strength).distanceMax(distanceMax))
    .force('link', d3.forceLink(links))
    .force('center', d3.forceCenter(centerX, centerY));
}
