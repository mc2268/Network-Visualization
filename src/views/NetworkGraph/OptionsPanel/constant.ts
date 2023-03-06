import Layout from '@/views/NetworkGraph/OptionsPanel/Layout/index';
import Node from '@/views/NetworkGraph/OptionsPanel/Node/index';
import Link from '@/views/NetworkGraph/OptionsPanel/Link/index';
import Unit from '@/views/NetworkGraph/OptionsPanel/Unit/index';

export const MODULE_DATA = [
  // {
  //   key: 'Layout',
  //   title: 'Layout',
  //   render: Layout,
  // },
  {
    key: 'Node',
    title: 'Node',
    render: Node,
  },
  {
    key: 'Link',
    title: 'Link',
    render: Link,
  },
  // {
  //   key: 'Unit',
  //   title: 'Unit',
  //   render: Unit,
  // },
];

export const LAYOUTS = [
  {
    key: 'forceDirected',
    title: 'Force-Directed',
    img: 'src/assets/layout/forceDirected.png',
  },
  {
    key: 'transitMap',
    title: 'Transit Map',
    img: 'src/assets/layout/transitMap.png',
  },
  {
    key: 'disjointForceDirected',
    title: 'Disjoint Force-Directed',
    img: 'src/assets/layout/disjointForceDirected.png',
  },
  {
    key: 'arcDiagram',
    title: 'Arc Diagram',
    img: 'src/assets/layout/arcDiagram.png',
  },
  {
    key: 'sankeyDiagram',
    title: 'Sankey Diagram',
    img: 'src/assets/layout/sankeyDiagram.png',
  },
  {
    key: 'geographic',
    title: 'Geographic',
    img: 'src/assets/layout/geographic.png',
  },
  {
    key: 'chordDiagram',
    title: 'Chord Diagram',
    img: 'src/assets/layout/chordDiagram.png',
  },
  {
    key: 'bubble',
    title: 'Bubble',
    img: 'src/assets/layout/bubble.png',
  },
  {
    key: 'radialTree',
    title: 'Radial Tree',
    img: 'src/assets/layout/radialTree.png',
  },
];

export const NODE_SHAPES = [
  {
    key: 'circle',
    title: 'circle',
    img: 'src/assets/shape/circle.png',
  },
  {
    key: 'rect',
    title: 'rect',
    img: 'src/assets/shape/rect.png',
  },
  {
    key: 'triangle',
    title: 'triangle',
    img: 'src/assets/shape/triangle.png',
  },
  {
    key: 'star',
    title: 'star',
    img: 'src/assets/shape/star.png',
  },
];

export const COLORS = [
  {
    key: '#000',
  },
  {
    key: '#1F77B4',
  },
  {
    key: '#FF7F0E',
  },
  {
    key: '#ADD8E6',
  },
  {
    key: '#EBF3FF',
  },
  {
    key: '#F1FFF5',
  },
  {
    key: '#FEF9E7',
  },
];
