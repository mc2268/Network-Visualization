<script lang="ts" setup>
import type { IConfig } from '@/views/NetworkGraph/context.vue';

// reactive也可以被torefs转成引用
// 这里config为ref，但里面各个属性不是ref,直接获取里面值不会响应
const config = inject<IConfig>('config');

const privateCentrality = ref(config.value.centrality);
const marks = ref<Record<number, any>>({
  0: '0',
  10: '10',
  20: '20',
});

function handleDo() {
  config.value.centrality = privateCentrality.value;
}
</script>

<template>
  <a-slider v-model:value="privateCentrality" :min="0" :max="20" range :marks="marks">
    <template #mark="{ label, point }">
      <template v-if="point === 20 || point === 10">
        <strong>{{ label }}</strong>
      </template>
      <template v-else>{{ label }}</template>
    </template>
  </a-slider>

  <div style="font-size: 15px; display: flex; justify-content: space-between; line-height: 30px; font-weight: bold">
    <div></div>
    <strong>Centrality</strong>
    <a-button @click="handleDo">Do</a-button>
  </div>
</template>

<style lang="less" scoped>
.action {
  text-align: right;
}
</style>
