import { IRBLink, IRBSection } from '@/types/Resume';
import SectionTitle from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SectionTitle';
import { Link, StyleSheet, View } from '@react-pdf/renderer';

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

export default function Links({ section }: IProps) {
  return (
    <View style={styles.container}>
      <SectionTitle>{section.title}</SectionTitle>
      <View>
        {section.data.map((v, i) => {
          const item = v as IRBLink;
          return (
            <View key={i}>
              <Link href={item.link}>{item.label}</Link>
            </View>
          );
        })}
      </View>
    </View>
  );
}
