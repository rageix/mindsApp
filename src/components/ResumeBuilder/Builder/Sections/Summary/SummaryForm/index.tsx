'use client';
import { useState } from 'react';
import SummaryFormController from '@/components/ResumeBuilder/Builder/Sections/Summary/SummaryForm/SummaryFormController';
import TextEditor from '@/components/TextEditor';
import SectionItem from '@/components/ResumeBuilder/Builder/Sections/SectionItem';
import SectionItemHeader from '@/components/ResumeBuilder/Builder/Sections/SectionItemHeader';
import FormRow from '@/components/ResumeBuilder/Builder/Sections/FormRow';
import SectionItemBody from '@/components/ResumeBuilder/Builder/Sections/SectionItemBody';

interface IProps {
  controller: SummaryFormController;
}

export default function SummaryForm({ controller }: IProps) {
  controller.useController();
  const [initState] = useState(null);

  const { form } = controller;

  return (
    <SectionItem>
      <SectionItemHeader
        isExpanded={form.isExpanded}
        onClickHeader={controller.onChangeIsExpanded}
      >
        Summary
      </SectionItemHeader>
      <SectionItemBody isExpanded={form.isExpanded}>
        <FormRow>
          <div className="flex-1">
          <TextEditor
            initialState={initState}
            onChange={controller.onChangeDescription}
          />
          </div>
        </FormRow>
      </SectionItemBody>
    </SectionItem>
  );
}
