<script lang="ts" setup>
import { Codemirror } from 'vue-codemirror';
import { json } from '@codemirror/lang-json';
import { toParseNormal } from '@/utils';
import type { IState } from '@/views/NetworkGraph/index.vue';
import { message } from 'ant-design-vue';

const state = inject<IState>('state');

const code = computed(() => JSON.stringify(state.value.renderData, null, '\t'));

const rewriteCode = ref();

watch(
  () => code,
  () => {
    console.log('code change');
    rewriteCode.value = undefined;
  },
);

const extensions = [json()];

function handleChange(value: any) {
  try {
    rewriteCode.value = JSON.parse(value);
  } catch (err: any) {
    message.warn(err.toString());
  }
  console.log('rewriteCode.value', rewriteCode.value);
}

function handleSet() {
  if (rewriteCode.value) {
    const sourceNodes = state.value.renderData.nodes;
    const sourceLinks = state.value.renderData.links;

    const rewriteNodes = rewriteCode.value.nodes;
    const rewriteLinks = rewriteCode.value.links;

    operateSource(sourceNodes, rewriteNodes);
    operateSource(sourceLinks, rewriteLinks);
  }
}

function operateSource(source: any[], rewrite: any[]) {
  const rewriteIDS = rewrite?.map((item: any) => item.id);
  const sourceIDS = source?.map((item: any) => item.id);

  rewrite.forEach((item: any, i: number) => {
    source[sourceIDS.indexOf(item.id)].config = item.config;
  });
}
</script>

<template>
  <a-card
    style="height: 100%; width: 100%"
    :head-style="{ height: '64px' }"
    :body-style="{ padding: 0, height: 'calc(100% - 64px) ', overflow: 'auto' }"
  >
    <template #title>
      <div style="display: flex; justify-content: center; align-items: center; font-weight: 500; font-size: 20px">
        <span>Code Panel</span>
      </div>
    </template>

    <div class="container">
      <main class="main">
        <div class="code-container">
          <codemirror
            :model-value="code"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="extensions"
            :lineWrapping="true"
            ref="codemirror"
            :style="{ height: '100%', width: '600px' }"
            @change="handleChange"
          ></codemirror>
        </div>
      </main>

      <div class="bottom">
        <a-button @click="handleSet">Set</a-button>
      </div>
    </div>
  </a-card>
</template>

<style lang="less" scoped>
:deep(.ant-collapse-content-box) {
  width: 300px;
}

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .main {
    flex: 1;
    overflow: auto;
  }
  .bottom {
    display: flex;
    padding-right: 10px;
    height: 40px;
    align-items: center;
    justify-content: flex-end;
  }
}

.code-container {
  width: 100%;
  height: 100%;
}
</style>
