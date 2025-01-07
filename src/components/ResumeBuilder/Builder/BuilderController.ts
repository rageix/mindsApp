import BasicController from '@/util/BasicController';
import FormController from '@/util/FormController';
import {
  ERBType,
  IRBCourse,
  IRBCustom,
  IRBDetail,
  IRBEducation,
  IRBExtraCurricular,
  IRBInternship,
  IRBLanguage,
  IRBLink, IRBReference,
  IRBSkill, IRBSummary,
  IResumeBuilder, TResumeBuilderSection
} from '@/types/ResumeBuilder';
import DetailFormController from '@/components/ResumeBuilder/Builder/DetailForm/DetailFormController';
import { nanoid } from 'nanoid';
import EducationFormController
  from '@/components/ResumeBuilder/Builder/EducationForm/EducationFormController';
import LinkFormController
  from '@/components/ResumeBuilder/Builder/LinkForm/LinkFormController';
import SkillFormController
  from '@/components/ResumeBuilder/Builder/SkillForm/SkillFormController';
import CustomFormController
  from '@/components/ResumeBuilder/Builder/CustomForm.ts/CustomFormController';
import CoursesFormController
  from '@/components/ResumeBuilder/Builder/CoursesForm/CoursesFormController';
import ExtraCurricularFormController
  from '@/components/ResumeBuilder/Builder/ExtraCurricularForm/CoursesFormController';
import InternshipFormController
  from '@/components/ResumeBuilder/Builder/InternshipForm/InternshipFormController';
import LanguageFormController
  from '@/components/ResumeBuilder/Builder/LanguageForm/InternshipFormController';
import ReferenceFormController
  from '@/components/ResumeBuilder/Builder/ReferenceForm/ReferenceFormController';
import SummaryFormController
  from '@/components/ResumeBuilder/Builder/SummaryForm/SummaryFormController';

// type TBuilderFormController = CoursesFormController | CustomFormController | DateFormController | DetailFormController | EducationFormController | CoursesFormController | InternshipFormController | LinkFormController | ReferenceFormController | SkillFormController | SummaryFormController;
interface IState {
  controllers: FormController<TResumeBuilderSection>[];
}

export function newDefaultState(): IState {
  return {
    controllers: [],
  };
}

export default class BuilderController extends BasicController<IState> {
  defaultState = newDefaultState();

  constructor() {
    super();
  }

  getUniqueId = (controllers: FormController<any>[]) => {
    while (true) {
      const id = nanoid();

      if (controllers.findIndex((v) => v.id === id) === -1) {
        return id;
      }
    }
  };

  load = (builder: IResumeBuilder) => {
    const controllers: FormController<TResumeBuilderSection>[] = [];

    for (const section of builder.sections) {
      const id = this.getUniqueId(controllers);
      let controller: FormController<any>;

      switch (section.type) {
        case ERBType.Detail:
          controller = new DetailFormController(section.data as IRBDetail);
          break;
        case ERBType.Summary:
          // todo: add text support
          controller = new SummaryFormController(section.data as IRBSummary);
          break;
        case ERBType.Education:
          controller = new EducationFormController(section.data as IRBEducation);
          break;
        case ERBType.Link:
          controller = new LinkFormController(
            section.data as unknown as IRBLink,
          );
          break;
        case ERBType.Skill:
          controller = new SkillFormController(
            section.data as unknown as IRBSkill,
          );
          break;
        case ERBType.Custom:
          controller = new CustomFormController(section.data as IRBCustom);
          break;
        case ERBType.Course:
          controller = new CoursesFormController(section.data as IRBCourse);
          break;
        case ERBType.ExtraCurricular:
          controller = new ExtraCurricularFormController(section.data as IRBExtraCurricular);
          break;
        case ERBType.Internship:
          controller = new InternshipFormController(section.data as IRBInternship);
          break;
        case ERBType.Language:
          controller = new LanguageFormController(
            section.data as unknown as IRBLanguage,
          );
          break;
        case ERBType.Reference:
          controller = new ReferenceFormController(
            section.data as unknown as IRBReference,
          );
          break;
      }

      controller.id = id;
      controllers.push(controller);
    }

    this.setState({ controllers });
  };

  value = (): TResumeBuilderSection[] => {

    return this.state.controllers.map((v) => v.form);



  }
}
