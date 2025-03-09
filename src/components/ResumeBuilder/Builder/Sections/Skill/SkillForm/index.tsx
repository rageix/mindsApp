'use client';
import FormLabel from '@/components/FormLabel';
import SkillFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/Skill/SkillForm/SkillFormController';
import { ISelectOption } from '@/types/SelectOption';
import { ERBSkillLevel, ERBType } from '@/types/Resume';
import { useEffect, useMemo, useRef, useState } from 'react';
import Select from '@/components/Select';
import SectionItem from '@/components/ResumeBuilder/Builder/Sections/SectionItem';
import SectionItemHeader from '@/components/ResumeBuilder/Builder/Sections/SectionItemHeader';
import SectionItemBody from '@/components/ResumeBuilder/Builder/Sections/SectionItemBody';
import DraggableItem from '@/components/ResumeBuilder/Builder/Sections/DraggableItem';
import emitter from '@/util/Emitter';
import EZDynamicCombobox from '@/components/EZDynamicCombobox';
import { SKILLS_OPTIONS } from '@/common/Resume';

const OPTIONS: ISelectOption<ERBSkillLevel | null>[] = [
  {
    key: String(ERBSkillLevel.Beginner),
    value: ERBSkillLevel.Beginner,
    label: 'Beginner',
  },
  {
    key: String(ERBSkillLevel.Intermediate),
    value: ERBSkillLevel.Intermediate,
    label: 'Intermediate',
  },
  {
    key: String(ERBSkillLevel.Advanced),
    value: ERBSkillLevel.Advanced,
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

  const { form, state } = controller;

  const value: ISelectOption<ERBSkillLevel | null> | null = useMemo(() => {
    return OPTIONS.find((v) => v.value === form.level) || null;
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
            <FormLabel<IForm> field="skill">Skill</FormLabel>
            <EZDynamicCombobox<string, IForm>
              field="skill"
              onChange={controller.onChangeSkill}
              options={SKILLS_OPTIONS}
            />
            {/*<Input<IForm>*/}
            {/*  field="skill"*/}
            {/*  errors={state.errors}*/}
            {/*  value={form.skill}*/}
            {/*  onChange={controller.onChangeSkill}*/}
            {/*  onBlur={controller.onBlurInput}*/}
            {/*/>*/}
          </div>
          <div>
            <FormLabel<IForm> field="level">Level</FormLabel>
            <Select<ERBSkillLevel | null, IForm>
              field="level"
              options={OPTIONS}
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
