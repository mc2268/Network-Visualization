<script lang="ts" setup>
import { COLORS } from '@/views/NetworkGraph/OptionsPanel/constant';
import { IPrivateOption } from '@/views/NetworkGraph/OptionsPanel/index.vue';

const privateOption = inject<IPrivateOption>('privateOption');
const activeColor = computed(() => privateOption.value.node.color);

function handleClick(item: any) {
  privateOption.value.node.color[0] = item.key;
}

function handleClick2(item: any) {
  privateOption.value.node.color[1] = item.key;
}
</script>

<template>
  <div class="title">
    <strong>{{ privateOption.node.shape === 'pie' ? 'Color-In' : 'Color' }}</strong>
    <a-input style="width: 150px" type="color" v-model:value="privateOption.node.color[0]"></a-input>
  </div>
  <!--  <main class="main">-->
  <!--    <a-row type="flex" style="flex-wrap: nowrap">-->
  <!--      <a-col-->
  <!--        class="color-container"-->
  <!--        @click="handleClick(item)"-->
  <!--        v-for="item in COLORS"-->
  <!--        :key="item.key"-->
  <!--        :class="item.key === activeColor[0] ? 'active' : ''"-->
  <!--      >-->
  <!--        <div class="color" :style="{ backgroundColor: item.key }"></div>-->
  <!--      </a-col>-->
  <!--    </a-row>-->
  <!--  </main>-->

  <template v-if="privateOption.node.shape === 'pie'">
    <div class="title">
      <strong>Color-Out</strong>
      <a-input style="width: 150px" type="color" v-model:value="privateOption.node.color[1]"></a-input>
    </div>
    <!--    <main class="main">-->
    <!--      <a-row type="flex" style="flex-wrap: nowrap">-->
    <!--        <a-col-->
    <!--          class="color-container"-->
    <!--          @click="handleClick2(item)"-->
    <!--          v-for="item in COLORS"-->
    <!--          :key="item.key"-->
    <!--          :class="item.key === activeColor[1] ? 'active' : ''"-->
    <!--        >-->
    <!--          <div class="color" :style="{ backgroundColor: item.key }"></div>-->
    <!--        </a-col>-->
    <!--      </a-row>-->
    <!--    </main>-->
  </template>
</template>

<style lang="less" scoped>
.main {
  padding: 10px 20px;
  max-height: 100px;
  overflow-x: auto;
  overflow-y: hidden;
}
.active {
  border: 1px solid #2693d5;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}

.color-container {
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px;
  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  }
}

.color {
  border-radius: 5px;
  width: 40px;
  height: 40px;
}

.image {
  text-align: center;
  padding: 5px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
