'use client';
import { useState } from 'react';
import SummaryFormController from '@/components/ResumeBuilder/Builder/Sections/Summary/SummaryForm/SummaryFormController';
import TextEditor from '@/components/TextEditor';

interface IProps {
  controller: SummaryFormController;
}

export default function SummaryForm({ controller }: IProps) {
  controller.useController();
  const [initState] = useState(null);

  return (
    <div>
      <TextEditor
        initialState={initState}
        onChange={controller.onChangeDescription}
      />
    </div>
  );
}
