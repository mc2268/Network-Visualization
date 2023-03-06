<script lang="ts" setup>
import * as d3 from 'd3';
import ScaleTools from './ScaleTools';
import type { IConfig, IState } from '@/views/NetworkGraph/context.vue';
import { COMPONENTS_MAP } from './constant';
import Layout from '@/views/NetworkGraph/OptionsPanel/Layout/index';
import { toParseNormal } from '@/utils';
// import target from '@/views/NetworkGraph/Target/index';
import Menu from '@/views/NetworkGraph/RenderBoard/components/ForceDirected/Menu/index';
import Thumb from '@/views/NetworkGraph/RenderBoard/components/ForceDirected/Thumb/index';
import Explain from '@/views/NetworkGraph/RenderBoard/components/ForceDirected/Explain/index';

const config = inject<IConfig>('config');

const state = inject<IState>('state');

const focus = ref<boolean>(false);

watch(focus, () => {
  if (focus.value === true) {
    d3.selectAll('.node')
      .filter(item => !item.selected)
      .style('display', 'none');

    d3.selectAll('.link')
      .filter(item => !item.selected)
      .style('display', 'none');
  } else {
    d3.selectAll('.node')
      .filter(item => !item.selected)
      .style('display', 'block');

    d3.selectAll('.link')
      .filter(item => !item.selected)
      .style('display', 'block');
  }
});
</script>

<template>
  <div class="wrapper">
    <div class="layout">
      <a-card
        style="height: 100%"
        :head-style="{ height: '64px' }"
        :body-style="{ padding: '10px', height: 'calc(100% - 64px)', overflow: 'auto' }"
      >
        <template #title>
          <div style="display: flex; justify-content: center; text-align: center">
            <strong class="title" style="font-size: 20px; font-weight: 500">Layout</strong>
          </div>
        </template>

        <Layout></Layout>
      </a-card>
    </div>

    <div class="render">
      <a-card
        class="container"
        :body-style="{ padding: 0, height: 'calc(100% - 64px)' }"
        :head-style="{ padding: 0, margin: 0, height: '64px' }"
      >
        <template #title>
          <div class="title">
            <div>
              thumb:
              <a-switch v-model:checked="state.thumb"></a-switch>
            </div>
            <!--            <ScaleTools></ScaleTools>-->
            <strong style="font-size: 20px; font-weight: 500">View</strong>
            <!--占位布局-->
            <div>
              focus mode
              <a-switch v-model:checked="focus"></a-switch>
            </div>
          </div>
        </template>

        <div class="render-container">
          <component :is="COMPONENTS_MAP[config.layout]"></component>
          <Menu></Menu>
          <Explain></Explain>
          <Thumb></Thumb>
        </div>
      </a-card>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.layout {
  height: 200px;
}

.render {
  margin-top: 10px;
  flex: 1;
}

.container {
  height: 100%;
}
.title {
  display: flex;
  padding: 0 10px;
  justify-content: space-between;
}
.render-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
