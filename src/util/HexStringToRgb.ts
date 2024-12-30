export default function hexStrToRgb(hexStr: string): number[] {
  const matches = hexStr.substring(1).match(/../g) || [];
  return matches.map((x) => parseInt(x, 16));
}
