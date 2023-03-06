<script lang="ts" setup>
import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons-vue';
import type { IState } from '@/views/NetworkGraph/index.vue';

const state = inject<IState>('state');

function handleScale(type: 'big' | 'small') {
  // 设定限制
  if (state.value.scale <= 0.1 && type === 'small') {
    return;
  }
  if (type === 'big') {
    return (state.value.scale = +(state.value.scale + 0.1).toFixed(1));
  }
  return (state.value.scale = +(state.value.scale - 0.1).toFixed(1));
}
</script>

<template>
  <div>
    <a-button class="button" style="margin-left: 10px" @click="handleScale('big')">
      <template #icon>
        <ZoomInOutlined style="font-size: 20px"></ZoomInOutlined>
      </template>
    </a-button>
    <a-button class="button" style="margin-left: 10px" @click="handleScale('small')">
      <template #icon>
        <ZoomOutOutlined style="font-size: 20px"></ZoomOutOutlined>
      </template>
    </a-button>
  </div>
</template>

<style lang="less" scoped></style>
