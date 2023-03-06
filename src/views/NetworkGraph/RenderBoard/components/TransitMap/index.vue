<script lang="ts" setup>
import Map from './Map/index.vue';
import render from './render';
const step = ref<number>(0.1);
onMounted(() => {
  // setInterval(() => {
  //   if (step.value <= 1) {
  //     step.value += 0.1;
  //   }
  // }, 1000);
  render({ step });
});
</script>

<template>
  <div class="container">
    <!--      这里svg要在外面给padding，不然svg设置100%，100%会超过滚动条区域-->
    <div id="svg-container">
      <!--      <Map></Map>-->
      <svg id="svg"></svg>
      <Menu></Menu>
      <div class="slider">
        <span>step</span>
        <div style="display: inline-block; flex: 1"><a-slider v-model:value="step" :min="0" :max="10"></a-slider></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 5px;
}
.slider {
  position: absolute;
  left: 10px;
  bottom: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  z-index: 2;
}
#svg-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
}

#svg {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
  //z-index: 1;
}

:deep(.animatePath) {
  stroke-dasharray: 10;
  stroke-dashoffset: 100;
  animation: dash 1s linear infinite;
}

@keyframes dash {
  from {
    stroke-dashoffset: 100;
  }
  to {
    stroke-dashoffset: 0;
  }
}

:deep(#tooltip) {
  position: absolute;
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-width: 0px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
}
</style>
