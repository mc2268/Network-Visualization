<script lang="ts" setup>
import type { IState } from '@/views/NetworkGraph/context.vue';
import { toParseNormal } from '@/utils';

const state = inject<IState>('state');

const options = computed(() => {
  return state.value.renderData.nodes.map(item => ({
    label: item.id,
    value: item.id,
  }));
});

const deID = ref<string>('');

function handleDo() {
  const renderNodes = state.value.renderData.nodes;
  const renderLinks = state.value.renderData.links;

  const nodeIDS = renderNodes.map(item => item.id);

  const index = nodeIDS.indexOf(deID.value);

  if (index >= 0) {
    renderNodes.splice(index, 1);

    //删除与之关联的边
    const relateLinks: any = [];

    renderLinks.forEach(item => {
      if (item.source.id === deID.value || item.target.id === deID.value) {
        relateLinks.push(item);
      }
    });

    while (relateLinks.length > 0) {
      for (let i = 0; i < renderLinks.length; i++) {
        if (renderLinks[i].source.id === deID.value || renderLinks[i].target.id === deID.value) {
          renderLinks.splice(i, 1);
          relateLinks.shift();
          break;
        }
      }
    }

    deID.value = '';
  }
}
</script>

<template>
  <div class="container">
    <a-select
      v-model:value="deID"
      show-search
      placeholder="Select a id to delete"
      style="width: 100%"
      :options="options"
    />

    <div
      style="
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        line-height: 30px;
        font-weight: bold;
        margin-top: 5px;
      "
    >
      <div></div>
      <strong>DeID</strong>
      <a-button @click="handleDo">Do</a-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.action {
  text-align: right;
}
.container {
  margin-top: 10px;
}
</style>
