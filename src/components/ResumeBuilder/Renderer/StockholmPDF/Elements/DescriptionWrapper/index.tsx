import { PropsWithChildren, useContext } from 'react';
import { StyleSheet, View } from '@react-pdf/renderer';
import StyleContext from '@/components/ResumeBuilder/Renderer/StyleContext';
import { calcStyles } from '@/util/CalcStyles';

const styles = StyleSheet.create({
  wrapper: {
    marginTop: -2,
  },
});

interface IProps extends PropsWithChildren {}

export default function DescriptionWrapper({ children }: IProps) {
  const styleContext = useContext(StyleContext);

  return (
    <View style={calcStyles(styles.wrapper, styleContext)}>{children}</View>
  );
}
