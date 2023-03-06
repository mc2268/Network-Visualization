<script lang="ts" setup>
const privateOption = inject('privateOption');
</script>

<template>
  <div class="title">
    <strong>Distance</strong>
    <a-input-number style="width: 150px" v-model:value="privateOption.link.distance"></a-input-number>
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
