/**
 * Joins multiple classes together into one string.
 * @param classes - classes to join
 */
export function cn(...classes: (string | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
