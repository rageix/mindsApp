import { IRBReference, IRBSection } from '@/types/Resume';
import SectionTitle from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SectionTitle';
import ItemTitle from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/ItemTitle';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

interface IProps {
  section: IRBSection;
  fontScale: number;
}

export default function References({ section, fontScale }: IProps) {
  return (
    <View style={styles.container}>
      <SectionTitle fontScale={fontScale}>{section.title}</SectionTitle>
      <View>
        {section.data.map((v, i) => {
          const item = v as IRBReference;
          if (item.byRequestOnly) {
            return (
              <View key={i}>
                <Text>By Request Only</Text>
              </View>
            );
          }

          return (
            <View key={i}>
              <ItemTitle fontScale={fontScale}>
                {item.name} at {item.company}
              </ItemTitle>
              {item.email && <Text>{item.email}</Text>}
              {item.phone && <Text>{item.phone}</Text>}
            </View>
          );
        })}
      </View>
    </View>
  );
}
