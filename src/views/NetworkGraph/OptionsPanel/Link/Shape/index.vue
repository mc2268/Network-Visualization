<script lang="ts" setup>
const privateOption = inject('privateOption');

const options = [
  {
    label: 'normal',
    value: 'normal',
  },
  {
    label: 'animate',
    value: 'animate',
  },
  {
    label: 'curve',
    value: 'curve',
  },
];
</script>

<template>
  <div class="title">
    <strong>Shape</strong>
    <a-select style="width: 150px" v-model:value="privateOption.link.shape" :options="options"></a-select>
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
