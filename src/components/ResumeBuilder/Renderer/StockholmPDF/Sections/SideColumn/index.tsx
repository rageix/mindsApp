import { ERBType, IRBSection } from '@/types/Resume';
import { StyleSheet, View } from '@react-pdf/renderer';
import Links from '@/components/ResumeBuilder/Renderer/StockholmPDF/Sections/Links';
import Languages from '@/components/ResumeBuilder/Renderer/StockholmPDF/Sections/Languages';

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

export default function SideColumn({ sections }: IProps) {
  return (
    <View
      debug
      style={styles.container}
    >
      {sections.map((v, i) => {
        switch (v.type) {
          case ERBType.Link:
            return (
              <Links
                key={i}
                section={v}
              />
            );
          case ERBType.Language:
            return (
              <Languages
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
