'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import SkillFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/Skill/SkillForm/SkillFormController';
import { ISelectOption } from '@/types/SelectOption';
import { ERBSkillLevel, ERBType } from '@/types/Resume';
import { useEffect, useMemo, useRef, useState } from 'react';
import Select from '@/components/Select';
import SectionItem from '@/components/ResumeBuilder/Builder/Sections/SectionItem';
import SectionItemHeader from '@/components/ResumeBuilder/Builder/Sections/SectionItemHeader';
import FormRow from '@/components/ResumeBuilder/Builder/Sections/FormRow';
import SectionItemBody from '@/components/ResumeBuilder/Builder/Sections/SectionItemBody';
import DraggableItem from '@/components/ResumeBuilder/Builder/Sections/DraggableItem';
import emitter from '@/util/Emitter';

const OPTIONS: ISelectOption<ERBSkillLevel | null>[] = [
  {
    key: String(ERBSkillLevel.Novice),
    value: ERBSkillLevel.Novice,
    label: '1. Novice',
  },
  {
    key: String(ERBSkillLevel.Beginner),
    value: ERBSkillLevel.Beginner,
    label: '2. Beginner',
  },
  {
    key: String(ERBSkillLevel.Skillfull),
    value: ERBSkillLevel.Skillfull,
    label: '3. Skillfull',
  },
  {
    key: String(ERBSkillLevel.Experienced),
    value: ERBSkillLevel.Experienced,
    label: '4. Experienced',
  },
  {
    key: String(ERBSkillLevel.Expert),
    value: ERBSkillLevel.Expert,
    label: '5. Expert',
  },
];

interface IProps {
  controller: SkillFormController;
}

export default function SkillForm({
  controller,
}: IProps) {
  controller.useController();
  const dragRef = useRef<HTMLDivElement | null>(null);
  const dragHandleRef = useRef<HTMLButtonElement>(null);

  const { form, state } = controller;

  const value: ISelectOption<ERBSkillLevel | null> | null = useMemo(() => {
    return OPTIONS.find((v) => v.value === form.level) || null;
  }, [form.level]);

  const [init, setInit] = useState(false);

  useEffect(() => {
    if(init) {
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
          <FormRow>
            <div className="flex-1">
              <FormLabel<IForm> field="skill">Skill</FormLabel>
              <Input<IForm>
                field="skill"
                errors={state.errors}
                value={form.skill}
                onChange={controller.onChangeSkill}
                onBlur={controller.onBlurInput}
              />
            </div>
            <div className="flex-1">
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
          </FormRow>
        </SectionItemBody>
      </SectionItem>
    </DraggableItem>
  );
}
