import { IRBLink, IRBSection } from '@/types/Resume';
import { Link } from '@react-pdf/renderer';
import SidebarTitle from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SidebarTitle';
import SideBarTextWrapper from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SideBarTextWrapper';
import SectionWrapper from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SectionWrapper';
import ItemsWrapper from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/ItemsWrapper';

interface IProps {
  section: IRBSection;
}

export default function Links({ section }: IProps) {
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
