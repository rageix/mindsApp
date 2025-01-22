import { ERBType, IRBSection, IRBSummary } from '@/types/Resume';
import Summary from '@/components/ResumeBuilder/Renderer/StockholmPDF/Sections/Summary';
import Employment from '@/components/ResumeBuilder/Renderer/StockholmPDF/Sections/Employment';
import { StyleSheet, View } from '@react-pdf/renderer';
import Education from '@/components/ResumeBuilder/Renderer/StockholmPDF/Sections/Education';
import Custom from '@/components/ResumeBuilder/Renderer/StockholmPDF/Sections/Custom';
import Courses from '@/components/ResumeBuilder/Renderer/StockholmPDF/Sections/Courses';
import Internships from '@/components/ResumeBuilder/Renderer/StockholmPDF/Sections/Internships';
import References from '@/components/ResumeBuilder/Renderer/StockholmPDF/Sections/References';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
});

interface IProps {
  sections: IRBSection[];
  fontScale: number;
}

export default function MainBody({ sections, fontScale }: IProps) {
  return (
    <View
      // debug
      style={styles.container}
    >
      {sections.map((v, i) => {
        if (v.isHidden) {
          return null;
        }

        switch (v.type) {
          case ERBType.Summary:
            return (
              <Summary
                key={i}
                data={v.data[0] as IRBSummary}
                fontScale={fontScale}
              />
            );
          case ERBType.Employment:
            return (
              <Employment
                key={i}
                section={v}
                fontScale={fontScale}
              />
            );
          case ERBType.Education:
            return (
              <Education
                key={i}
                section={v}
                fontScale={fontScale}
              />
            );
          case ERBType.Custom:
            return (
              <Custom
                key={i}
                section={v}
                fontScale={fontScale}
              />
            );
          case ERBType.Course:
            return (
              <Courses
                key={i}
                section={v}
                fontScale={fontScale}
              />
            );
          case ERBType.Internship:
            return (
              <Internships
                key={i}
                section={v}
                fontScale={fontScale}
              />
            );
          case ERBType.Reference:
            return (
              <References
                key={i}
                section={v}
                fontScale={fontScale}
              />
            );
          default:
            return null;
        }
      })}
    </View>
  );
}
