'use client';
import SummaryFormController from '@/components/ResumeBuilder/Builder/Sections/Summary/SummaryForm/SummaryFormController';
import TextEditor from '@/components/TextEditor';
import SectionItem from '@/components/ResumeBuilder/Builder/Sections/SectionItem';
import SectionItemHeader from '@/components/ResumeBuilder/Builder/Sections/SectionItemHeader';
import SectionItemBody from '@/components/ResumeBuilder/Builder/Sections/SectionItemBody';

interface IProps {
  controller: SummaryFormController;
}

export default function SummaryForm({ controller }: IProps) {
  controller.useController();

  const { form } = controller;

  return (
    <SectionItem>
      <SectionItemHeader
        onClickHeader={controller.onChangeIsExpanded}
        menu={false}
        id={controller.id}
      >
        Summary
      </SectionItemHeader>
      <SectionItemBody isExpanded={form.isExpanded}>
        <div className="col-span-2">
          <TextEditor
            initialState={form.description}
            onChange={controller.onChangeDescription}
            onBlur={controller.onBlurInput}
          />
        </div>
      </SectionItemBody>
    </SectionItem>
  );
}
