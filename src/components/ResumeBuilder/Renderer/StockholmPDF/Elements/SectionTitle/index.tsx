import { PropsWithChildren } from 'react';
import { StyleSheet, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  text: {
    color: '#111827',
    fontSize: 18,
    fontWeight: 'bold'
  },
});

interface IProps extends PropsWithChildren{
}

export default function SectionTitle({children}: IProps) {

  return (
    <Text style={styles.text}>
      {children}
    </Text>
  )
}