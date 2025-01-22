import { PropsWithChildren } from 'react';
import { StyleSheet, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

interface IProps extends PropsWithChildren {
  fontScale: number;
}

export default function SectionTitle({ fontScale, children }: IProps) {
  return (
    <Text style={[styles.text, { fontSize: styles.text.fontSize * fontScale }]}>
      {children}
    </Text>
  );
}
