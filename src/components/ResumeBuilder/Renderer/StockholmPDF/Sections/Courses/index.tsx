import { IRBCourse, IRBSection } from '@/types/Resume';
import ItemTextEditor from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/ItemTextEditor';
import ItemDateRange from '../../Elements/ItemDateRange';
import SectionTitle from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SectionTitle';
import ItemTitle from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/ItemTitle';
import { View } from '@react-pdf/renderer';
import ItemsWrapper from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/ItemsWrapper';
import DescriptionWrapper from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/DescriptionWrapper';
import SectionWrapper from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SectionWrapper';

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
          return (
            <View key={i}>
              <ItemTitle>
                {item.name} at {item.institution}
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
