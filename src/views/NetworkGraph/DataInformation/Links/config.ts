import type { ColumnsType } from 'ant-design-vue/es/table/interface';

export const getColumns = () =>
  [
    { title: 'id', width: 30, dataIndex: 'id' },
    { title: 'source', width: 30, dataIndex: ['source', 'id'] },
    { title: 'target', width: 30, dataIndex: ['target', 'id'] },
  ] as ColumnsType;
