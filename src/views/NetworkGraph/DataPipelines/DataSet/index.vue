<script lang="ts" setup>
import { FileAddOutlined } from '@ant-design/icons-vue';
const dataset = ref<string>('wheat');
const fileInput = ref<any>(null);

const options = [
  {
    label: 'wheat',
    value: 'wheat',
  },
];

function fileInputClick() {
  fileInput.value.click();
}

function getFile(e) {
  console.log('e', e);
}
</script>

<template>
  <a-row>
    <a-col :span="20">
      <a-select v-model:value="dataset" style="width: 100%" :options="options" placeholder="请选择数据集"></a-select>
    </a-col>
    <a-col :span="4" style="text-align: right">
      <input type="file" ref="fileInput" accept="*" @change="getFile" style="display: none" />
      <FileAddOutlined style="font-size: 30px; color: #c4c3c3" @click="fileInputClick"></FileAddOutlined>
    </a-col>
  </a-row>
</template>
