export default function drawText(selection: any) {
  return selection
    .append('g')
    .attr('class', 'nodeText')
    .append('g')
    .attr('class', 'text')
    .append('text')
    .attr('x', 8)
    .attr('y', '0.31em')
    .attr('class', 'text')
    .style('font-size', (d: any) => {
      return `${d.config.size / 2}px`;
    })
    .text((d: any) => d.id)
    .style('display', (d: any) => {
      if (!d.config.label) {
        return 'none';
      }
    });
}
