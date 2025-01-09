import { MongoId } from '@/types/MongoDocument';

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
  isHidden?: boolean;
  data: TResumeBuilderSection[];
}

export interface IRBDetail {
  title: string;
  image: string;
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
    title: '',
    image: '',
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

export interface IRBSummary {
  description: string;
}

export function newIRBSummary(): IRBSummary {
  return {
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

export interface IRBEmployment {
  title: string;
  employer: string;
  start: IRBDate | null;
  end: IRBDate | null;
  city: string;
  description: string;
}

export function newIRBEmployment(): IRBEmployment {
  return {
    title: '',
    employer: '',
    start: null,
    end: null,
    city: '',
    description: '',
  };
}

export interface IRBEducation {
  school: string;
  degree: string;
  start: IRBDate | null;
  end: IRBDate | null;
  city: string;
  description: string;
}

export function newIRBEducation(): IRBEducation {
  return {
    school: '',
    degree: '',
    start: null,
    end: null,
    city: '',
    description: '',
  };
}

export interface IRBLink {
  label: string;
  link: string;
}

export function newIRBLink(): IRBLink {
  return {
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

export interface IRBSkill {
  skill: string;
  level: ERBSkillLevel | null;
}

export function newIRBSkill(): IRBSkill {
  return {
    skill: '',
    level: null,
  };
}

export interface IRBCustom {
  title: string;
  city: string;
  start: IRBDate | null;
  end: IRBDate | null;
  description: string;
}

export function newIRBCustom(): IRBCustom {
  return {
    title: '',
    city: '',
    start: null,
    end: null,
    description: '',
  };
}

export interface IRBCourse {
  name: string;
  institution: string;
  start: IRBDate | null;
  end: IRBDate | null;
  description: string;
}

export function newIRBCourse(): IRBCourse {
  return {
    name: '',
    institution: '',
    start: null,
    end: null,
    description: '',
  };
}

export interface IRBExtraCurricular {
  name: string;
  start: IRBDate | null;
  end: IRBDate | null;
  city: string;
  description: string;
}

export function newIRBExtraCurricular(): IRBExtraCurricular {
  return {
    name: '',
    start: null,
    end: null,
    city: '',
    description: '',
  };
}

export interface IRBInternship {
  title: string;
  employer: string;
  start: IRBDate | null;
  end: IRBDate | null;
  city: string;
  description: string;
}

export function newIRBInternship(): IRBInternship {
  return {
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

export interface IRBLanguage {
  language: string;
  level: ERBLanguageLevel | null;
}

export function newIRBLanguage(): IRBLanguage {
  return {
    language: '',
    level: null,
  };
}

export interface IRBReference {
  byRequestOnly: boolean;
  name: string;
  company: string;
  phone: string;
  email: string;
}

export function newIRBReference(): IRBReference {
  return {
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

export interface IRBStyle {
  font: string;
  color: string;
  size: number;
}

export function newIRBStyle(): IRBStyle {
  return {
    font: '',
    color: '',
    size: 16,
  };
}

export interface IResumeBuilder {
  sections: IRBSection[];
  style: IRBStyle;
  templateId: MongoId;
}

export function newIResumeBuilderSections(): IRBSection[] {
  return [
    {
      type: ERBType.Detail,
      data: [newIRBDetail()],
    },
    {
      type: ERBType.Summary,
      data: [newIRBSummary()],
    },
    {
      type: ERBType.Employment,
      data: [newIRBEducation()],
    },
    {
      type: ERBType.Education,
      data: [newIRBEducation()],
    },
    {
      type: ERBType.Link,
      data: [newIRBLink()],
    },
    {
      type: ERBType.Skill,
      data: [newIRBSkill()],
    },
    {
      type: ERBType.Custom,
      isHidden: true,
      data: [newIRBCustom()],
    },
    {
      type: ERBType.Course,
      isHidden: true,
      data: [newIRBCourse()],
    },{
      type: ERBType.ExtraCurricular,
      isHidden: true,
      data: [newIRBExtraCurricular()],
    },
    {
      type: ERBType.Internship,
      isHidden: true,
      data: [newIRBInternship()],
    },
    {
      type: ERBType.Language,
      isHidden: true,
      data: [newIRBLanguage()],
    },
    {
      type: ERBType.Reference,
      isHidden: true,
      data: [newIRBReference()],
    },
  ];
}

export function newIResumeBuilder(): IResumeBuilder {
  return {
    sections: newIResumeBuilderSections(),
    style: newIRBStyle(),
    templateId: '',
  };
}
