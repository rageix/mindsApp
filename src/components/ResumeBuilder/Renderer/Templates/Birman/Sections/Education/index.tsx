import { IRBEducation, IRBSection } from '@/types/Resume';
import ItemTextEditor from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/ItemTextEditor';
import ItemDateRange from '../../Elements/ItemDateRange';
import SectionTitle from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/SectionTitle';
import ItemTitle from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/ItemTitle';
import { View } from '@react-pdf/renderer';
import SectionWrapper from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/SectionWrapper';
import ItemsWrapper from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/ItemsWrapper';
import DescriptionWrapper from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/DescriptionWrapper';
import { generateTemplateTitle } from '@/util/GenerateTemplateTitle';

interface IProps {
  section: IRBSection;
}

export default function Education({ section }: IProps) {
  return (
    <SectionWrapper>
      <SectionTitle>{section.title}</SectionTitle>
      <ItemsWrapper>
        {section.data.map((v, i) => {
          const item = v as IRBEducation;
          const title = generateTemplateTitle([
            {value: item.degree},
            {value: item.school, pre: 'at'},
            {value: item.city, pre: 'in'}
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
