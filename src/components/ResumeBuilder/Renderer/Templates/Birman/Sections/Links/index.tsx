import { IRBLink, IRBSection } from '@/types/Resume';
import { Link } from '@react-pdf/renderer';
import SidebarTitle from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/SidebarTitle';
import SideBarTextWrapper from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/SideBarTextWrapper';
import SectionWrapper from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/SectionWrapper';
import ItemsWrapper from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/ItemsWrapper';

interface IProps {
  section: IRBSection;
}

export default function Links({ section }: IProps) {
  if (section.isHidden) {
    return null;
  }

  return (
    <SectionWrapper>
      <SidebarTitle>{section.title}</SidebarTitle>
      <ItemsWrapper>
        {section.data.map((v, i) => {
          const item = v as IRBLink;
          return (
            <SideBarTextWrapper key={i}>
              <Link href={item.link}>{item.label}</Link>
            </SideBarTextWrapper>
          );
        })}
      </ItemsWrapper>
    </SectionWrapper>
  );
}
