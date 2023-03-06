<script lang="ts" setup>
import { MODULE_DATA } from './constant';
const activeKey = ref(MODULE_DATA.map(item => item.key));
</script>

<template>
  <a-card
    style="height: 100%; width: 100%"
    :head-style="{ height: '64px' }"
    :body-style="{ padding: 0, width: '100%', height: 'calc(100% - 64px)' }"
  >
    <template #title>
      <div style="text-align: center; font-weight: 500; font-size: 20px">Data Information</div>
    </template>

    <div class="container">
      <a-collapse v-model:active-key="activeKey">
        <a-collapse-panel v-for="item in MODULE_DATA" :key="item.key">
          <template #header>
            <strong style="font-size: 15px">{{ item.title }}</strong>
          </template>
          <component :is="item.render"></component>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </a-card>
</template>

<style lang="less" scoped>
:deep(.ant-collapse-content-box) {
  width: 100%;
}
.container {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
