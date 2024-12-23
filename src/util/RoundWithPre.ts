/**
 * Rounds a number with a precision;
 * @param num - number to round
 * @param pre - precision
 */
export function roundWithPre(num: number, pre: number) {
  return Math.round(num * pre) / pre;
}
