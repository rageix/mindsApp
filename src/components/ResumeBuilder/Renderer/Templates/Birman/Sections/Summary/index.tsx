import { IRBSection, IRBSummary } from '@/types/Resume';
import ItemTextEditor from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/ItemTextEditor';
import { View } from '@react-pdf/renderer';
import SectionWrapper from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/SectionWrapper';
import DescriptionWrapper from '../../Elements/DescriptionWrapper';
import SidebarTitle from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/SidebarTitle';

interface IProps {
  section: IRBSection;
}

export default function Summary({ section }: IProps) {
  if (section.isHidden) {
    return null;
  }

  const data = section.data[0] as IRBSummary;

  if(!data) {
    return null;
  }

  return (
    <SectionWrapper>
      <View>
        <SidebarTitle>{section.title}</SidebarTitle>
      </View>
      <DescriptionWrapper>
        <ItemTextEditor value={data.description} />
      </DescriptionWrapper>
    </SectionWrapper>
  );
}
