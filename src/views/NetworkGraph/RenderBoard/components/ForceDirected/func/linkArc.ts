export default function linkArc(d) {
  const r = Math.hypot(d.target?.x - d.source?.x, d.target?.y - d.source?.y);
  return `
                M${d.source?.x},${d.source?.y}
                A${r},${r} 0 0,1 ${d.target?.x},${d.target?.y}
            `;
}
