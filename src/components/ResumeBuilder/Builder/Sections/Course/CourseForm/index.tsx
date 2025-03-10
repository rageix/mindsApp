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
import FormStartEnd from '@/components/ResumeBuilder/Builder/Sections/FormStartEnd';
import { useRef } from 'react';
import { ERBType } from '@/types/Resume';
import DraggableItem from '@/components/ResumeBuilder/Builder/Sections/DraggableItem';

interface IProps {
  controller: CourseFormController;
}

export default function CourseForm({ controller }: IProps) {
  controller.useController();
  const dragRef = useRef<HTMLDivElement | null>(null);
  const dragHandleRef = useRef<HTMLButtonElement>(null);

  const { form, state } = controller;

  return (
    <DraggableItem
      dragRef={dragRef}
      dragHandleRef={dragHandleRef}
      controller={controller}
      getValue={() => ({ id: controller.id, type: ERBType.Course })}
    >
      <SectionItem dragRef={dragRef}>
        <SectionItemHeader
          dragHandleRef={dragHandleRef}
          onClickHeader={controller.onChangeIsExpanded}
          menu={true}
          id={controller.id}
        >
          {form.name || '(Not specified)'}
        </SectionItemHeader>
        <SectionItemBody isExpanded={form.isExpanded}>
          <div>
            <FormLabel<IForm> field="name">Name</FormLabel>
            <Input<IForm>
              field="name"
              errors={state.errors}
              value={form.name}
              onChange={controller.onChangeName}
              onBlur={controller.onBlurInput}
            />
          </div>
          <div>
            <FormLabel<IForm> field="institution">Institution</FormLabel>
            <Input<IForm>
              field="institution"
              errors={state.errors}
              value={form.institution}
              onChange={controller.onChangeInstitution}
              onBlur={controller.onBlurInput}
            />
          </div>
          <FormStartEnd>
            <div>
              <FormLabel<IForm> field="start">Start</FormLabel>
              <MonthYearInput
                value={form.start}
                onChange={controller.onChangeStart}
                onBlur={controller.onBlurInput}
              />
            </div>
            <div>
              <FormLabel<IForm> field="end">End</FormLabel>
              <MonthYearInput
                value={form.end}
                onChange={controller.onChangeEnd}
                showPresent
                onBlur={controller.onBlurInput}
              />
            </div>
          </FormStartEnd>
          <div></div>
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
