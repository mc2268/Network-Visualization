<script lang="ts" setup>
const privateOption = inject<IPrivateOption>('privateOption');
</script>

<template>
  <div class="title">
    <strong>Stroke Color</strong>
    <a-input style="width: 150px" type="color" v-model:value="privateOption.link.stroke"></a-input>
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
