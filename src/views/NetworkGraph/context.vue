<!--
提供全局状态的组件
-->
<script lang="ts" setup>
import { ILink, INode } from '@/views/NetworkGraph/RenderBoard/components/ForceDirected/func/render';
import dataset from '@/mock/outline_grapg_datas.json';

export type layout = 'forceDirected' | 'disjointForce-Directed';
export type shape = 'circle' | 'rect' | 'triangle' | 'pie';

export interface INodeConfig {
  shape: shape;
  color: string;
  label: any;
  size: number;
}

// 配置接口的类型约束
export interface IConfig {
  centrality: [number, number];
  layout: layout;
  dataset: any;
  nodeConfig: INodeConfig;
}

export interface IState {
  showNodes: any[];
  showLinks: any[];
  // null 代表全局操作,对象代表操作单个节点,数组代表操作多个节点
  target: {
    nodes: any[];
    links: any[];
  };
  // 选中的定制节点操作
  customNodeConfig: {};
  scale: number;
  renderData: {
    nodes: INode[];
    links: ILink[];
  };
  explain: { text: string; show: boolean };
  thumb: boolean;
}

const config = ref<IConfig>({
  centrality: [0, 10],
  layout: 'forceDirected',
  dataset,
  nodeConfig: {
    shape: 'pie',
    color: '#000',
    label: true,
    size: 20,
  },
});

watch(config.value, () => {
  console.log('config变化了', config.value);
});

// 组件私有状态,
const state = ref<IState>({
  showNodes: [],
  showLinks: [],
  target: {
    nodes: [],
    links: [],
  },
  customNodeConfig: {
    shape: 'pie',
    color: '#000',
    label: true,
    size: 20,
  },
  scale: 1,
  renderData: {
    nodes: [],
    links: [],
  },
  explain: {
    text:
      '<p><span style="color: rgb(236, 240, 241); background-color: rgb(185, 106, 217);">&nbsp; &nbsp; &nbsp;<span style="background-color: rgb(255, 255, 255);"> <span style="color: rgb(0, 0, 0);">紫色</span></span></span>：入度&nbsp;</p>\n' +
      '<p><span style="background-color: rgb(241, 196, 15);">&nbsp; &nbsp; &nbsp;<span style="background-color: rgb(255, 255, 255);"> 橘色</span></span>：出度</p>',
    show: true,
  },
  thumb: false,
});

// customNodeConfig变化同步更新showNodes的属性
watch(
  () => state.value.customNodeConfig,
  () => {
    const targetIDS = state.value.target.map(item => item.id);
    state.value.showNodes = state.value.showNodes.map(item => {
      if (targetIDS.includes(item.id)) {
        return { ...item, customNodeConfig: state.value.customNodeConfig };
      }
      return item;
    });
  },
  {
    deep: true,
  },
);

provide('config', config);
provide('state', state);
</script>

<template>
  <slot />
</template>
