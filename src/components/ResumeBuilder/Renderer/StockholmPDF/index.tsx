import { IResume } from '@/types/Resume';
import MainBody from '@/components/ResumeBuilder/Renderer/StockholmPDF/Sections/MainBody';
import HeaderDetails from '@/components/ResumeBuilder/Renderer/StockholmPDF/Sections/HeaderDetails';
import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import SideColumn from '@/components/ResumeBuilder/Renderer/StockholmPDF/Sections/SideColumn';

const styles = StyleSheet.create({
  page: {
    // flexDirection: 'row',
    backgroundColor: '#fff',
  },
  section: {
    // margin: 10,
    padding: 10,
    // flexGrow: 1
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: '100%',
  },
  mainBody: {
    display: 'flex',
    flexDirection: 'column',
    columnGap: 10,
    rowGap: 10,
    flex: 1,
  },
  header: {},
});

interface IProps {
  resume: IResume;
}

export default function StockholmPDF({ resume }: IProps) {

  const fontScale = resume.style.fontSize / 16;

  return (
    <Document>
      <Page
        size="A4"
        style={[styles.page, {
          fontFamily: resume.style.fontFamily,
          color: resume.style.primaryColor,
          fontSize: resume.style.fontSize,
          lineHeight: resume.style.lineHeight,
        }]}
      >
        <View
          style={styles.container}
          // debug
        >
          <View style={[styles.section, styles.header]}>
            <HeaderDetails sections={resume.sections} fontScale={fontScale} />
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
            <View style={[styles.section, { flexGrow: 1 }]}>
              {/*left*/}
              <MainBody sections={resume.sections} fontScale={fontScale} />
            </View>
            <View style={[styles.section, { width: '33%', flexShrink: 0 }]}>
              <SideColumn sections={resume.sections} fontScale={fontScale} />
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
