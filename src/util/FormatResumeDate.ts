import { IRBDate } from '@/types/Resume';
import { MONTHS_ABBR } from '@/util/Time';

export default function formatResumeDate(date: IRBDate | null): string {
  if (date?.present) {
    return 'Present';
  }

  let out = '';

  console.log('date?.month', date?.month);

  if (date?.month !== null && date?.month !== undefined) {
    out += MONTHS_ABBR[date.month] + ' ';
  }

  if (date?.year) {
    out += date.year;
  }

  return out.trim();
}
