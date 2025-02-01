import { IRBInternship, IRBSection } from '@/types/Resume';
import ItemTextEditor from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/ItemTextEditor';
import ItemDateRange from '../../Elements/ItemDateRange';
import SectionTitle from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/SectionTitle';
import ItemTitle from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/ItemTitle';
import { View } from '@react-pdf/renderer';
import DescriptionWrapper from '../../Elements/DescriptionWrapper';
import ItemsWrapper from '../../Elements/ItemsWrapper';
import SectionWrapper from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/SectionWrapper';
import { generateTemplateTitle } from '@/util/GenerateTemplateTitle';

interface IProps {
  section: IRBSection;
}

export default function Internships({ section }: IProps) {
  return (
    <SectionWrapper>
      <SectionTitle>{section.title}</SectionTitle>
      <ItemsWrapper>
        {section.data.map((v, i) => {
          const item = v as IRBInternship;
          const title = generateTemplateTitle([
            {value: item.title},
            {value: item.employer, pre: 'at'},
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
