import type { Ref } from 'vue';

export default function useScale(state: Ref, selection: any) {
  // 缩放
  watch(
    () => state.value.scale,
    () => {
      selection.style('scale', state.value.scale);
    },
  );
}
