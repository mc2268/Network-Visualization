<script lang="ts" setup>
import type { IState } from '@/views/NetworkGraph/context.vue';

const state = inject<IState>('state');

const display = computed(() => (state.value.explain.show ? 'block' : 'none'));

const text = computed(() => state.value.explain.text);
</script>

<template>
  <div id="explain" :style="{ display }">
    <div class="text-container">
      <span class="content" v-html="text"></span>
    </div>
  </div>
</template>

<style lang="less" scoped>
#explain {
  position: absolute;
  padding: 10px;
  width: 200px;
  height: 200px;
  overflow: auto;
  top: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
}

:deep(.content p) {
  margin-bottom: 10px;
  line-height: 1;
}
.text-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
