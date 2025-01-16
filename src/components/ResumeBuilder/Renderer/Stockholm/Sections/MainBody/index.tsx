import { ERBType, IRBSection, IRBSummary } from '@/types/Resume';
import Summary
  from '@/components/ResumeBuilder/Renderer/Stockholm/Sections/Summary';
import Employment
  from '@/components/ResumeBuilder/Renderer/Stockholm/Sections/Employment';

interface IProps {
  sections: IRBSection[];
}

export default function MainBody({ sections }: IProps) {



  return (
    <div>
      {sections.map((v, i) => {
        switch (v.type) {
          case ERBType.Summary:
            return <Summary key={i} data={v.data[0] as IRBSummary}/>;
          case ERBType.Employment:
            return <Employment  key={i} section={v}/>
          default:
            return null;
        }
      })}
    </div>
  );
}