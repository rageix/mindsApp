'use client';
import { useState } from 'react';
import SummaryFormController from '@/components/ResumeBuilder/Builder/Sections/Summary/SummaryForm/SummaryFormController';
import TextEditor from '@/components/TextEditor';
import SectionItem
  from '@/components/ResumeBuilder/Builder/Sections/SectionItem';
import SectionItemHeader
  from '@/components/ResumeBuilder/Builder/Sections/SectionItemHeader';

interface IProps {
  controller: SummaryFormController;
}

export default function SummaryForm({ controller }: IProps) {
  controller.useController();
  const [initState] = useState(null);

  return (
    <SectionItem>
      <SectionItemHeader onClick={controller.onChangeIsExpanded}>
        Summary
      </SectionItemHeader>
      <TextEditor
        initialState={initState}
        onChange={controller.onChangeDescription}
      />
    </SectionItem>
  );
}
