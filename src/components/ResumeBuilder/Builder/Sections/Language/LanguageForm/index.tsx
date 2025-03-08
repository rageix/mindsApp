'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import { ISelectOption } from '@/types/SelectOption';
import { ERBLanguageLevel, ERBType } from '@/types/Resume';
import { useEffect, useMemo, useRef, useState } from 'react';
import Select from '@/components/Select';
import LanguageFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/Language/LanguageForm/LanguageFormController';
import SectionItem from '@/components/ResumeBuilder/Builder/Sections/SectionItem';
import SectionItemHeader from '@/components/ResumeBuilder/Builder/Sections/SectionItemHeader';
import SectionItemBody from '@/components/ResumeBuilder/Builder/Sections/SectionItemBody';
import { LANGUAGE_OPTIONS } from '@/common/Resume';
import DraggableItem from '@/components/ResumeBuilder/Builder/Sections/DraggableItem';
import emitter from '@/util/Emitter';
import TooltipBox from '@/components/TooltipBox';
import Tooltip from '@/components/Tooltip';
import InlineLink from '@/components/InlineLink';

interface IProps {
  controller: LanguageFormController;
}

export default function LanguageForm({ controller }: IProps) {
  controller.useController();
  const dragRef = useRef<HTMLDivElement | null>(null);
  const dragHandleRef = useRef<HTMLButtonElement>(null);

  const { form, state } = controller;

  const value: ISelectOption<ERBLanguageLevel | null> | null = useMemo(() => {
    return LANGUAGE_OPTIONS.find((v) => v.value === form.level) || null;
  }, [form.level]);

  const [init, setInit] = useState(false);

  useEffect(() => {
    if (init) {
      emitter.emitSaveResume();
      return;
    }

    setInit(true);
  }, [form.level]);

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
            <FormLabel<IForm> field="language">Language</FormLabel>
            <Input<IForm>
              field="language"
              errors={state.errors}
              value={form.language}
              onChange={controller.onChangeLanguage}
              onBlur={controller.onBlurInput}
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
                  In general you can use the first 3 options. The other options
                  reference{' '}
                  <InlineLink
                    href="https://www.europassitalian.com/blog/cefr-levels/"
                    target="_blank"
                  >
                    CEFR
                  </InlineLink>
                  .
                </TooltipBox>
              </Tooltip>
            </FormLabel>
            <Select<ERBLanguageLevel | null, IForm>
              field="level"
              options={LANGUAGE_OPTIONS}
              value={value}
              onChange={(option) => controller.onChangeLevel(option.value)}
              isClearable
              onClickClear={() => controller.onChangeLevel(null)}
            />
          </div>
        </SectionItemBody>
      </SectionItem>
    </DraggableItem>
  );
}
