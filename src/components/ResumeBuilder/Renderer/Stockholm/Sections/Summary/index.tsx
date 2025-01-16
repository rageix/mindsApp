import { IRBSummary } from '@/types/Resume';
import ItemTextEditor from '@/components/ResumeBuilder/Renderer/Stockholm/Elements/ItemTextEditor';

interface IProps {
  data: IRBSummary;
}

export default function Summary({ data }: IProps) {
  return (
    <div>
      <ItemTextEditor value={data.description} />
    </div>
  );
}
