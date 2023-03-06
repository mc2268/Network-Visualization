<!--该组件只提供布局-->

<script lang="ts" setup>
import DataPipelines from './DataPipelines';
import RenderBoard from './RenderBoard';
import OptionsPanel from './OptionsPanel';
import dataset from '@/mock/outline_grapg_datas.json';
import DataInformation from './DataInformation';
import Target from './Target';
import CodePanel from './CodePanel';
import FoldIcon from '@/components/FoldIcon';
import Topo from './Topo';
import Explain from './Explain';
</script>

<template>
  <a-row class="context-wrapper" :gutter="10" type="flex" style="flex-wrap: nowrap">
    <a-col flex="600px" id="leftPanel">
      <a-row type="flex" style="width: 100%; height: 100%; flex-direction: column; justify-content: space-between">
        <a-row type="flex" style="width: 100%; height: 45%; justify-content: space-between">
          <a-col style="height: 100%; width: 100%">
            <OptionsPanel></OptionsPanel>
          </a-col>
        </a-row>

        <a-row style="width: 100%; height: 25%">
          <Explain></Explain>
        </a-row>

        <a-row style="width: 100%; height: calc(30% - 20px)">
          <a-col style="height: 100%; width: 100%">
            <CodePanel></CodePanel>
          </a-col>
        </a-row>
      </a-row>
    </a-col>

    <a-col flex="auto" style="overflow: hidden">
      <RenderBoard></RenderBoard>
    </a-col>

    <a-col flex="500px" id="rightPanel">
      <a-row type="flex" style="width: 100%; height: 100%; justify-content: space-between; flex-direction: column">
        <a-row style="height: 30%; width: 100%">
          <DataPipelines></DataPipelines>
        </a-row>
        <a-row style="height: calc(40% - 10px); width: 100%">
          <DataInformation></DataInformation>
        </a-row>
        <a-row style="height: calc(30% - 10px); width: 100%">
          <Topo></Topo>
        </a-row>
      </a-row>
    </a-col>
  </a-row>
</template>

<style lang="less" scoped>
.context-wrapper {
  padding: 10px;
  background-color: #f8f6f6;
  width: 100%;
  height: 100%;
}
</style>
