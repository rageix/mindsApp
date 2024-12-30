export default function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((x) =>
        Math.round(x || 0)
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')
  );
}
