import * as d3 from 'd3';
import { interpolatePath } from 'd3-interpolate-path';
import transitMap from '@/mock/amsterdam-transit-map-6.json';
import geoMapPrepared from '@/mock/geoMap.json';

import { toParseNormal } from '@/utils';
import type { Ref } from 'vue';

const colors = new Map(
  Object.entries({
    '1': '#f04431ff',
    '2': '#33b540ff',
    '3': '#9c8dceff',
    '4': '#f24daeff',
    '5': '#7264b8ff',
    '6': '#9c8dceff',
    '7': '#f68463ff',
    '11': '#59c134ff',
    '12': '#0b904bff',
    '13': '#a6d71cff',
    '14': '#ed0d92ff',
    '17': '#a9dd7eff',
    '19': '#f2583fff',
    '24': '#f680c5ff',
    '26': '#5f53aeff',
    '50': '#1aae48ff',
    '51': '#f78d11ff',
    '52': '#05a1e6ff',
    '53': '#ce0f3eff',
    '54': '#e2c104ff',
  }),
);

export default function render({ step }: { step: Ref<number> }) {
  // 根据svg大小设置宽高
  const width = (document.querySelector('#svg') as any).clientWidth;
  const height = (document.querySelector('#svg') as any).clientHeight;

  const svg = d3.select('#svg').attr('width', width).attr('height', height);

  const projection = d3
    .geoIdentity(true)
    .reflectY(true)
    .fitExtent(
      [
        [5, 5],
        [width - 5, height - 5],
      ],
      geoMapPrepared,
    );

  const path = d3.geoPath().projection(projection);

  const legend = svg
    .append('g')
    .attr('transform', 'translate(5, 480)')
    .attr('font-size', '14px')
    .attr('paint-order', 'stroke')
    .call(drawLegend);

  let currentData = geoMapPrepared.features;
  let prevData = transitMap.features;

  console.log('currentData', currentData);
  console.log('prevData', prevData);

  function reRender(data: any, step: number) {
    svg
      .selectAll('path')
      .data(data, d => d.properties.lijn)
      .join(
        enter =>
          enter
            .append('path')
            .attr('fill', 'none')
            .attr('stroke-linejoin', 'round')
            .attr('stroke', d => colors.get(d.properties.lijn))
            .attr('stroke-width', 1.75)
            .attr('d', path)
            .append('title')
            .text(d => d.properties.lijn),
        update =>
          update.call(update =>
            update.attr('d', function (d, index, groups) {
              const previous = d3.select(this).attr('d');
              const current = path(d);

              const pathInterpolator = interpolatePath(previous, current);

              return pathInterpolator(step);
            }),
          ),
      );
  }

  reRender(currentData);

  watch(step, (value, oldValue) => {
    console.log('step变化了', step);
    if (value > oldValue) {
      if (value > 9) {
        reRender(prevData, 1);
      } else {
        reRender(prevData, ((10 - step.value) * step.value) / (10 * 10));
      }
    }
    if (value < oldValue) {
      if (value < 1) {
        reRender(currentData, 1);
      } else {
        reRender(currentData, (step.value * (10 - step.value)) / (10 * 10));
      }
    }
  });

  // setTimeout(() => {
  //   [prevData, currentData] = [currentData, prevData];
  // }, 1000);
}

function drawLegend(g: any) {
  g.append('text')
    .attr('y', -20)
    .attr('font-size', '1.5em')
    .attr('text-decoration', 'underline')
    .attr('font-weight', 'bold')
    .text('Tram');

  g.append('text')
    .attr('x', 80)
    .attr('y', 200)
    .attr('font-size', '1.5em')
    .attr('text-decoration', 'underline')
    .attr('font-weight', 'bold')
    .text('Metro');

  const legendEntries = g
    .selectAll('line')
    .data(colors)
    .join('g')
    .attr('transform', (d, i) => (Number(d[0]) < 50 ? `translate(0, ${i * 22})` : `translate(80, ${(i - 5) * 22})`));

  legendEntries
    .append('line')
    .attr('stroke-width', 3)
    .attr('x1', 0)
    .attr('x2', 30)
    .attr('stroke', d => d[1]);

  legendEntries
    .append('text')
    .text(d => d[0])
    .attr('x', 35)
    .attr('fill', d => d[1])
    .attr('stroke', 'gainsboro')
    .attr('alignment-baseline', 'middle')
    .attr('stroke-width', '1px');
}
