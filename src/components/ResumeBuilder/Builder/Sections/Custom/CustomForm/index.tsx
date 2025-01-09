'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import TextEditor from '@/components/TextEditor';
import MonthYearInput from '@/components/ResumeBuilder/Builder/MonthYearInput';
import CustomFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/Custom/CustomForm/CustomFormController';

interface IProps {
  controller: CustomFormController;
}

export default function CustomForm({ controller }: IProps) {
  controller.useController();

  const { form, state } = controller;

  return (
    <div>
      <div>
        {form.title || '(Not specified)'}
      </div>
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
          <FormLabel<IForm> field="city">City</FormLabel>
          <Input<IForm>
            field="city"
            errors={state.errors}
            value={form.city}
            onChange={controller.onChangeCity}
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
