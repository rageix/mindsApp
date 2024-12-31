/**
 * Converts RGB to css hex color format.
 * Assumes r, g, and b are contained in the set [0, 1] and
 *
 * @param   {number}  r       Red
 * @param   {number}  g       Green
 * @param   {number}  b       Blue
 * @return  {string}          Css hex color format
 */
export default function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((x) =>
        Math.round(x * 255 || 0)
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')
  );
}
