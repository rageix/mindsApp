import { IRBDate } from '@/types/Resume';
import { useMemo } from 'react';
import formatResumeDate from '@/util/FormatResumeDate';

interface IProps{
  start: IRBDate | null,
  end: IRBDate | null,
}

export default function ItemDateRange({start, end}: IProps) {

  const startText = useMemo(() => formatResumeDate(start), [start]);
  const endText = useMemo(() => formatResumeDate(end), [end]);

  return (
    <p>
      {startText} - {endText}
    </p>
  )
}