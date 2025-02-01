import { IRBCourse, IRBSection } from '@/types/Resume';
import ItemTextEditor from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/ItemTextEditor';
import ItemDateRange from '../../Elements/ItemDateRange';
import SectionTitle from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/SectionTitle';
import ItemTitle from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/ItemTitle';
import { View } from '@react-pdf/renderer';
import ItemsWrapper from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/ItemsWrapper';
import DescriptionWrapper from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/DescriptionWrapper';
import SectionWrapper from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/SectionWrapper';
import { generateTemplateTitle } from '@/util/GenerateTemplateTitle';

interface IProps {
  section: IRBSection;
}

export default function Courses({ section }: IProps) {



  return (
    <SectionWrapper>
      <SectionTitle>{section.title}</SectionTitle>
      <ItemsWrapper>
        {section.data.map((v, i) => {
          const item = v as IRBCourse;
          const title = generateTemplateTitle([
            {value: item.name},
            {value: item.institution, pre: 'at'}
          ]);
          return (
            <View key={i}>
              <ItemTitle>
                {title}
              </ItemTitle>
              <ItemDateRange
                start={item.start}
                end={item.end}
              />
              <DescriptionWrapper>
                <ItemTextEditor value={item.description} />
              </DescriptionWrapper>
            </View>
          );
        })}
      </ItemsWrapper>
    </SectionWrapper>
  );
}
