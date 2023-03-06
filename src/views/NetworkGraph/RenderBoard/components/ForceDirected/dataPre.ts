import type { IData } from '@/views/NetworkGraph/RenderBoard/components/ForceDirected/func/render';
import type { IState } from '@/views/NetworkGraph/index.vue';

export function withCentrality(
  { nodes, links }: IData,
  //默认配置为全局
  { defaultNodeConfig, defaultLinkConfig }: { defaultNodeConfig: any; defaultLinkConfig: any },
) {
  // 统计node在links出现的数量
  const sourceSumMap: Record<string, number> = {};
  const targetSumMap: Record<string, number> = {};

  nodes.forEach(item => {
    sourceSumMap[item.id] = 0;
    targetSumMap[item.id] = 0;
  });

  links.forEach((item: any) => {
    if (sourceSumMap[item.source]) {
      sourceSumMap[item.source] = sourceSumMap[item.source] + 1;
    } else {
      sourceSumMap[item.source] = 1;
    }

    if (targetSumMap[item.target]) {
      targetSumMap[item.target] = targetSumMap[item.target] + 1;
    } else {
      targetSumMap[item.target] = 1;
    }
  });

  return nodes.map((item, i) => ({
    ...item,
    properties: {
      centrality: sourceSumMap[item.id] + targetSumMap[item.id],
      inAndOut: [targetSumMap[item.id], sourceSumMap[item.id]],
    },
    config: {
      shape: item?.config?.shape || defaultNodeConfig.shape,
      label: item?.config?.label || defaultNodeConfig.label,
      size: 20,
      color: ['#1F77B4', '#FF7F0E'],
    },
  }));
}

export function withFilter({ nodes, links }: IData, { centrality }: { centrality: [number, number] }) {
  console.log('links in', links);

  const filterNodes = nodes.filter(d => {
    return d.properties.centrality <= centrality[1] && d.properties.centrality >= centrality[0];
  });

  const ids = Array.from(new Set(filterNodes.map(d => d.id)));
  const filterLinks = links
    .filter(d => ids.includes(d.source) && ids.includes(d.target))
    .map((d, i) => ({
      config: {
        shape: 'normal',
        distance: 80,
        stroke: '#ADD8E6',
        strokeWidth: 4,
      },
      ...d,
    }));

  return {
    nodes: filterNodes,
    links: filterLinks,
  };
}
