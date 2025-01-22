import { MongoDocument, MongoId } from '@/types/MongoDocument';
import { IHasId } from '@/types/HasId';

export enum ERBType {
  Detail = 'detail',
  Summary = 'summary',
  Employment = 'employment',
  Education = 'education',
  Link = 'link',
  Skill = 'skill',
  Custom = 'custom',
  Course = 'course',
  ExtraCurricular = 'extraCurricular',
  Internship = 'internship',
  Language = 'language',
  Reference = 'reference',
}

export interface IRBSection {
  type: ERBType;
  title: string;
  isHidden: boolean;
  isSortable: boolean;
  data: TResumeBuilderSection[];
}

export interface IRBSectionItem {
  isExpanded: boolean;
}

export function newIRBSectionItem(): IRBSectionItem {
  return {
    isExpanded: true,
  };
}

export interface IRBDetail extends IRBSectionItem {
  title: string;
  photo: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  // hidden
  address: string;
  postalCode: string;
  license: string;
  nationality: string;
  placeOfBirth: string;
  dateOfBirth: string;
}

export function newIRBDetail(): IRBDetail {
  return {
    ...newIRBSectionItem(),
    title: '',
    photo: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    // hidden
    address: '',
    postalCode: '',
    license: '',
    nationality: '',
    placeOfBirth: '',
    dateOfBirth: '',
  };
}

export interface IRBSummary extends IRBSectionItem {
  description: string;
}

export function newIRBSummary(): IRBSummary {
  return {
    ...newIRBSectionItem(),
    description: '',
  };
}

export interface IRBDate {
  month: number | null;
  year: number | null;
  present: boolean;
}

export function newIRBDate(): IRBDate {
  return {
    month: null,
    year: null,
    present: false,
  };
}

export interface IRBEmployment extends IRBSectionItem {
  title: string;
  employer: string;
  start: IRBDate | null;
  end: IRBDate | null;
  city: string;
  description: string;
}

export function newIRBEmployment(): IRBEmployment {
  return {
    ...newIRBSectionItem(),

    title: '',
    employer: '',
    start: null,
    end: null,
    city: '',
    description: '',
  };
}

export interface IRBEducation extends IRBSectionItem {
  school: string;
  degree: string;
  start: IRBDate | null;
  end: IRBDate | null;
  city: string;
  description: string;
}

export function newIRBEducation(): IRBEducation {
  return {
    ...newIRBSectionItem(),
    school: '',
    degree: '',
    start: null,
    end: null,
    city: '',
    description: '',
  };
}

export interface IRBLink extends IRBSectionItem {
  label: string;
  link: string;
}

export function newIRBLink(): IRBLink {
  return {
    ...newIRBSectionItem(),
    label: '',
    link: '',
  };
}

export enum ERBSkillLevel {
  Novice = 1,
  Beginner = 2,
  Skillfull = 3,
  Experienced = 4,
  Expert = 5,
}

export interface IRBSkill extends IRBSectionItem {
  skill: string;
  level: ERBSkillLevel | null;
}

export function newIRBSkill(): IRBSkill {
  return {
    ...newIRBSectionItem(),
    skill: '',
    level: null,
  };
}

export interface IRBCustom extends IRBSectionItem {
  title: string;
  city: string;
  start: IRBDate | null;
  end: IRBDate | null;
  description: string;
}

export function newIRBCustom(): IRBCustom {
  return {
    ...newIRBSectionItem(),
    title: '',
    city: '',
    start: null,
    end: null,
    description: '',
  };
}

export interface IRBCourse extends IRBSectionItem {
  name: string;
  institution: string;
  start: IRBDate | null;
  end: IRBDate | null;
  description: string;
}

export function newIRBCourse(): IRBCourse {
  return {
    ...newIRBSectionItem(),
    name: '',
    institution: '',
    start: null,
    end: null,
    description: '',
  };
}

export interface IRBExtraCurricular extends IRBSectionItem {
  name: string;
  start: IRBDate | null;
  end: IRBDate | null;
  city: string;
  description: string;
}

export function newIRBExtraCurricular(): IRBExtraCurricular {
  return {
    ...newIRBSectionItem(),
    name: '',
    start: null,
    end: null,
    city: '',
    description: '',
  };
}

export interface IRBInternship extends IRBSectionItem {
  title: string;
  employer: string;
  start: IRBDate | null;
  end: IRBDate | null;
  city: string;
  description: string;
}

export function newIRBInternship(): IRBInternship {
  return {
    ...newIRBSectionItem(),
    title: '',
    employer: '',
    start: null,
    end: null,
    city: '',
    description: '',
  };
}

export enum ERBLanguageLevel {
  NativeSpeaker,
  HighlyProficient,
  VeryGoodCommand,
  WorkingKnowledge,
  C2,
  C1,
  B2,
  B1,
  A2,
  A1,
}

export interface IRBLanguage extends IRBSectionItem {
  language: string;
  level: ERBLanguageLevel | null;
}

export function newIRBLanguage(): IRBLanguage {
  return {
    ...newIRBSectionItem(),
    language: '',
    level: null,
  };
}

export interface IRBReference extends IRBSectionItem {
  byRequestOnly: boolean;
  name: string;
  company: string;
  phone: string;
  email: string;
}

export function newIRBReference(): IRBReference {
  return {
    ...newIRBSectionItem(),
    byRequestOnly: false,
    name: '',
    company: '',
    phone: '',
    email: '',
  };
}

export type TResumeBuilderSection =
  | IRBDetail
  | IRBSummary
  | IRBEmployment
  | IRBEducation
  | IRBLink
  | IRBSkill
  | IRBCustom
  | IRBCourse
  | IRBExtraCurricular
  | IRBInternship
  | IRBLanguage
  | IRBReference;

export enum ETemplate {
  Stockholm = 'stockholm'
}

export enum EResumeFonts {
  Courier = 'Courier',
  Helvetica = 'Helvetica',
  TimesRoman = 'Times-Roman',
}

export interface IRBStyle {
  template: ETemplate,
  fontFamily: EResumeFonts;
  primaryColor: string;
  secondaryColor: string;
  fontSize: number;
  lineHeight: number;
}

export function newIRBStyle(): IRBStyle {
  return {
    template: ETemplate.Stockholm,
    fontFamily: EResumeFonts.Helvetica,
    primaryColor: '#111827',
    secondaryColor: '#3b82f6',
    fontSize: 16,
    lineHeight: 1,
  };
}

export type TSectionVisibility = Record<ERBType, boolean>;

export function newTSectionVisibility(): TSectionVisibility {
  return {
    [ERBType.Detail]: true,
    [ERBType.Summary]: true,
    [ERBType.Employment]: true,
    [ERBType.Education]: true,
    [ERBType.Link]: true,
    [ERBType.Skill]: true,
    [ERBType.Custom]: true,
    [ERBType.Course]: true,
    [ERBType.ExtraCurricular]: true,
    [ERBType.Internship]: true,
    [ERBType.Language]: true,
    [ERBType.Reference]: true,
  };
}

export interface IResumeSettings {
  name: string,
}

export function newIResumeSettings(): IResumeSettings {
  return {
   name: '(Not Specified)'
  };
}

export interface IResume extends MongoDocument, IResumeSettings {
  userId?: MongoId;
  sessionId?: MongoId;
  sections: IRBSection[];
  style: IRBStyle;
  createdAt?: Date;
  updatedAt?: Date;
}

export function newIResumeSections(): IRBSection[] {
  return [
    {
      type: ERBType.Detail,
      title: 'Personal Details',
      isHidden: false,
      isSortable: false,
      data: [newIRBDetail()],
    },
    {
      type: ERBType.Summary,
      title: 'Professional Summary',
      isHidden: false,
      isSortable: false,
      data: [newIRBSummary()],
    },
    {
      type: ERBType.Employment,
      title: 'Employment',
      isHidden: false,
      isSortable: true,
      data: [newIRBEmployment()],
    },
    {
      type: ERBType.Education,
      title: 'Education',
      isHidden: false,
      isSortable: true,
      data: [newIRBEducation()],
    },
    {
      type: ERBType.Link,
      title: 'Links',
      isHidden: false,
      isSortable: true,
      data: [newIRBLink()],
    },
    {
      type: ERBType.Skill,
      title: 'Skills',
      isHidden: false,
      isSortable: true,
      data: [newIRBSkill()],
    },
    {
      type: ERBType.Custom,
      title: 'Custom',
      isHidden: true,
      isSortable: true,
      data: [newIRBCustom()],
    },
    {
      type: ERBType.Course,
      title: 'Courses',
      isHidden: true,
      isSortable: true,
      data: [newIRBCourse()],
    },
    {
      type: ERBType.ExtraCurricular,
      title: 'Extra-curricular Activities',
      isHidden: true,
      isSortable: true,
      data: [newIRBExtraCurricular()],
    },
    {
      type: ERBType.Internship,
      title: 'Internships',
      isHidden: true,
      isSortable: true,
      data: [newIRBInternship()],
    },
    {
      type: ERBType.Language,
      title: 'Languages',
      isHidden: true,
      isSortable: true,
      data: [newIRBLanguage()],
    },
    {
      type: ERBType.Reference,
      title: 'References',
      isHidden: true,
      isSortable: true,
      data: [newIRBReference()],
    },
  ];
}

export function newIResumeBuilder(): IResume {
  return {
    ...newIResumeSettings(),
    sections: newIResumeSections(),
    style: newIRBStyle(),
  };
}

export type TVisibleToggle =
  | ERBType.Employment
  | ERBType.Education
  | ERBType.Link
  | ERBType.Skill
  | ERBType.Custom
  | ERBType.Course
  | ERBType.ExtraCurricular
  | ERBType.Internship
  | ERBType.Language
  | ERBType.Reference;

export const TOGGLEABLE_TYPES: TVisibleToggle[] = [
  ERBType.Custom,
  ERBType.Course,
  ERBType.ExtraCurricular,
  ERBType.Internship,
  ERBType.Language,
  ERBType.Reference,
];

export interface IResumeSessionResponse {
  token?: string,
  resume: IHasId<IResume>,
}

