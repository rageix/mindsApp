import { PropsWithChildren, useContext } from 'react';
import { StyleSheet, Text } from '@react-pdf/renderer';
import StyleContext from '@/components/ResumeBuilder/Renderer/styleContext';
import { calcStyles } from '@/util/CalcStyles';

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

interface IProps extends PropsWithChildren {}

export default function SidebarTitle({ children }: IProps) {
  const styleContext = useContext(StyleContext);

  return <Text style={calcStyles(styles.text, styleContext)}>{children}</Text>;
}
