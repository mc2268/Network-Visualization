<script lang="ts" setup>
import * as d3 from 'd3';
import type { IState } from '@/views/NetworkGraph/context.vue';
import { toParseNormal } from '@/utils';
import { handleChooseConnectedNodesAndLinks, handleChooseGroupNodes } from './handle';

const state = inject<IState>('state');

const menus = [
  {
    // 选择单节点
    key: 'chooseSingleNode',
    label: 'choose single node',
  },
  {
    // 选择连接节点
    key: 'chooseConnectedNodesAndLinks',
    label: 'choose connected nodes and links',
  },
  {
    // 选择组节点
    key: 'chooseAllNodes',
    label: 'choose all nodes and Links',
  },
  {
    key: 'chooseByType',
    label: 'choose by type',
  },
];

const R = ref<number>(0);

function handleClick(item: any) {
  const rightClickNode = JSON.parse(d3.select('#menu').attr('rightClickNode'));
  switch (item.key) {
    case 'chooseSingleNode':
      return handleChooseSingleNode(rightClickNode);
    case 'chooseConnectedNodesAndLinks':
      return handleChooseConnectedNodesAndLinks(rightClickNode, state);
    case 'chooseAllNodes':
      return handleChooseAllNodes(rightClickNode);
    case 'chooseGroupNodes':
      return handleChooseGroupNodes(rightClickNode, state, R);
  }
}

function handleChooseSingleNode(rightClickNode: any) {
  state.value.target.nodes = [rightClickNode];
  state.value.target.links = [];
}

function handleChooseAllNodes(rightClickNode: any) {
  state.value.target.nodes = state.value.renderData.nodes;
  state.value.target.links = state.value.renderData.links;
}
</script>

<template>
  <div id="menu">
    <a-menu class="menu" theme="light" :selectable="false">
      <a-menu-item class="menu-item" v-for="item in menus" :key="item.key" @click="handleClick(item)">
        <span class="menu-item-text">{{ item.label }}</span>
      </a-menu-item>

      <a-sub-menu>
        <template #title>
          <span class="menu-item-text">choose group nodes</span>
          <span>( R = {{ R }} )</span>
        </template>

        <a-menu-item style="width: 300px">
          <div style="display: flex; justify-content: space-between; align-items: center">
            <span style="width: 150px">
              <a-slider v-model:value="R" :min="0" :max="1" :step="0.1" />
            </span>
            <span>
              <a-button @click="handleClick({ key: 'chooseGroupNodes' })">confirm</a-button>
            </span>
          </div>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<style lang="less" scoped>
#menu {
  position: absolute;
  display: none;
  //width: 300px;
}

.menu {
  border-radius: 5px;
  border: 1px solid #ccc;
}

.menu-item {
  line-height: 30px;
  &:hover {
    opacity: 0.8;
  }

  .menu-item-text {
  }
}
</style>
