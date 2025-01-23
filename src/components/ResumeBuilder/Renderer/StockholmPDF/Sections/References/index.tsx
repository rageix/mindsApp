import { IRBReference, IRBSection } from '@/types/Resume';
import SectionTitle from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SectionTitle';
import ItemTitle from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/ItemTitle';
import { View } from '@react-pdf/renderer';
import SectionWrapper from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SectionWrapper';
import ItemsWrapper from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/ItemsWrapper';
import MainTextWrapper from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/MainTextWrapper';

interface IProps {
  section: IRBSection;
}

export default function References({ section }: IProps) {
  return (
    <SectionWrapper>
      <SectionTitle>{section.title}</SectionTitle>
      <ItemsWrapper>
        {section.data.map((v, i) => {
          const item = v as IRBReference;
          if (item.byRequestOnly) {
            return (
              <View key={i}>
                <MainTextWrapper>By Request Only</MainTextWrapper>
              </View>
            );
          }

          return (
            <View key={i}>
              <ItemTitle>
                {item.name} at {item.company}
              </ItemTitle>
              {item.email && <MainTextWrapper>{item.email}</MainTextWrapper>}
              {item.phone && <MainTextWrapper>{item.phone}</MainTextWrapper>}
            </View>
          );
        })}
      </ItemsWrapper>
    </SectionWrapper>
  );
}
