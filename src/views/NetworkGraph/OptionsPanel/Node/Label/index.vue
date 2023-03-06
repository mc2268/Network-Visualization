<script lang="ts" setup>
const privateOption = inject('privateOption');

const options = [
  {
    label: 'id',
    value: 'id',
  },
  {
    label: 'name',
    value: 'name',
  },
];
</script>

<template>
  <div class="title">
    <div>
      <strong>Label</strong>
      <a-switch style="margin-left: 10px" v-model:checked="privateOption.node.label"></a-switch>
    </div>
    <a-select style="width: 150px" v-model:value="privateOption.node.labelContent" :options="options"></a-select>
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
