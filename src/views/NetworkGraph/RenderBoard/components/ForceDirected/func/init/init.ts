import * as d3 from 'd3';
import initForce from './initForce';
import initNodes from '@/views/NetworkGraph/RenderBoard/components/ForceDirected/func/init/initNodes';

export default function init({ force, nodes, links, width, height }) {
  const STATIC = {
    strength: -10000,
    alpha: 1,
    alphaDecay: 0.05,
    distanceMax: 500,
  };

  force = initForce({
    nodes,
    links,
    alpha: STATIC.alpha,
    strength: STATIC.strength,
    distanceMax: STATIC.distanceMax,
    centerX: width / 2,
    centerY: height / 2,
  });

  initNodes();
}
