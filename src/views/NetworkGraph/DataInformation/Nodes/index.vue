<script lang="ts" setup>
import type { IState } from '@/views/NetworkGraph/index.vue';
import { getColumns } from './config';

const state = inject<IState>('state');
const columns = getColumns();

const dataSource = computed(() =>
  state.value.target.nodes.map((item: any) => ({ ...item, x: item.x.toFixed(2), y: item.y.toFixed(2) })),
);

// watch(
//   () => dataSource.value,
//   () => {
//     console.log('dataSource变化了');
//   },
//   {
//     deep: true,
//     immediate: true,
//   },
// );

function handleClick() {
  console.log('dataSource', dataSource.value[0]);
}
</script>

<template>
  <div class="container" @click="handleClick">
    <a-table :dataSource="dataSource" :columns="columns" :pagination="false" />
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 100%;
  max-height: 300px;
  overflow: auto;
}
</style>
