/**
 * Checks if a string is blank. Will detect if a string has just whitespace.
 * @param arg
 */
export function isBlank(arg: string): boolean {
  return !arg || /^\s*$/.test(arg);
}
