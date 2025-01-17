import { IRBSummary } from '@/types/Resume';
import ItemTextEditor from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/ItemTextEditor';
import { StyleSheet, View } from '@react-pdf/renderer';
import SectionTitle from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SectionTitle';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
});

interface IProps {
  data: IRBSummary;
}

export default function Summary({ data }: IProps) {
  return (
    <View debug style={styles.container}>
      <View>
        <SectionTitle>Summary</SectionTitle>
      </View>
      <View>
        <ItemTextEditor value={data.description} />
      </View>
    </View>
  );
}
