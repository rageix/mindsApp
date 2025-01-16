import { IRBEmployment, IRBSection } from '@/types/Resume';
import ItemTextEditor from '@/components/ResumeBuilder/Renderer/Stockholm/Elements/ItemTextEditor';
import ItemDateRange from '../../Elements/ItemDateRange';
import SectionTitle from '@/components/ResumeBuilder/Renderer/Stockholm/Elements/SectionTitle';
import ItemTitle from '@/components/ResumeBuilder/Renderer/Stockholm/Elements/ItemTitle';

interface IProps {
  section: IRBSection;
}

export default function Employment({ section }: IProps) {
  return (
    <div>
      <SectionTitle>{section.title}</SectionTitle>
      <div className="flex flex-col gap-y-3">
        {section.data.map((v, i) => {
          const item = v as IRBEmployment;
          return (
            <div key={i}>
              <ItemTitle>
                {item.title} at {item.employer} in {item.city}
              </ItemTitle>
              <ItemDateRange
                start={item.start}
                end={item.end}
              />
              <ItemTextEditor value={item.description} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
