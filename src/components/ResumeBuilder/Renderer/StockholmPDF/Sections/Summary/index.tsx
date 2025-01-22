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
  fontScale: number;
}

export default function Summary({ data, fontScale }: IProps) {
  return (
    <View style={styles.container}>
      <View>
        <SectionTitle fontScale={fontScale}>Summary</SectionTitle>
      </View>
      <View>
        <ItemTextEditor value={data.description} fontScale={fontScale} />
      </View>
    </View>
  );
}
