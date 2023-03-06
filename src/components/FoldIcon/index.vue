<script lang="ts" setup>
import { LeftOutlined, RightOutlined, UpOutlined, DownOutlined } from '@ant-design/icons-vue';

interface IProps {
  direction: 'top' | 'bottom' | 'left' | 'right';
  el: string;
  oldDisplay: string;
}

const props = withDefaults(defineProps<IProps>(), {
  direction: 'right',
});

const open = ref<boolean>(true);

const style = computed(() => {
  switch (props.direction) {
    case 'right':
      if (open.value === true) {
        return {
          top: '50%',
          left: '100%',
        };
      }
      return {
        top: '50%',
        left: '0',
      };
  }
});

const ICON_MAP = {
  left: LeftOutlined,
  right: RightOutlined,
  top: UpOutlined,
  bottom: DownOutlined,
};

const Icon = computed(() => {
  if (props.direction === 'right') {
    if (open.value === true) {
      return 'left';
    }
    return 'right';
  }
  if (props.direction === 'left') {
    if (open.value === true) {
      return 'right';
    }
    return 'left';
  }
  if (props.direction === 'top') {
    if (open.value === true) {
      return 'top';
    }
    return 'bottom';
  }

  if (props.direction === 'bottom') {
    if (open.value === true) {
      return 'bottom';
    }
    return 'top';
  }
});

function handleClick() {
  const el = document.querySelector(props.el) as any;

  switch (props.direction) {
    case 'left':
      if (Icon.value === 'left') {
        el.style.display = props.oldDisplay;
        return (open.value = true);
      }
      el.style.display = 'none';
      return (open.value = false);
    case 'right':
      if (Icon.value === 'right') {
        el.style.display = props.oldDisplay;
        return (open.value = true);
      }
      el.style.display = 'none';
      return (open.value = false);
    case 'top':
      if (Icon.value === 'top') {
        el.style.display = props.oldDisplay;
        return (open.value = true);
      }
      el.style.display = 'none';
      return (open.value = false);
    case 'bottom':
      if (Icon.value === 'bottom') {
        el.style.display = props.oldDisplay;
        return (open.value = true);
      }
      el.style.display = 'none';
      return (open.value = false);
  }
}
</script>

<template>
  <div class="icon" :style="style">
    <component :is="ICON_MAP[Icon]" @click="handleClick"></component>
  </div>
</template>

<style lang="less" scoped>
.icon {
  position: absolute;
  display: block;
  z-index: 999;
  font-size: 20px;
}
</style>
