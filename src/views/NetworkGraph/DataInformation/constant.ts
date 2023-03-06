import Nodes from './Nodes/index';
import Links from './Links/index';

// 模块的数据，静态组件映射
export const MODULE_DATA = [
  {
    key: 'Nodes',
    title: 'Nodes',
    render: Nodes,
  },
  {
    key: 'Links',
    title: 'Links',
    render: Links,
  },
];
