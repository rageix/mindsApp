import { PropsWithChildren, useContext } from 'react';
import { StyleSheet, Text } from '@react-pdf/renderer';
import StyleContext from '@/components/ResumeBuilder/Renderer/styleContext';
import { calcStyles } from '@/util/CalcStyles';

const styles = StyleSheet.create({
  wrapper: {
    fontSize: 12,
  },
});

interface IProps extends PropsWithChildren {}

export default function SideBarTextWrapper({ children }: IProps) {
  const styleContext = useContext(StyleContext);

  return (
    <Text style={calcStyles(styles.wrapper, styleContext)}>{children}</Text>
  );
}
