export default function hexStrToRgb(hexStr: string): string {
  return `rgb(${hexStr
    .substring(1)
    .match(/../g) || []
    .map((x) => +`0x${x}`)})`;
}
