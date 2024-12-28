import { roundWithPre } from '@/util/RoundWithPre';

export default function roundTo2Places(num: number): number {
 return roundWithPre(num, 100);
}