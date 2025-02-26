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
import { ERBType } from '@/types/Resume';
import { useRef } from 'react';
import DraggableItem from '@/components/ResumeBuilder/Builder/Sections/DraggableItem';

interface IProps {
  controller: InternshipFormController;
}

export default function InternshipForm({ controller }: IProps) {
  controller.useController();
  const dragRef = useRef<HTMLDivElement | null>(null);
  const dragHandleRef = useRef<HTMLButtonElement>(null);

  const { form, state } = controller;

  return (
    <DraggableItem
      dragRef={dragRef}
      dragHandleRef={dragHandleRef}
      controller={controller}
      getValue={() => ({ id: controller.id, type: ERBType.Internship })}
    >
      <SectionItem dragRef={dragRef}>
        <SectionItemHeader
          dragHandleRef={dragHandleRef}
          onClickHeader={controller.onChangeIsExpanded}
          menu
          id={controller.id}
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
                onBlur={controller.onBlurInput}
              />
            </div>
            <div className="flex-1">
              <FormLabel<IForm> field="employer">Employer</FormLabel>
              <Input<IForm>
                field="employer"
                errors={state.errors}
                value={form.employer}
                onChange={controller.onChangeEmployer}
                onBlur={controller.onBlurInput}
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
                  onBlur={controller.onBlurInput}
                />
              </div>
              <div className="flex-1">
                <FormLabel<IForm> field="end">End</FormLabel>
                <MonthYearInput
                  value={form.end}
                  onChange={controller.onChangeEnd}
                  showPresent
                  isClearable
                  onBlur={controller.onBlurInput}
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
                onBlur={controller.onBlurInput}
              />
            </div>
          </FormRow>
          <FormRow>
            <div className="flex-1">
              <FormLabel>Description</FormLabel>
              <TextEditor
                initialState={form.description}
                onChange={controller.onChangeDescription}
                onBlur={controller.onBlurInput}
              />
            </div>
          </FormRow>
        </SectionItemBody>
      </SectionItem>
    </DraggableItem>
  );
}
