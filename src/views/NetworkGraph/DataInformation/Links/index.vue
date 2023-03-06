<script lang="ts" setup>
import type { IState } from '@/views/NetworkGraph/index.vue';
import { getColumns } from './config';

const state = inject<IState>('state');

const dataSource = computed(() => state.value.target.links);
const columns = getColumns();
</script>

<template>
  <div class="container">
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
