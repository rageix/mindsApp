import { IRBCustom, IRBSection } from '@/types/Resume';
import ItemTextEditor from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/ItemTextEditor';
import ItemDateRange from '../../Elements/ItemDateRange';
import SectionTitle from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SectionTitle';
import ItemTitle from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/ItemTitle';
import { StyleSheet, View } from '@react-pdf/renderer';

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
}

export default function Custom({ section }: IProps) {
  return (
    <View style={styles.container}>
      <SectionTitle>{section.title}</SectionTitle>
      <View>
        {section.data.map((v, i) => {
          const item = v as IRBCustom;
          return (
            <View key={i}>
              <ItemTitle>
                {item.title} in {item.city}
              </ItemTitle>
              <ItemDateRange
                start={item.start}
                end={item.end}
              />
              <View style={{ marginTop: 5 }}>
                <ItemTextEditor value={item.description} />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
