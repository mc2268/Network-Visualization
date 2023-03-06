import ForceDirected from './components/ForceDirected';
import TransitMap from '@/views/NetworkGraph/RenderBoard/components/TransitMap/index';

import DisjointForceDirected from './components/future/DisjointForceDirected';
import ArcDiagram from './components/future/ArcDiagram/index';
import SankeyDiagram from './components/future/SankeyDiagram/index';
import Geographic from './components/future/Geographic/index';
import ChordDiagram from './components/future/ChordDiagram/index';
import Bubble from './components/future/Bubble/index';
import RadialTree from './components/future/RadialTree/index';

export const COMPONENTS_MAP = {
  forceDirected: ForceDirected,
  transitMap: TransitMap,
  disjointForceDirected: DisjointForceDirected,
  arcDiagram: ArcDiagram,
  sankeyDiagram: SankeyDiagram,
  geographic: Geographic,
  chordDiagram: ChordDiagram,
  bubble: Bubble,
  radialTree: RadialTree,
};
