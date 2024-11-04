import { DAYS_ABBR, MONTHS_ABBR } from '@/util/Time';
import dayjs from 'dayjs';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  value: Date | undefined;
}

export default function FormattedDate(props: Props) {
  if (!props.value) {
    return null;
  }

  const date = dayjs(props.value);

  return (
    <span {...props}>
      {DAYS_ABBR[date.day()]} {MONTHS_ABBR[date.month()]} {date.date()}{' '}
      {date.format('h:mm A')}
    </span>
  );
}
