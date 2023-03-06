<script lang="ts" setup>
import { Codemirror } from 'vue-codemirror';
import { IState } from '@/views/NetworkGraph/context.vue';
import Editor from '@tinymce/tinymce-vue';

const state = inject<IState>('state');

const codeContainerRef = ref<any>();
const containerWidth = ref<number>(0);

watch(
  () => state.value.explain.text,
  () => {
    console.log('explain.text', state.value.explain.text);
  },
);

const init = {
  height: '100%',
  // padding: 0,
  menubar: false,
  statusbar: false,
  toolbar:
    'undo redo  | forecolor backcolor bold italic   | \
    alignleft aligncenter alignright alignjustify | \
     outdent indent | removeformat ',
  preview_styles: false,
  lineHeight: 1,
  format_empty_lines: true,
  resize: false,
};

onMounted(() => {
  containerWidth.value = codeContainerRef.value.clientWidth;
});
</script>

<template>
  <a-card
    style="height: 100%; width: 100%"
    :head-style="{ height: '64px' }"
    :body-style="{ padding: 0, height: 'calc(100% - 64px)', overflow: 'auto' }"
  >
    <template #title>
      <div style="text-align: center; font-weight: 500; font-size: 20px">Explain</div>
    </template>

    <div class="container">
      <div class="code-container" ref="codeContainerRef">
        <Editor v-model="state.explain.text" api-key="no-api-key" :init="init"></Editor>
      </div>

      <div class="bottom">
        <a-switch v-model:checked="state.explain.show"></a-switch>
      </div>
    </div>
  </a-card>
</template>

<style lang="less" scoped>
:deep(.ant-collapse-content-box) {
  width: 100%;
}
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.code-container {
  flex: 1;
  overflow: auto;
}
.bottom {
  height: 40px;
  display: flex;
  padding-right: 10px;
  justify-content: flex-end;
  align-items: center;
}
:deep(#tinymce p) {
  line-height: 1;
  margin-block-start: 0;
  margin-block-end: 10px;
}
</style>
