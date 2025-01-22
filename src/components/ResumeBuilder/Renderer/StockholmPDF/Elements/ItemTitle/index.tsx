import { PropsWithChildren } from 'react';
import { StyleSheet, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

interface IProps extends PropsWithChildren {
  fontScale: number;
}

export default function ItemTitle({ fontScale, children }: IProps) {
  return (
    <Text style={[styles.text, { fontSize: styles.text.fontSize * fontScale }]}>
      {children}
    </Text>
  );
}
