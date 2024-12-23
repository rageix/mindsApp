import { roundWithPre } from '@/util/RoundWithPre';

export function roundTo1Place(num: number): number {
 return roundWithPre(num, 10);
}