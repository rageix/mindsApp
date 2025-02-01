import { IRBLanguage, IRBSection } from '@/types/Resume';
import { View } from '@react-pdf/renderer';
import { LANGUAGE_OPTIONS } from '@/common/Resume';
import SidebarTitle from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/SidebarTitle';
import SectionWrapper from '../../Elements/SectionWrapper';
import SideBarTextWrapper from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/SideBarTextWrapper';
import ItemsWrapper from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/ItemsWrapper';

interface IProps {
  section: IRBSection;
}

export default function Languages({ section }: IProps) {
  if (section.isHidden) {
    return null;
  }

  return (
    <SectionWrapper>
      <SidebarTitle>{section.title}</SidebarTitle>
      <ItemsWrapper>
        {section.data.map((v, i) => {
          const item = v as IRBLanguage;
          const option = LANGUAGE_OPTIONS.find((v) => v.value === item.level);

          return (
            <View
              key={i}
              style={{ display: 'flex' }}
            >
              <SideBarTextWrapper>
                {item.language}
                {option && ' - ' + option.label}
              </SideBarTextWrapper>
            </View>
          );
        })}
      </ItemsWrapper>
    </SectionWrapper>
  );
}
