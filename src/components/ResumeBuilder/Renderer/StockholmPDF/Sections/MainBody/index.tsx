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
}

export default function MainBody({ sections }: IProps) {
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
              />
            );
          case ERBType.Employment:
            return (
              <Employment
                key={i}
                section={v}
              />
            );
          case ERBType.Education:
            return (
              <Education
                key={i}
                section={v}
              />
            );
          case ERBType.Custom:
            return (
              <Custom
                key={i}
                section={v}
              />
            );
          case ERBType.Course:
            return (
              <Courses
                key={i}
                section={v}
              />
            );
          case ERBType.Internship:
            return (
              <Internships
                key={i}
                section={v}
              />
            );
          case ERBType.Reference:
            return (
              <References
                key={i}
                section={v}
              />
            );
          default:
            return null;
        }
      })}
    </View>
  );
}
