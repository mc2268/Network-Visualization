<script lang="ts" setup>
import AMapLoader from '@amap/amap-jsapi-loader';
import * as d3 from 'd3';

const mapConfig = reactive({
  map: null as any,
});

function initMap() {
  AMapLoader.load({
    key: '5e65243c29605b370b53119d48382f18',
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [
      'AMap.Scale',
      'AMap.ToolBar',
      'AMap.ControlBar',
      'AMap.MouseTool',
      'AMap.MapType',
      'AMap.HawkEye',
      'AMap.CustomLayer', //自定义图层
    ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then(AMap => {
      // 初始化地图
      mapConfig.map = new AMap.Map('gao-de-map', {
        viewMode: '2D', //  是否为3D地图模式
        zoom: 13, // 初始化地图级别
        center: [113.65553, 34.748764], //中心点坐标  郑州
        // features: ['bg'],
        resizeEnable: true,
      });

      mapConfig.map.addControl(new AMap.Scale()); // 添加左下角的比例尺

      let toolBar = new AMap.ToolBar({
        position: {
          bottom: '210px',
          right: '35px',
        },
      });
      let controlBar = new AMap.ControlBar({
        position: {
          bottom: '280px',
          right: '10px',
        },
      });

      const svg = document.querySelector('#svg');

      const customLayer = new AMap.CustomLayer(svg, {
        // zooms: [3, 8],
        // alwaysRender: false,
        zIndex: 2,
      });

      mapConfig.map.addControl(toolBar); // 添加右下角的放大缩小
      mapConfig.map.addControl(controlBar); // 方向盘
      mapConfig.map.addControl(new AMap.MapType()); // 添加右上角的标准图和卫星图  和路况
      mapConfig.map.addControl(new AMap.HawkEye()); // 添加地图放大镜
      mapConfig.map.add(customLayer);
    })
    .catch(e => {
      console.log('e', e);
    });
}

onMounted(() => {
  initMap();
});
</script>

<template>
  <div id="gao-de-map"></div>
</template>

<style lang="less" scoped>
#gao-de-map {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
  z-index: 1;
}
</style>
