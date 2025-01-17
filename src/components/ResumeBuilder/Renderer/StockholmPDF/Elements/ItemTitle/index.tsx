import { PropsWithChildren } from 'react';
import { StyleSheet, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  text: {
    color: '#111827',
    fontWeight: "bold",
    fontSize: 16,
  },
});

interface IProps extends PropsWithChildren {}

export default function ItemTitle({ children }: IProps) {
  return <Text style={styles.text}>{children}</Text>;
}
