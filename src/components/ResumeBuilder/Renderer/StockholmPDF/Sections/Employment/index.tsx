import { IRBEmployment, IRBSection } from '@/types/Resume';
import ItemTextEditor from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/ItemTextEditor';
import ItemDateRange from '../../Elements/ItemDateRange';
import SectionTitle from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SectionTitle';
import ItemTitle from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/ItemTitle';
import { View } from '@react-pdf/renderer';
import SectionWrapper from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SectionWrapper';
import ItemsWrapper from '../../Elements/ItemsWrapper';
import DescriptionWrapper from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/DescriptionWrapper';

interface IProps {
  section: IRBSection;
}

export default function Employment({ section }: IProps) {
  return (
    <SectionWrapper>
      <SectionTitle>{section.title}</SectionTitle>
      <ItemsWrapper>
        {section.data.map((v, i) => {
          const item = v as IRBEmployment;
          return (
            <View key={i}>
              <ItemTitle>
                {item.title} at {item.employer} in {item.city}
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
