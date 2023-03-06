<script lang="ts" setup>
const privateOption = inject('privateOption');

const options = [
  {
    label: 'on',
    value: true,
  },
  {
    label: 'off',
    value: false,
  },
];
</script>

<template>
  <div class="title">
    <strong>Arrow</strong>
    <a-select style="width: 150px" v-model:value="privateOption.link.arrow" :options="options"></a-select>
  </div>
</template>

<style lang="less" scoped>
.title {
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
