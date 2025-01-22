import { IRBDate } from '@/types/Resume';
import { useMemo } from 'react';
import formatResumeDate from '@/util/FormatResumeDate';
import { StyleSheet, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
});

interface IProps {
  start: IRBDate | null;
  end: IRBDate | null;
  fontScale: number;
}

export default function ItemDateRange({ start, end, fontScale }: IProps) {
  const startText = useMemo(() => formatResumeDate(start), [start]);
  const endText = useMemo(() => formatResumeDate(end), [end]);

  return (
    <Text style={[styles.text, {fontSize: styles.text.fontSize * fontScale}]}>
      {startText} - {endText}
    </Text>
  );
}