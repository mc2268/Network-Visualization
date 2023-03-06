<script lang="ts" setup>
import type { IPrivateOption } from '@/views/NetworkGraph/OptionsPanel/index.vue';

const NODE_SHAPES = [
  {
    key: 'pie',
    title: 'pie',
    img: 'src/assets/shape/pie.png',
  },
];

const privateOption = inject<IPrivateOption>('privateOption');
const activeShape = computed(() => privateOption.value.node.shape);

function handleClick(item: any) {
  privateOption.value.node.shape = item.key;
}
</script>

<template>
  <div class="title"><strong>Fill</strong></div>
  <main class="main">
    <a-row type="flex" style="flex-wrap: nowrap">
      <a-col
        class="shape-container"
        @click="handleClick(item)"
        v-for="item in NODE_SHAPES"
        :key="item.key"
        :class="item.key === activeShape ? 'active' : ''"
      >
        <div class="image">
          <img :src="item.img" />
        </div>
      </a-col>
    </a-row>
  </main>
</template>

<style lang="less" scoped>
.main {
  padding: 0 20px;
  max-height: 100px;
  overflow: auto;
}
.active {
  border: 1px solid #2693d5;
}

.shape-container {
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  }
}

.image {
  width: 40px;
  height: 40px;
  text-align: center;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
</style>
