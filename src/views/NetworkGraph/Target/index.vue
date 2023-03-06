<script lang="ts" setup>
import type { IState } from '@/views/NetworkGraph/index.vue';

const state = inject<IState>('state');

const targetNodes = computed(() => {
  if (state.value.target?.nodes.length === 0) {
    return 'please choose nodes to operate';
  }
  return state.value.target?.nodes.map((item: any) => item.id).join(',');
});

const targetLinks = computed(() => {
  if (state.value.target?.links.length === 0) {
    return 'please choose  links to operate';
  }
  return state.value.target?.links.map((item: any) => item.id).join(',');
});

const targetNodeType = computed(() => {
  if (state.value.target?.nodes.length === 0) {
    return 'none nodes';
  }
  if (state.value.target?.nodes.length === state.value.showNodes.length) {
    return 'all nodes';
  }

  return 'some nodes';
});

const targetLinkType = computed(() => {
  if (state.value.target?.links.length === 0) {
    return 'none links';
  }
  if (state.value.target?.links.length === state.value.showLinks.length) {
    return 'all links';
  }
  return 'some links';
});
</script>

<template>
  <a-card
    style="height: 100%; width: 100%"
    :head-style="{ height: '64px' }"
    :body-style="{ padding: 0, height: 'calc(100% - 64px) ', overflow: 'auto' }"
  >
    <template #title>
      <div style="text-align: center; font-weight: 500; font-size: 20px">Target</div>
    </template>

    <main>
      <div>
        <strong>{{ targetNodeType }}</strong>
        {{ targetNodes }}
      </div>

      <div>
        <strong>{{ targetLinkType }}</strong>
        {{ targetLinks }}
      </div>
    </main>
  </a-card>
</template>

<style lang="less" scoped>
:deep(.ant-collapse-content-box) {
  width: 300px;
}
</style>
