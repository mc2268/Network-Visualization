import type { ColumnsType } from 'ant-design-vue/es/table/interface';
export const getColumns = () =>
  [
    { title: 'id', width: 30, dataIndex: 'id' },
    { title: 'axisX', width: 30, dataIndex: 'x' },
    { title: 'axisY', width: 30, dataIndex: 'y' },
    { title: 'centrality', width: 50, dataIndex: ['properties', 'centrality'] },
  ] as ColumnsType;
