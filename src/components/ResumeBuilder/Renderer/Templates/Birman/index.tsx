import { IRBStyle } from '@/types/Resume';
import { Document, Page, View } from '@react-pdf/renderer';
import StyleContext from '@/components/ResumeBuilder/Renderer/StyleContext';
import { styles } from '@/components/ResumeBuilder/Renderer/Templates/Birman/styles';
import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {
  style: IRBStyle;
}

export default function Birman({ style, children }: IProps) {
  console.log('resume.style', style);
  return (
    <StyleContext.Provider value={style}>
      <Document>
        <Page
          size="LETTER"
          style={[
            styles.page,
            {
              fontFamily: style.fontFamily,
              color: style.primaryColor,
            },
          ]}
        >
          <View
            style={styles.container}
            // debug
          >
            {children}
          </View>
        </Page>
      </Document>
    </StyleContext.Provider>
  );
}
