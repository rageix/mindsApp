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
import FormStartEnd from '@/components/ResumeBuilder/Builder/Sections/FormStartEnd';
import SectionItemBody from '@/components/ResumeBuilder/Builder/Sections/SectionItemBody';
import { ERBType } from '@/types/Resume';
import DraggableItem from '@/components/ResumeBuilder/Builder/Sections/DraggableItem';
import { useRef } from 'react';
import TooltipBox from '@/components/TooltipBox';
import Tooltip from '@/components/Tooltip';
import LazyDynamicCombobox from '@/components/LazyDynamicCombobox';
import {
  DEGREE_OPTIONS,
  MAJOR_OPTIONS,
} from '@/components/ResumeBuilder/Builder/Sections/Education/EducationForm/Options';

interface IProps {
  controller: EducationFormController;
}

export default function EducationForm({ controller }: IProps) {
  controller.useController();
  const dragRef = useRef<HTMLDivElement | null>(null);
  const dragHandleRef = useRef<HTMLButtonElement>(null);

  const { form, state } = controller;

  return (
    <DraggableItem
      dragRef={dragRef}
      dragHandleRef={dragHandleRef}
      controller={controller}
      getValue={() => ({ id: controller.id, type: ERBType.Education })}
    >
      <SectionItem dragRef={dragRef}>
        <SectionItemHeader
          dragHandleRef={dragHandleRef}
          onClickHeader={controller.onChangeIsExpanded}
          menu
          id={controller.id}
        >
          {form.school || '(Not specified)'}
        </SectionItemHeader>
        <SectionItemBody isExpanded={form.isExpanded}>
          <div>
            <FormLabel<IForm> field="school">School</FormLabel>
            <Input<IForm>
              field="school"
              errors={state.errors}
              value={form.school}
              onChange={controller.onChangeSchool}
              onBlur={controller.onBlurInput}
            />
          </div>
          <div>
            <FormLabel<IForm>
              field="degree"
              className="flex items-end gap-x-1"
            >
              <span>Degree</span>
              <Tooltip size={15}>
                <TooltipBox>
                  A degree is what you earn at the end of completing your major.
                </TooltipBox>
              </Tooltip>
            </FormLabel>
            <LazyDynamicCombobox<IForm>
              field="degree"
              onChange={controller.onChangeDegree}
              options={DEGREE_OPTIONS}
              onBlur={controller.onBlurInput}
              placeholder=""
              value={form.degree}
            />
          </div>
          <div>
            <FormLabel<IForm>
              field="major"
              className="flex items-end gap-x-1"
            >
              <span>Major</span>
              <Tooltip size={15}>
                <TooltipBox>
                  The specific area you studied.
                  I&apos;ve compiled a list of majors, but there are way more
                  than this, so feel free to provide your own if not listed.
                </TooltipBox>
              </Tooltip>
            </FormLabel>
            <LazyDynamicCombobox<IForm>
              field="major"
              onChange={controller.onChangeMajor}
              options={MAJOR_OPTIONS}
              onBlur={controller.onBlurInput}
              placeholder=""
              value={form.major}
            />
          </div>
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
