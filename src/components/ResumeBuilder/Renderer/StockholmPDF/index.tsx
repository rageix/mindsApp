import { IResume } from '@/types/Resume';
import MainBody from '@/components/ResumeBuilder/Renderer/StockholmPDF/Sections/MainBody';
import HeaderDetails from '@/components/ResumeBuilder/Renderer/StockholmPDF/Sections/HeaderDetails';
import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import SideColumn from '@/components/ResumeBuilder/Renderer/StockholmPDF/Sections/SideColumn';
import StyleContext from '@/components/ResumeBuilder/Renderer/StyleContext';

const styles = StyleSheet.create({
  page: {
    // flexDirection: 'row',
    backgroundColor: '#fff',
    padding: '.5in',
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
  return (
    <StyleContext.Provider value={resume.style}>
      <Document>
        <Page
          size="LETTER"
          style={[
            styles.page,
            {
              fontFamily: resume.style.fontFamily,
              color: resume.style.primaryColor,
            },
          ]}
        >
          <View
            style={styles.container}
            // debug
          >
            <View style={[styles.section, styles.header]}>
              <HeaderDetails sections={resume.sections} />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View style={[styles.section, { width: '60%' }]}>
                {/*left*/}
                <MainBody sections={resume.sections} />
              </View>
              <View style={[styles.section, { width: '40%' }]}>
                <SideColumn sections={resume.sections} />
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </StyleContext.Provider>
  );
}
