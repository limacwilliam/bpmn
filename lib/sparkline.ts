export function createSparklinePath(
  values: number[],
  width: number,
  height: number
) {
  if (!values || values.length < 2) return "";

  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = maxValue - minValue || 1;

  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * width;
    const y = height - ((value - minValue) / range) * height;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return `M ${points.join(" L ")}`;
}
