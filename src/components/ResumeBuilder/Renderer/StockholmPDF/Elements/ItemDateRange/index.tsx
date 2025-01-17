import { IRBDate } from '@/types/Resume';
import { useMemo } from 'react';
import formatResumeDate from '@/util/FormatResumeDate';
import { StyleSheet, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  text: {
    color: '#6b7280',
    fontSize: 14,
  },
});

interface IProps {
  start: IRBDate | null;
  end: IRBDate | null;
}

export default function ItemDateRange({ start, end }: IProps) {
  const startText = useMemo(() => formatResumeDate(start), [start]);
  const endText = useMemo(() => formatResumeDate(end), [end]);

  return (
    <Text style={styles.text}>
      {startText} - {endText}
    </Text>
  );
}