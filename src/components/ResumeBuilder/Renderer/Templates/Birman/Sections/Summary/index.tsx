import { IRBSummary } from '@/types/Resume';
import ItemTextEditor from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/ItemTextEditor';
import { View } from '@react-pdf/renderer';
import SectionTitle from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/SectionTitle';
import SectionWrapper from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/SectionWrapper';
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
