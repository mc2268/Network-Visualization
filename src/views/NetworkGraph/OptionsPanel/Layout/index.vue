<script lang="ts" setup>
import { LAYOUTS } from '../constant';
import type { IConfig } from '@/views/NetworkGraph/context.vue';

const config = inject<IConfig>('config');

const activeLayout = computed(() => config.value.layout);

function handleClick(item: any) {
  config.value.layout = item.key;
}
</script>

<template>
  <a-row class="container" type="flex">
    <a-col
      class="layout"
      @click="handleClick(item)"
      v-for="item in LAYOUTS"
      :key="item.key"
      :class="item.key === activeLayout ? 'active' : ''"
    >
      <div class="image">
        <img :src="item.img" :alt="item.key" />
        <div class="title">
          <strong style="font-size: 12px; text-align: center">{{ item.title }}</strong>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: auto;
  flex-wrap: nowrap;
}

.layout {
  width: 200px;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-left: 10px;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  }
}

.image {
  height: 100%;
  width: 100%;
  text-align: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.title {
  position: absolute;
  margin-top: -30px;
  width: 100%;
  text-align: center;
  line-height: 30px;
}
.active {
  border: 1px solid #2693d5;
  //background-color: rgba(0, 0, 0, 0.1);
}
</style>
