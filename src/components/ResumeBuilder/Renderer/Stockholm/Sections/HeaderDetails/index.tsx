import { ERBType, IRBDetail, IRBSection } from '@/types/Resume';
import { useMemo } from 'react';

interface IProps {
  sections: IRBSection[];
}

export default function HeaderDetails({ sections }: IProps) {
  const section = useMemo(
    () => sections.find((v) => v.type === ERBType.Detail),
    [sections],
  );

  if (!section) {
    return null;
  }

  const data = section.data[0] as IRBDetail;

  if(!data) {
    return null;
  }

  return (
    <div>
      <h1>
        {data.firstName} {data.lastName}
      </h1>
      <div>{data.title}</div>
    </div>
  );
}