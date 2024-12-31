/**
 * Converts CSS hex format to scaled RGB of [0,1]
 * @param hexStr Hex formatted string to convert to scaled rgb
 * @return {number[]} Scaled RGB array of [0,1]
 */
export default function hexStrToRgb(hexStr: string): number[] {
  const matches = hexStr.substring(1).match(/../g) || [];
  return matches.map((x) => parseInt(x, 16) / 255);
}
