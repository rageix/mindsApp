'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import TextEditor from '@/components/TextEditor';
import MonthYearInput from '@/components/ResumeBuilder/Builder/MonthYearInput';
import ExtraCurricularFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/ExtraCurricular/ExtraCurricularForm/ExtraCurricularFormController';
import SectionItem from '@/components/ResumeBuilder/Builder/Sections/SectionItem';
import SectionItemHeader from '@/components/ResumeBuilder/Builder/Sections/SectionItemHeader';
import SectionItemBody
  from '@/components/ResumeBuilder/Builder/Sections/SectionItemBody';

interface IProps {
  controller: ExtraCurricularFormController;
}

export default function ExtraCurricularForm({ controller }: IProps) {
  controller.useController();

  const { form, state } = controller;

  return (
    <SectionItem>
      <SectionItemHeader onClick={controller.onChangeIsExpanded}>
        {form.name || '(Not specified)'}
      </SectionItemHeader>
      <SectionItemBody>
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
      </SectionItemBody>
    </SectionItem>
  );
}
