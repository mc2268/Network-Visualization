<script lang="ts" setup>
import type { IState } from '@/views/NetworkGraph/context.vue';
import html2canvas from 'html2canvas';
import ForceDirected from '@/views/NetworkGraph/RenderBoard/components/ForceDirected/index';

const state = inject<IState>('state');

const display = computed(() => (state.value.thumb ? 'block' : 'none'));

onMounted(() => {
  setTimeout(() => {
    const svg = document.querySelector('#svg-container');
    html2canvas(svg, {
      allowTaint: true,
      width: svg.clientWidth,
      height: svg.clientHeight,
      scrollX: 0,
      scrollY: 0,
      useCORS: true,
      dpi: 182,
    }).then(canvas => {
      console.log('canvas', 'canvas');
      const imgURL = canvas.toDataURL('image/webp', 1);
      const img = document.createElement('img');
      img.src = imgURL;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      document.querySelector('#thumb').appendChild(img);
    });
  }, 2000);
});
</script>

<template>
  <div id="thumb" :style="{ display }"></div>
</template>

<style lang="less" scoped>
#thumb {
  position: absolute;
  padding: 10px;
  width: 200px;
  height: 200px;
  overflow: auto;
  top: 0;
  left: 0;
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
