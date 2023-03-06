<script lang="ts" setup>
import { MODULE_DATA } from './constant';
const activeKey = ref(MODULE_DATA.map(item => item.key));
</script>

<template>
  <a-card
    style="height: 100%; width: 100%"
    :head-style="{ height: '64px' }"
    :body-style="{ padding: 0, height: 'calc(100% - 64px) ', overflow: 'auto' }"
  >
    <template #title>
      <div style="text-align: center">
        <strong class="title" style="font-size: 20px; font-weight: 500">Data Pipelines</strong>
      </div>
    </template>

    <a-collapse v-model:active-key="activeKey">
      <a-collapse-panel v-for="item in MODULE_DATA" :key="item.key">
        <template #header>
          <strong style="font-size: 15px">{{ item.title }}</strong>
        </template>
        <component :is="item.render"></component>
      </a-collapse-panel>
    </a-collapse>
  </a-card>
</template>

<style lang="less" scoped>
:deep(.ant-collapse-content-box) {
  width: 100%;
  padding: 10px;
}
</style>
