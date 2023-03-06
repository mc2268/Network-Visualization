import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';

module.exports = {
  publicPath: "./"
};

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 3090,
  },
  plugins: [
    vue(),
    vueJsx(),
    // 自动引入vueapi
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: ['vue', 'vue-router'],

      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true,
        modifyVars: {
          // hack: `true; @import 'ant-design-vue/dist/antd.variable.less'`,
          // '@primary-color': '#eb2f96', // 全局主色
        },
      },
    },
  },
});
