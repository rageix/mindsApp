import { ChangeEvent } from 'react';

/**
 * Tries to get a number from a number input
 * @param e
 */
export function numberFromInput(e: ChangeEvent<HTMLInputElement>): number | null {
  return !Number.isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : 0
}