import { ERBSkillLevel, IRBSection, IRBSkill } from '@/types/Resume';
import { View } from '@react-pdf/renderer';
import { ISelectOption } from '@/types/SelectOption';
import SidebarTitle from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SidebarTitle';
import SectionWrapper from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SectionWrapper';
import ItemsWrapper from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/ItemsWrapper';
import SideBarTextWrapper from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SideBarTextWrapper';

const OPTIONS: ISelectOption<ERBSkillLevel | null>[] = [
  {
    key: String(ERBSkillLevel.Novice),
    value: ERBSkillLevel.Novice,
    label: 'Novice',
  },
  {
    key: String(ERBSkillLevel.Beginner),
    value: ERBSkillLevel.Beginner,
    label: 'Beginner',
  },
  {
    key: String(ERBSkillLevel.Skillfull),
    value: ERBSkillLevel.Skillfull,
    label: 'Skillfull',
  },
  {
    key: String(ERBSkillLevel.Experienced),
    value: ERBSkillLevel.Experienced,
    label: 'Experienced',
  },
  {
    key: String(ERBSkillLevel.Expert),
    value: ERBSkillLevel.Expert,
    label: 'Expert',
  },
];

interface IProps {
  section: IRBSection;
}

export default function Skills({ section }: IProps) {
  return (
    <SectionWrapper>
      <SidebarTitle>{section.title}</SidebarTitle>
      <ItemsWrapper>
        {section.data.map((v, i) => {
          const item = v as IRBSkill;
          const option = OPTIONS.find((v) => v.value === item.level);

          return (
            <View key={i}>
              <SideBarTextWrapper>
                {item.skill}
                {option && (
                  <SideBarTextWrapper> - {option.label}</SideBarTextWrapper>
                )}
              </SideBarTextWrapper>
            </View>
          );
        })}
      </ItemsWrapper>
    </SectionWrapper>
  );
}
