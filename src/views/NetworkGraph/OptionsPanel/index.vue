<script lang="ts" setup>
import { MODULE_DATA } from './constant';
import type { IState } from '@/views/NetworkGraph/index.vue';
import { ILink, INode } from '@/views/NetworkGraph/RenderBoard/components/ForceDirected/func/render';
import { toParseNormal } from '@/utils';

const activeKey = ref(MODULE_DATA.map(item => item.key));
const state = inject<IState>('state');

export interface IPrivateOption {
  node: {
    label: boolean;
    labelContent: string;
    size: number;
    shape: string;
    color: string[];
  };
  link: {
    shape: string;
    arrow: boolean;
    distance: number;
    stroke: string;
    strokeWidth: number;
  };
}

const privateOption = ref<IPrivateOption>({
  node: {
    label: true,
    labelContent: 'id',
    size: 20,
    shape: 'pie',
    color: ['#1F77B4', '#FF7F0E'],
  },
  link: {
    shape: 'normal',
    arrow: true,
    distance: 100,
    stroke: '#ADD8E6',
    strokeWidth: 4,
  },
});

watch(
  privateOption,
  () => {
    console.log('privateOption 改变了', privateOption.value);
  },
  {
    deep: true,
    immediate: true,
  },
);

provide('privateOption', privateOption);

const mainHeight = ref<number>(0);
const mainRef = ref<any>();

onMounted(() => {
  mainHeight.value = mainRef.value.clientHeight;
});

function handleClick() {
  updateNodes();
  updateLinks();
}

function updateNodes() {
  const targetNodes = state.value.target.nodes;
  const renderNodes = state.value.renderData.nodes;
  const targetIDS = targetNodes.map((item: any) => item.id);

  renderNodes.forEach((item: INode) => {
    if (targetIDS.includes(item.id)) {
      item.config = toParseNormal(privateOption.value.node);
    }
  });
}

function updateLinks() {
  const targetLinks = state.value.target.links;
  const renderLinks = state.value.renderData.links;
  const targetIDS = targetLinks.map((item: any) => item.id);

  renderLinks.forEach((item: ILink) => {
    if (targetIDS.includes(item.id)) {
      item.config = toParseNormal(privateOption.value.link);
    }
  });
}
</script>

<template>
  <a-card
    style="height: 100%"
    :head-style="{ height: '64px' }"
    :body-style="{ padding: 0, height: 'calc(100% - 64px) ', overflow: 'auto' }"
  >
    <template #title>
      <div style="display: flex; justify-content: center">
        <strong class="title" style="font-size: 20px; font-weight: 500">Options Panel</strong>
      </div>
    </template>

    <div class="container">
      <main
        class="main"
        ref="mainRef"
        style="width: 100%; height: 100%; display: flex; justify-content: space-between; background-color: white"
      >
        <a-collapse
          v-model:active-key="activeKey"
          v-for="(item, index) in MODULE_DATA"
          :key="item.key"
          style="width: 49%; background-color: white"
        >
          <a-collapse-panel :key="item.key" class="panel" style="width: 100%; height: 100%; overflow: auto">
            <template #header>
              <strong style="font-size: 15px">{{ item.title }}</strong>
            </template>

            <div>
              <component :is="item.render"></component>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </main>

      <div class="bottom">
        <a-button style="margin-left: 10px" @click="handleClick">set</a-button>
      </div>
    </div>
  </a-card>
</template>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .main {
    flex: 1;
    overflow: hidden;
  }
  .bottom {
    display: flex;
    padding-right: 10px;
    height: 40px;
    align-items: center;
    justify-content: flex-end;
  }
}

:deep(.ant-collapse-content-box) {
  padding: 0;
}
:deep(.ant-collapse-header) {
  background-color: #fafafa;
}
</style>
