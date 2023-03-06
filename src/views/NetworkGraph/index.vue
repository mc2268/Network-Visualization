<script lang="ts" setup>
import context from './context.vue';
import layout from './layout.vue';
</script>

<template>
  <context>
    <layout></layout>
  </context>
</template>

<style lang="less" scoped>
.wrapper {
  height: 100%;
}

:deep(.ant-switch) {
  background-color: #eae7e7;
}

:deep(.ant-switch-checked) {
  background-color: #d0cccc;
}

:deep(.ant-btn) {
  background-color: #f1f0f0;
}
</style>
