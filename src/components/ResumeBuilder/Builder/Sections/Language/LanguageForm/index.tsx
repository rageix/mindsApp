'use client';
import FormLabel from '@/components/FormLabel';
import { ERBType } from '@/types/Resume';
import { useRef } from 'react';
import LanguageFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/Language/LanguageForm/LanguageFormController';
import SectionItem from '@/components/ResumeBuilder/Builder/Sections/SectionItem';
import SectionItemHeader from '@/components/ResumeBuilder/Builder/Sections/SectionItemHeader';
import SectionItemBody from '@/components/ResumeBuilder/Builder/Sections/SectionItemBody';
import DraggableItem from '@/components/ResumeBuilder/Builder/Sections/DraggableItem';
import TooltipBox from '@/components/TooltipBox';
import Tooltip from '@/components/Tooltip';
import InlineLink from '@/components/InlineLink';
import LazyDynamicCombobox from '@/components/LazyDynamicCombobox';
import {
  LANGUAGE_LEVEL_OPTIONS,
  LANGUAGE_OPTIONS,
} from '@/components/ResumeBuilder/Builder/Sections/Language/LanguageForm/Options';

interface IProps {
  controller: LanguageFormController;
}

export default function LanguageForm({ controller }: IProps) {
  controller.useController();
  const dragRef = useRef<HTMLDivElement | null>(null);
  const dragHandleRef = useRef<HTMLButtonElement>(null);

  const { form } = controller;

  return (
    <DraggableItem
      dragRef={dragRef}
      dragHandleRef={dragHandleRef}
      controller={controller}
      getValue={() => ({ id: controller.id, type: ERBType.Language })}
    >
      <SectionItem dragRef={dragRef}>
        <SectionItemHeader
          dragHandleRef={dragHandleRef}
          onClickHeader={controller.onChangeIsExpanded}
          menu
          id={controller.id}
        >
          {form.language || '(Not specified)'}
        </SectionItemHeader>
        <SectionItemBody isExpanded={form.isExpanded}>
          <div className="flex-1">
            <FormLabel<IForm>
              field="language"
              className="flex gap-x-1"
            >
              <span>Language</span>
              <Tooltip size={15}>
                <TooltipBox>
                  I&apos;ve provided a list of the most spoken languages. If not
                  listed feel free to provide your own.
                </TooltipBox>
              </Tooltip>
            </FormLabel>
            <LazyDynamicCombobox<IForm>
              field="language"
              onChange={controller.onChangeLanguage}
              options={LANGUAGE_OPTIONS}
              onBlur={controller.onBlurInput}
              placeholder=""
              value={form.language}
            />
          </div>
          <div>
            <FormLabel<IForm>
              field="level"
              className="flex gap-x-1"
            >
              <span>Level</span>
              <Tooltip size={15}>
                <TooltipBox>
                  In general you can use the first 4 options. The other options
                  reference{' '}
                  <InlineLink
                    href="https://www.europassitalian.com/blog/cefr-levels/"
                    target="_blank"
                  >
                    CEFR
                  </InlineLink>
                  .
                  <br />
                  <br />
                  Feel free to provide your own if nothing fits.
                </TooltipBox>
              </Tooltip>
            </FormLabel>
            <LazyDynamicCombobox<IForm>
              field="level"
              onChange={controller.onChangeLevel}
              options={LANGUAGE_LEVEL_OPTIONS}
              onBlur={controller.onBlurInput}
              placeholder=""
              value={form.level}
            />
          </div>
        </SectionItemBody>
      </SectionItem>
    </DraggableItem>
  );
}
