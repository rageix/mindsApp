import { PropsWithChildren, useContext } from 'react';
import { StyleSheet, View } from '@react-pdf/renderer';
import StyleContext from '@/components/ResumeBuilder/Renderer/StyleContext';
import { calcStyles } from '@/util/CalcStyles';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
});

interface IProps extends PropsWithChildren {}

export default function SideBarSubsection({ children }: IProps) {
  const styleContext = useContext(StyleContext);

  return (
    <View style={calcStyles(styles.wrapper, styleContext)}>{children}</View>
  );
}
