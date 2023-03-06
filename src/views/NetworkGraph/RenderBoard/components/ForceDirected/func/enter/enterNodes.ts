import drawMeta from '@/views/NetworkGraph/RenderBoard/components/ForceDirected/func/drawMeta';
import drawText from '@/views/NetworkGraph/RenderBoard/components/ForceDirected/func/drawText';

export default function enterNodes(selection: any) {
  drawMeta.call(this, selection);
  drawText.call(this, selection);
}
