'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import { ISelectOption } from '@/types/SelectOption';
import { ERBLanguageLevel } from '@/types/Resume';
import { useMemo } from 'react';
import Select from '@/components/Select';
import LanguageFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/Language/LanguageForm/LanguageFormController';
import SectionItem from '@/components/ResumeBuilder/Builder/Sections/SectionItem';
import SectionItemHeader from '@/components/ResumeBuilder/Builder/Sections/SectionItemHeader';
import SectionItemBody from '@/components/ResumeBuilder/Builder/Sections/SectionItemBody';
import FormRow from '@/components/ResumeBuilder/Builder/Sections/FormRow';

const OPTIONS: ISelectOption<ERBLanguageLevel | null>[] = [
  {
    key: String(ERBLanguageLevel.NativeSpeaker),
    value: ERBLanguageLevel.NativeSpeaker,
    label: 'Native speaker',
  },
  {
    key: String(ERBLanguageLevel.HighlyProficient),
    value: ERBLanguageLevel.HighlyProficient,
    label: 'Highly proficient',
  },
  {
    key: String(ERBLanguageLevel.VeryGoodCommand),
    value: ERBLanguageLevel.VeryGoodCommand,
    label: 'Very good command',
  },
  {
    key: String(ERBLanguageLevel.WorkingKnowledge),
    value: ERBLanguageLevel.WorkingKnowledge,
    label: 'Working knowledge',
  },
  {
    key: String(ERBLanguageLevel.C2),
    value: ERBLanguageLevel.C2,
    label: 'C2',
  },
  {
    key: String(ERBLanguageLevel.C1),
    value: ERBLanguageLevel.C1,
    label: 'C1',
  },
  {
    key: String(ERBLanguageLevel.B2),
    value: ERBLanguageLevel.B2,
    label: 'B2',
  },
  {
    key: String(ERBLanguageLevel.B1),
    value: ERBLanguageLevel.B1,
    label: 'B1',
  },
  {
    key: String(ERBLanguageLevel.A2),
    value: ERBLanguageLevel.A2,
    label: 'A2',
  },
  {
    key: String(ERBLanguageLevel.A1),
    value: ERBLanguageLevel.A1,
    label: 'A1',
  },
];

interface IProps {
  controller: LanguageFormController;
  onDuplicate: () => void;
  onDelete: () => void;
}

export default function LanguageForm({
  controller,
  onDuplicate,
  onDelete,
}: IProps) {
  controller.useController();

  const { form, state } = controller;

  const value: ISelectOption<ERBLanguageLevel | null> | null = useMemo(() => {
    return OPTIONS.find((v) => v.value === form.level) || null;
  }, [form.level]);

  return (
    <SectionItem>
      <SectionItemHeader
        isExpanded={form.isExpanded}
        onClickHeader={controller.onChangeIsExpanded}
        onClickDuplicate={onDuplicate}
        onClickDelete={onDelete}
      >
        {form.language || '(Not specified)'}
      </SectionItemHeader>
      <SectionItemBody isExpanded={form.isExpanded}>
        <FormRow>
          <div className="flex-1">
            <FormLabel<IForm> field="language">Language</FormLabel>
            <Input<IForm>
              field="language"
              errors={state.errors}
              value={form.language}
              onChange={controller.onChangeLanguage}
            />
          </div>
          <div className="flex-1">
            <FormLabel<IForm> field="level">Level</FormLabel>
            <Select<ERBLanguageLevel | null, IForm>
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
  );
}
