<script lang="ts" setup>
// const activeKey = ref(MODULE_DATA.map(item => item.key));
import { TOPO } from './constant';
</script>

<template>
  <a-card
    style="height: 100%; width: 100%"
    :head-style="{ height: '64px' }"
    :body-style="{ padding: 0, width: '100%', height: 'calc(100% - 64px)', overflow: 'auto' }"
  >
    <template #title>
      <div style="text-align: center; font-weight: 500; font-size: 20px">Topology</div>
    </template>

    <a-row class="container">
      <a-col :span="12" class="topo" v-for="item in TOPO" :key="item.key">
        <div class="img-container">
          <img class="img" :src="item.img" />
        </div>
        <div class="amount">
          <span class="text">{{ item.key }}:</span>
          <span class="digit" style="margin-left: 10px">{{ item.amount }}</span>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<style lang="less" scoped>
:deep(.ant-collapse-content-box) {
  width: 100%;
}
.container {
  height: 100%;
  width: 100%;
}

.topo {
  width: 100px;
  height: 150px;
  display: flex;
  align-items: center;
  flex-direction: column;
  .img-container {
    width: 100px;
    height: 100px;
    background: #000;
    .img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .amount {
    width: 200px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
  }
}
</style>
