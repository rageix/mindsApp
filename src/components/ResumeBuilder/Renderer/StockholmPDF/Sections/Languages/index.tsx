import { IRBLanguage, IRBSection } from '@/types/Resume';
import SectionTitle from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SectionTitle';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { LANGUAGE_OPTIONS } from '@/common/Resume';

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

export default function Languages({ section }: IProps) {
  return (
    <View style={styles.container}>
      <SectionTitle>{section.title}</SectionTitle>
      <View>
        {section.data.map((v, i) => {
          const item = v as IRBLanguage;
          const option = LANGUAGE_OPTIONS.find((v) => v.value === item.level);

          return (
            <View
              key={i}
              style={{ display: 'flex' }}
            >
              <Text>
                {item.language}
                {option && ' - ' + option.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
