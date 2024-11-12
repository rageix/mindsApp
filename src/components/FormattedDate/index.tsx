import { DAYS_ABBR, MONTHS_ABBR } from '@/util/Time';
import dayjs from 'dayjs';
import { useMemo } from 'react';

interface Props {
  value: Date | undefined;
  time?: boolean;
  year?: boolean;
}

export default function FormattedDate(props: Props) {
  const date = dayjs(props.value);
  const output = useMemo(() => {
    if (!props.value) {
      return null;
    }

    const out = [DAYS_ABBR[date.day()], MONTHS_ABBR[date.month()], date.date()];

    if (props.time !== false) {
      out.push(date.format('h:mm A'));
    }

    if (props.year) {
      out.push(date.format('YYYY'));
    }

    return out.join(' ');
  }, [props.value, props.time, props.year]);

  if (!output) {
    return null;
  }

  return <span {...props}>{output}</span>;
}
