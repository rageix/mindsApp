'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import { ISelectOption } from '@/types/SelectOption';
import { ERBLanguageLevel } from '@/types/ResumeBuilder';
import { useMemo } from 'react';
import Select from '@/components/Select';
import LanguageFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/Language/LanguageForm/LanguageFormController';
import SectionItem
  from '@/components/ResumeBuilder/Builder/Sections/SectionItem';
import SectionItemHeader
  from '@/components/ResumeBuilder/Builder/Sections/SectionItemHeader';
import SectionItemBody
  from '@/components/ResumeBuilder/Builder/Sections/SectionItemBody';

const OPTIONS: ISelectOption<ERBLanguageLevel | null>[] = [
  {
    key: String(ERBLanguageLevel.NativeSpeaker),
    value: ERBLanguageLevel.NativeSpeaker,
    label: 'NativeSpeaker',
  },
  {
    key: String(ERBLanguageLevel.HighlyProficient),
    value: ERBLanguageLevel.HighlyProficient,
    label: 'HighlyProficient',
  },
  {
    key: String(ERBLanguageLevel.VeryGoodCommand),
    value: ERBLanguageLevel.VeryGoodCommand,
    label: 'VeryGoodCommand',
  },
  {
    key: String(ERBLanguageLevel.WorkingKnowledge),
    value: ERBLanguageLevel.WorkingKnowledge,
    label: 'WorkingKnowledge',
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
}

export default function LanguageForm({ controller }: IProps) {
  controller.useController();

  const { form, state } = controller;

  const value: ISelectOption<ERBLanguageLevel | null> | undefined =
    useMemo(() => {
      return OPTIONS.find((v) => v.value === form.level);
    }, [form.level]);

  return (
    <SectionItem>
      <SectionItemHeader onClick={controller.onChangeIsExpanded}>
        {form.language || '(Not specified)'}
      </SectionItemHeader>
      <SectionItemBody>
      <div className="flex flex-col sm:flex-row">
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
      </div>
      </SectionItemBody>
    </SectionItem>
  );
}
