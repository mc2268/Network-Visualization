<script lang="ts" setup>
import type { IConfig } from '@/views/NetworkGraph/context.vue';
import { renderInit, render, reRender, IData, ILink, INode } from './func/render';
import * as d3 from 'd3';
import { withCentrality, withFilter } from './dataPre';
import { IState } from '@/views/NetworkGraph/context.vue';
import Menu from './Menu';
import { toParseNormal } from '@/utils';

const config = inject<IConfig>('config');
const state = inject<IState>('state');

const data = toParseNormal(config.value.dataset);

const sourceNodes = data.nodes[0];
const sourceLinks = data.edges[0].map((item: any) => ({ ...item, id: `${item.source}->${item.target}` }));

const centralityNodes = withCentrality(
  { nodes: sourceNodes, links: sourceLinks },
  { defaultNodeConfig: config.value.nodeConfig, defaultLinkConfig: config.value.linkConfig },
);

function handleNodeSelect(d: INode) {
  console.log('handleNodeSelect', d);
  const targetIDS = state.value.target?.nodes.map((item: any) => item.id);
  if (targetIDS.includes(d.id)) {
    return (state.value.target.nodes = state.value.target?.nodes.filter((item: any) => item.id !== d.id));
  }
  state.value.target.nodes = [...state.value.target.nodes, d];
}

function handleLinkSelect(d: ILink) {
  console.log('handleLinkSelect', d);

  const links = state.value.target?.links;

  const targetIDS = links.map((item: any) => item.id);
  if (targetIDS.includes(d.id)) {
    return (state.value.target.links = links.filter((item: any) => item.id !== d.id));
  }
  state.value.target.links = [...links, d];
}

state.value.renderData = {
  nodes: toParseNormal(centralityNodes) || [],
  links: toParseNormal(sourceLinks) || [],
};

const renderData = state.value.renderData;

console.log('renderData', renderData);

watch(
  () => state.value.target.nodes,
  (newValue, oldValue) => {
    const targetIDS = newValue.map((item: any) => item.id);
    renderData.nodes.forEach((item: INode, i: number) => {
      const index = targetIDS.indexOf(item.id);
      renderData.nodes[i].selected = index !== -1;
    });
  },
  {
    deep: true,
  },
);

watch(
  () => state.value.target.links,
  (newValue, oldValue) => {
    const targetIDS = newValue.map((item: any) => item.id);
    renderData.links.forEach((item: INode, i: number) => {
      const index = targetIDS.indexOf(item.id);
      renderData.links[i].selected = index !== -1;
    });
  },
  {
    deep: true,
  },
);

// 数据的过滤，可以扩展其他算法及属性
watch(
  () => config.value.centrality,
  (value, oldValue) => {
    // 这里转为无引用对象
    // 这里进行数据过滤，render只专注于拿已处理好的数据进行渲染
    const renderNodeIDS = renderData.nodes.map(item => item.id);

    const renderLinkIDS = renderData.links.map(item => item.id);

    const filterNodes = [
      ...renderData.nodes,
      ...centralityNodes.filter((item: any) => !renderNodeIDS.includes(item.id)),
    ];

    const filterLinks = [
      ...renderData.links.map((item: any) => ({
        ...item,
        source: item.source?.id || item.source,
        target: item.target?.id || item.target,
      })),
      ...sourceLinks.filter((item: any) => !renderLinkIDS.includes(item.id)),
    ];

    const { nodes, links } = withFilter(
      { nodes: toParseNormal(filterNodes), links: toParseNormal(filterLinks) },
      { centrality: config.value.centrality },
    );

    renderData.nodes = nodes;
    renderData.links = links;
  },
  {
    immediate: true,
  },
);

onMounted(() => {
  // 初始化渲染
  renderInit(state);
  const { reRender } = render(toRaw(renderData), { onLinkSelect: handleLinkSelect, onNodeSelect: handleNodeSelect });

  watch(
    () => renderData,
    () => {
      console.log('renderData change', renderData);

      reRender(toRaw(renderData));
    },
    { deep: true },
  );
});
</script>

<template>
  <div class="container">
    <!--      这里svg要在外面给padding，不然svg设置100%，100%会超过滚动条区域-->
    <div id="svg-container">
      <svg id="svg"></svg>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 5px;
}
#svg-container {
  width: 100%;
  height: 100%;
  position: relative;
}

#svg {
  width: 100%;
  height: 100%;
  overflow: auto;
}

:deep(.animatePath) {
  stroke-dasharray: 10;
  stroke-dashoffset: 100;
  animation: dash 1s linear infinite;
}

@keyframes dash {
  from {
    stroke-dashoffset: 100;
  }
  to {
    stroke-dashoffset: 0;
  }
}

:deep(#tooltip) {
  position: absolute;
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-width: 0px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
}
</style>
