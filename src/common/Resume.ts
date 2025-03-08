import { ISelectOption } from '@/types/SelectOption';
import { ERBLanguageLevel } from '@/types/Resume';

export const LANGUAGE_OPTIONS: ISelectOption<ERBLanguageLevel | null>[] = [
  {
    key: String(ERBLanguageLevel.Beginner),
    value: ERBLanguageLevel.Beginner,
    label: 'Beginner',
  },
  {
    key: String(ERBLanguageLevel.Intermediate),
    value: ERBLanguageLevel.Intermediate,
    label: 'Intermediate',
  },
  {
    key: String(ERBLanguageLevel.Advanced),
    value: ERBLanguageLevel.Advanced,
    label: 'Advanced',
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