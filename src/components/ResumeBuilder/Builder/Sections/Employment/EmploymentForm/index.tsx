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
import SectionItemBody from '@/components/ResumeBuilder/Builder/Sections/SectionItemBody';
import FormStartEnd from '@/components/ResumeBuilder/Builder/Sections/FormStartEnd';
import { ERBType } from '@/types/Resume';
import { useRef } from 'react';
import DraggableItem from '@/components/ResumeBuilder/Builder/Sections/DraggableItem';

interface IProps {
  controller: EmploymentFormController;
}

export default function EmploymentForm({ controller }: IProps) {
  controller.useController();
  const dragRef = useRef<HTMLDivElement | null>(null);
  const dragHandleRef = useRef<HTMLButtonElement>(null);

  const { form, state } = controller;

  return (
    <DraggableItem
      dragRef={dragRef}
      dragHandleRef={dragHandleRef}
      controller={controller}
      getValue={() => ({ id: controller.id, type: ERBType.Employment })}
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
          <div>
            <FormLabel<IForm> field="title">Title</FormLabel>
            <Input<IForm>
              field="title"
              errors={state.errors}
              value={form.title}
              onChange={controller.onChangeTitle}
              onBlur={controller.onBlurInput}
            />
          </div>
          <div>
            <FormLabel<IForm> field="employer">Employer</FormLabel>
            <Input<IForm>
              field="employer"
              errors={state.errors}
              value={form.employer}
              onChange={controller.onChangeEmployer}
              onBlur={controller.onBlurInput}
            />
          </div>

          <FormStartEnd>
            <div>
              <FormLabel<IForm> field="start">Start</FormLabel>
              <MonthYearInput
                value={form.start}
                onChange={controller.onChangeStart}
                isClearable
                onBlur={controller.onBlurInput}
              />
            </div>
            <div>
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
          <div>
            <FormLabel<IForm> field="city">City</FormLabel>
            <Input<IForm>
              field="city"
              errors={state.errors}
              value={form.city}
              onChange={controller.onChangeCity}
              onBlur={controller.onBlurInput}
            />
          </div>
          <div>
            <FormLabel<IForm> field="state">State</FormLabel>
            <Input<IForm>
              field="state"
              errors={state.errors}
              value={form.state}
              onChange={controller.onChangeState}
              onBlur={controller.onBlurInput}
            />
          </div>
          <div className="col-span-2">
            <FormLabel>Description</FormLabel>
            <TextEditor
              initialState={form.description}
              onChange={controller.onChangeDescription}
              onBlur={controller.onBlurInput}
            />
          </div>
        </SectionItemBody>
      </SectionItem>
    </DraggableItem>
  );
}
