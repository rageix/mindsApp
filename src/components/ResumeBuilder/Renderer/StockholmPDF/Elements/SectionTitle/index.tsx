import { PropsWithChildren, useContext } from 'react';
import { StyleSheet, Text } from '@react-pdf/renderer';
import StyleContext from '@/components/ResumeBuilder/Renderer/StyleContext';
import { calcStyles } from '@/util/CalcStyles';

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

interface IProps extends PropsWithChildren {}

export default function SectionTitle({ children }: IProps) {
  const styleContext = useContext(StyleContext);

  return (
    <Text
      style={[
        calcStyles(styles.text, styleContext),
        {
          fontFamily: styleContext.titleFontFamily
            ? styleContext.titleFontFamily
            : undefined,
        },
      ]}
    >
      {children}
    </Text>
  );
}
