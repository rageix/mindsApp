import { PropsWithChildren, useContext } from 'react';
import { StyleSheet, Text } from '@react-pdf/renderer';
import StyleContext from '@/components/ResumeBuilder/Renderer/StyleContext';
import { calcStyles } from '@/util/CalcStyles';

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});

interface IProps extends PropsWithChildren {
}

export default function ItemTitle({ children }: IProps) {
  const styleContext = useContext(StyleContext);

  return (
    <Text style={calcStyles(styles.text, styleContext)}>
      {children}
    </Text>
  );
}
