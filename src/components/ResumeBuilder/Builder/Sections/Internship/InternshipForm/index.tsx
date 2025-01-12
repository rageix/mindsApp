'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import TextEditor from '@/components/TextEditor';
import MonthYearInput from '@/components/ResumeBuilder/Builder/MonthYearInput';
import InternshipFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/Internship/InternshipForm/InternshipFormController';
import SectionItem from '@/components/ResumeBuilder/Builder/Sections/SectionItem';
import SectionItemHeader from '@/components/ResumeBuilder/Builder/Sections/SectionItemHeader';
import SectionItemBody from '@/components/ResumeBuilder/Builder/Sections/SectionItemBody';
import FormRow from '@/components/ResumeBuilder/Builder/Sections/FormRow';
import FormStartEnd from '@/components/ResumeBuilder/Builder/Sections/FormStartEnd';

interface IProps {
  controller: InternshipFormController;
  onDuplicate: () => void;
  onDelete: () => void;
}

export default function InternshipForm({
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
        {form.title || '(Not specified)'}
      </SectionItemHeader>
      <SectionItemBody isExpanded={form.isExpanded}>
        <FormRow>
          <div className="flex-1">
            <FormLabel<IForm> field="title">Title</FormLabel>
            <Input<IForm>
              field="title"
              errors={state.errors}
              value={form.title}
              onChange={controller.onChangeTitle}
            />
          </div>
          <div className="flex-1">
            <FormLabel<IForm> field="employer">Employer</FormLabel>
            <Input<IForm>
              field="employer"
              errors={state.errors}
              value={form.employer}
              onChange={controller.onChangeEmployer}
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
          <div className="flex-1">
            <FormLabel<IForm> field="city">City</FormLabel>
            <Input<IForm>
              field="city"
              errors={state.errors}
              value={form.city}
              onChange={controller.onChangeCity}
            />
          </div>
        </FormRow>
        <FormRow>
          <FormLabel>Description</FormLabel>
          <TextEditor
            initialState={null}
            onChange={controller.onChangeDescription}
          />
        </FormRow>
      </SectionItemBody>
    </SectionItem>
  );
}
