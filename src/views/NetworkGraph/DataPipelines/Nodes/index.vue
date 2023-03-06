<script lang="ts" setup>
import type { IState } from '@/views/NetworkGraph/index.vue';
import { getColumns } from './config';

const state = inject<IState>('state');
const columns = getColumns();
</script>

<template>
  <div class="container">
    <a-table :dataSource="state.showNodes" :columns="columns" :pagination="false" />
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 100%;
  max-height: 200px;
  overflow: auto;
}
</style>
