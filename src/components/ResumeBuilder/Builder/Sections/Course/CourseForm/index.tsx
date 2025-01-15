'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import TextEditor from '@/components/TextEditor';
import MonthYearInput from '@/components/ResumeBuilder/Builder/MonthYearInput';

import CourseFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/Course/CourseForm/CourseFormController';
import SectionItem from '@/components/ResumeBuilder/Builder/Sections/SectionItem';
import SectionItemHeader from '@/components/ResumeBuilder/Builder/Sections/SectionItemHeader';
import SectionItemBody from '@/components/ResumeBuilder/Builder/Sections/SectionItemBody';
import FormRow from '@/components/ResumeBuilder/Builder/Sections/FormRow';
import FormStartEnd from '@/components/ResumeBuilder/Builder/Sections/FormStartEnd';

interface IProps {
  controller: CourseFormController;
  onDuplicate: () => void;
  onDelete: () => void;
}

export default function CourseForm({
  controller,
  onDuplicate,
  onDelete,
}: IProps) {
  controller.useController();

  const { form, state } = controller;

  return (
    <SectionItem>
      <SectionItemHeader
        isExpanded={form.isExpanded}
        onClickHeader={controller.onChangeIsExpanded}
        onClickDuplicate={onDuplicate}
        onClickDelete={onDelete}
      >
        {form.name || '(Not specified)'}
      </SectionItemHeader>
      <SectionItemBody isExpanded={form.isExpanded}>
        <FormRow>
          <div className="flex-1">
            <FormLabel<IForm> field="name">Name</FormLabel>
            <Input<IForm>
              field="name"
              errors={state.errors}
              value={form.name}
              onChange={controller.onChangeName}
            />
          </div>
          <div className="flex-1">
            <FormLabel<IForm> field="institution">Institution</FormLabel>
            <Input<IForm>
              field="institution"
              errors={state.errors}
              value={form.institution}
              onChange={controller.onChangeInstitution}
            />
          </div>
        </FormRow>
        <FormRow>
          <FormStartEnd>
            <div className="flex-1">
              <FormLabel<IForm> field="start">Start</FormLabel>
              <MonthYearInput
                value={form.start}
                onChange={controller.onChangeStart}
                isClearable
              />
            </div>
            <div className="flex-1">
              <FormLabel<IForm> field="end">End</FormLabel>
              <MonthYearInput
                value={form.end}
                onChange={controller.onChangeEnd}
                showPresent
                isClearable
              />
            </div>
          </FormStartEnd>
          <div className="flex-1"></div>
        </FormRow>
        <FormRow>
          <div className="flex-1">
            <FormLabel>Description</FormLabel>
            <TextEditor
              initialState={form.description}
              onChange={controller.onChangeDescription}
            />
          </div>
        </FormRow>
      </SectionItemBody>
    </SectionItem>
  );
}
