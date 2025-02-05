import { IRBStyle } from '@/types/Resume';
import { Document, Page, View } from '@react-pdf/renderer';
import StyleContext from '@/components/ResumeBuilder/Renderer/StyleContext';
import { styles } from '@/components/ResumeBuilder/Renderer/Templates/Birman/styles';
import { PropsWithChildren } from 'react';
import Watermark from '@/components/ResumeBuilder/Renderer/Watermark';

interface IProps extends PropsWithChildren {
  style: IRBStyle;
  demo: boolean;
}

export default function Birman({ style, demo, children }: IProps) {
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
          {demo && <Watermark />}
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
