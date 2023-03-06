<script lang="ts" setup>
import type { IState } from '@/views/NetworkGraph/context.vue';

const privateOption = inject('privateOption');

const state = inject<IState>('state');

const marks = ref<Record<number, any>>({
  20: '20',
  30: '30',
  40: '40',
  50: '50',
});

function handleAutoSize() {
  state.value.renderData.nodes.forEach(item => {
    item.config.size = 10 + item.properties.centrality * 10;
  });
}
</script>

<template>
  <div class="container">
    <div class="title" style="height: 20px; display: flex; justify-content: space-between; align-items: center">
      <strong>Size</strong>
      <a-button style="width: 150px" @click="handleAutoSize">auto(centrality)</a-button>
    </div>

    <main>
      <a-slider
        style="display: inline-block"
        :min="20"
        :max="50"
        v-model:value="privateOption.node.size"
        :marks="marks"
      >
        <template #mark="{ label, point }">
          <template v-if="point === 30 || point === 40 || point === 50">
            <strong>{{ label }}</strong>
          </template>
          <template v-else>{{ label }}</template>
        </template>
      </a-slider>
    </main>
  </div>
</template>

<style lang="less" scoped>
.container {
  //padding-bottom: 10px;
}
</style>
