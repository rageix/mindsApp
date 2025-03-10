'use client';
import FormLabel from '@/components/FormLabel';
import SkillFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/Skill/SkillForm/SkillFormController';
import { ISelectOption } from '@/types/SelectOption';
import { ERBType } from '@/types/Resume';
import { useRef } from 'react';
import SectionItem from '@/components/ResumeBuilder/Builder/Sections/SectionItem';
import SectionItemHeader from '@/components/ResumeBuilder/Builder/Sections/SectionItemHeader';
import SectionItemBody from '@/components/ResumeBuilder/Builder/Sections/SectionItemBody';
import DraggableItem from '@/components/ResumeBuilder/Builder/Sections/DraggableItem';
import LazyDynamicCombobox from '@/components/LazyDynamicCombobox';
import TooltipBox from '@/components/TooltipBox';
import Tooltip from '@/components/Tooltip';
import { SKILLS_OPTIONS } from '@/components/ResumeBuilder/Builder/Sections/Skill/SkillForm/Options';

const OPTIONS: ISelectOption<string>[] = [
  {
    key: '1',
    value: 'Beginner',
    label: 'Beginner',
  },
  {
    key: '2',
    value: 'Intermediate',
    label: 'Intermediate',
  },
  {
    key: '3',
    value: 'Advanced',
    label: 'Advanced',
  },
];

interface IProps {
  controller: SkillFormController;
}

export default function SkillForm({ controller }: IProps) {
  controller.useController();
  const dragRef = useRef<HTMLDivElement | null>(null);
  const dragHandleRef = useRef<HTMLButtonElement>(null);

  const { form } = controller;

  return (
    <DraggableItem
      dragRef={dragRef}
      dragHandleRef={dragHandleRef}
      controller={controller}
      getValue={() => ({ id: controller.id, type: ERBType.Skill })}
    >
      <SectionItem dragRef={dragRef}>
        <SectionItemHeader
          dragHandleRef={dragHandleRef}
          onClickHeader={controller.onChangeIsExpanded}
          menu
          id={controller.id}
        >
          {form.skill || '(Not specified)'}
        </SectionItemHeader>
        <SectionItemBody isExpanded={form.isExpanded}>
          <div>
            <FormLabel<IForm>
              field="skill"
              className="flex items-end gap-x-1"
            >
              <span>Skill</span>
              <Tooltip size={15}>
                <TooltipBox>
                  I&apos;ve provided a number of soft skills you can chose from.
                  If they don&apos;t work for you feel free to provide your own.
                </TooltipBox>
              </Tooltip>
            </FormLabel>
            <LazyDynamicCombobox<IForm>
              field="skill"
              onChange={controller.onChangeSkill}
              options={SKILLS_OPTIONS}
              onBlur={controller.onBlurInput}
              placeholder=""
              value={form.skill}
            />
          </div>
          <div>
            <FormLabel<IForm>
              field="level"
              className="flex items-end gap-x-1"
            >
              <span>Level</span>
              <Tooltip size={15}>
                <TooltipBox>
                  I recommend using the provided values, but if not keep it
                  simple. Think good, better, best.
                </TooltipBox>
              </Tooltip>
            </FormLabel>
            <LazyDynamicCombobox<IForm>
              field="level"
              onChange={controller.onChangeLevel}
              options={OPTIONS}
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
