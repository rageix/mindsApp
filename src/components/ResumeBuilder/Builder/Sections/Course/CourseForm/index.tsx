'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import TextEditor from '@/components/TextEditor';
import MonthYearInput from '@/components/ResumeBuilder/Builder/MonthYearInput';

import CourseFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/Course/CourseForm/CourseFormController';

interface IProps {
  controller: CourseFormController;
}

export default function CourseForm({ controller }: IProps) {
  controller.useController();

  const { form, state } = controller;

  return (
    <div>
      <div>
        {form.name || '(Not specified)'}
      </div>
      <div className="flex flex-col sm:flex-row">
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
        <div className="flex-1"></div>
      </div>
      <div>
        <FormLabel>Description</FormLabel>
        <TextEditor
          initialState={null}
          onChange={controller.onChangeDescription}
        />
      </div>
    </div>
  );
}
