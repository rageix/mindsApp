'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import TextEditor from '@/components/TextEditor';
import MonthYearInput from '@/components/ResumeBuilder/Builder/MonthYearInput';
import EmploymentFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/Employment/EmploymentForm/EmploymentFormController';
import SectionItemHeader from '@/components/ResumeBuilder/Builder/Sections/SectionItemHeader';
import SectionItem from '@/components/ResumeBuilder/Builder/Sections/SectionItem';
import SectionItemBody
  from '@/components/ResumeBuilder/Builder/Sections/SectionItemBody';

interface IProps {
  controller: EmploymentFormController;
}

export default function EmploymentForm({ controller }: IProps) {
  controller.useController();

  const { form, state } = controller;

  return (
    <SectionItem>
      <SectionItemHeader onClick={controller.onChangeIsExpanded}>
        {form.title || '(Not specified)'}
      </SectionItemHeader>
      <SectionItemBody>
        <div className="flex flex-col sm:flex-row">
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
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 flex">
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
          </div>
          <div className="flex-1">
            <FormLabel<IForm> field="city">City</FormLabel>
            <Input<IForm>
              field="city"
              errors={state.errors}
              value={form.city}
              onChange={controller.onChangeCity}
            />
          </div>
        </div>
        <div>
          <FormLabel>Description</FormLabel>
          <TextEditor
            initialState={null}
            onChange={controller.onChangeDescription}
          />
        </div>
      </SectionItemBody>
    </SectionItem>
  );
}
