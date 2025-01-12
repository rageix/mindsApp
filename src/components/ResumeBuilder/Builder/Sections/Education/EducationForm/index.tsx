'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import EducationFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/Education/EducationForm/EducationFormController';
import TextEditor from '@/components/TextEditor';
import MonthYearInput from '@/components/ResumeBuilder/Builder/MonthYearInput';
import SectionItemHeader from '@/components/ResumeBuilder/Builder/Sections/SectionItemHeader';
import SectionItem from '@/components/ResumeBuilder/Builder/Sections/SectionItem';
import FormRow from '@/components/ResumeBuilder/Builder/Sections/FormRow';
import FormStartEnd from '@/components/ResumeBuilder/Builder/Sections/FormStartEnd';
import SectionItemBody from '@/components/ResumeBuilder/Builder/Sections/SectionItemBody';

interface IProps {
  controller: EducationFormController;
  onDuplicate: () => void;
  onDelete: () => void;
}

export default function EducationForm({
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
        {form.school || '(Not specified)'}
      </SectionItemHeader>
      <SectionItemBody isExpanded={form.isExpanded}>
        <FormRow>
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
