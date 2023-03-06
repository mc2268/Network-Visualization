import DataSet from '@/views/NetworkGraph/DataPipelines/DataSet/index';
import Filter from '@/views/NetworkGraph/DataPipelines/Filter/index';
import Nodes from '@/views/NetworkGraph/DataPipelines/Nodes/index';
import Links from '@/views/NetworkGraph/DataPipelines/Links/index';

// 模块的数据，静态组件映射
export const MODULE_DATA = [
  {
    key: 'DataSet',
    title: 'DataSet',
    render: DataSet,
  },
  {
    key: 'Filter',
    title: 'Filter',
    render: Filter,
  },
];
