import { IRBDate } from '@/types/Resume';
import { useContext, useMemo } from 'react';
import formatResumeDate from '@/util/FormatResumeDate';
import { StyleSheet, Text } from '@react-pdf/renderer';
import StyleContext from '@/components/ResumeBuilder/Renderer/styleContext';
import { calcStyles } from '@/util/CalcStyles';

const styles = StyleSheet.create({
  text: {
    fontSize: 10,
  },
});

interface IProps {
  start: IRBDate | null;
  end: IRBDate | null;
}

export default function ItemDateRange({ start, end }: IProps) {
  const styleContext = useContext(StyleContext);
  const startText = useMemo(() => formatResumeDate(start), [start]);
  const endText = useMemo(() => formatResumeDate(end), [end]);

  if(!startText && !endText) {
    return null;
  }

  return (
    <Text style={calcStyles(styles.text, styleContext)}>
      {startText}
      {startText && endText ? ' - ' : ''}
      {endText}
    </Text>
  );
}
