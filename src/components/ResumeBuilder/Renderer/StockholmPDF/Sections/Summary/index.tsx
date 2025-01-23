import { IRBSummary } from '@/types/Resume';
import ItemTextEditor from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/ItemTextEditor';
import { View } from '@react-pdf/renderer';
import SectionTitle from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SectionTitle';
import SectionWrapper from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SectionWrapper';
import DescriptionWrapper from '../../Elements/DescriptionWrapper';

interface IProps {
  data: IRBSummary;
}

export default function Summary({ data }: IProps) {
  return (
    <SectionWrapper>
      <View>
        <SectionTitle>Summary</SectionTitle>
      </View>
      <DescriptionWrapper>
        <ItemTextEditor value={data.description} />
      </DescriptionWrapper>
    </SectionWrapper>
  );
}
