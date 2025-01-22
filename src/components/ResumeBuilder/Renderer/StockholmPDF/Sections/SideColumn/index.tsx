import { ERBType, IRBSection } from '@/types/Resume';
import { StyleSheet, View } from '@react-pdf/renderer';
import Links from '@/components/ResumeBuilder/Renderer/StockholmPDF/Sections/Links';
import Languages from '@/components/ResumeBuilder/Renderer/StockholmPDF/Sections/Languages';
import Skills from '@/components/ResumeBuilder/Renderer/StockholmPDF/Sections/Skills';

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

export default function SideColumn({ sections, fontScale }: IProps) {
  return (
    <View
      // debug
      style={styles.container}
    >
      {sections.map((v, i) => {
        switch (v.type) {
          case ERBType.Link:
            return (
              <Links
                key={i}
                section={v}
                fontScale={fontScale}
              />
            );
          case ERBType.Language:
            return (
              <Languages
                key={i}
                section={v}
                fontScale={fontScale}
              />
            );
          case ERBType.Skill:
            return (
              <Skills
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
