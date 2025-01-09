'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import EducationFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/Education/EducationForm/EducationFormController';
import TextEditor from '@/components/TextEditor';
import MonthYearInput from '@/components/ResumeBuilder/Builder/MonthYearInput';

interface IProps {
  controller: EducationFormController;
}

export default function EducationForm({ controller }: IProps) {
  controller.useController();

  const { form, state } = controller;

  return (
    <div>
      <div>
        {form.school || '(Not specified)'}
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1">
          <FormLabel<IForm> field="school">School</FormLabel>
          <Input<IForm>
            field="school"
            errors={state.errors}
            value={form.school}
            onChange={controller.onChangeSchool}
          />
        </div>
        <div className="flex-1">
          <FormLabel<IForm> field="degree">Degree</FormLabel>
          <Input<IForm>
            field="degree"
            errors={state.errors}
            value={form.degree}
            onChange={controller.onChangeDegree}
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
    </div>
  );
}
