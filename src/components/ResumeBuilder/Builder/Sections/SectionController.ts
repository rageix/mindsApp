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
  IRBLink,
  IRBReference,
  IRBSection,
  IRBSkill,
  IRBSummary,
} from '@/types/ResumeBuilder';
import DetailFormController from '@/components/ResumeBuilder/Builder/Sections/Detail/DetailForm/DetailFormController';
import { nanoid } from 'nanoid';
import EducationFormController from '@/components/ResumeBuilder/Builder/EducationForm/EducationFormController';
import LinkFormController from '@/components/ResumeBuilder/Builder/Sections/Link/LinkForm/LinkFormController';
import SkillFormController from '@/components/ResumeBuilder/Builder/SkillForm/SkillFormController';
import CustomFormController from '@/components/ResumeBuilder/Builder/CustomForm.ts/CustomFormController';
import CoursesFormController from '@/components/ResumeBuilder/Builder/CoursesForm/CoursesFormController';
import ExtraCurricularFormController from '@/components/ResumeBuilder/Builder/ExtraCurricularForm/CoursesFormController';
import InternshipFormController from '@/components/ResumeBuilder/Builder/InternshipForm/InternshipFormController';
import LanguageFormController from '@/components/ResumeBuilder/Builder/LanguageForm/InternshipFormController';
import ReferenceFormController from '@/components/ResumeBuilder/Builder/ReferenceForm/ReferenceFormController';
import SummaryFormController from '@/components/ResumeBuilder/Builder/Sections/Summary/SummaryForm/SummaryFormController';

type TBuilderFormController =
  | CoursesFormController
  | CustomFormController
  | DetailFormController
  | EducationFormController
  | InternshipFormController
  | LinkFormController
  | ReferenceFormController
  | SkillFormController
  | SummaryFormController
  | ExtraCurricularFormController
  | LanguageFormController;

interface IState {
  controllers: TBuilderFormController[];
  section: IRBSection;
}

export function newDefaultState(): IState {
  return {
    controllers: [],
    section: { type: ERBType.Detail, data: [] },
  };
}

export default class SectionController extends BasicController<IState> {
  defaultState = newDefaultState();

  constructor(section: IRBSection) {
    super();
    this.load(section);
  }

  getUniqueId = (controllers: FormController<any>[]) => {
    while (true) {
      const id = nanoid();

      if (controllers.findIndex((v) => v.id === id) === -1) {
        return id;
      }
    }
  };

  load = (section: IRBSection) => {
    console.log('load section', section);
    const controllers: TBuilderFormController[] = [];

    for (const data of section.data) {
      const id = this.getUniqueId(controllers);
      let controller: TBuilderFormController;

      switch (section.type) {
        case ERBType.Detail:
          controller = new DetailFormController(data as IRBDetail);
          break;
        case ERBType.Summary:
          controller = new SummaryFormController(data as IRBSummary);
          break;
        case ERBType.Education:
          controller = new EducationFormController(data as IRBEducation);
          break;
        case ERBType.Link:
          controller = new LinkFormController(data as IRBLink);
          break;
        case ERBType.Skill:
          controller = new SkillFormController(data as IRBSkill);
          break;
        case ERBType.Custom:
          controller = new CustomFormController(data as IRBCustom);
          break;
        case ERBType.Course:
          controller = new CoursesFormController(data as IRBCourse);
          break;
        case ERBType.ExtraCurricular:
          controller = new ExtraCurricularFormController(
            data as IRBExtraCurricular,
          );
          break;
        case ERBType.Internship:
          controller = new InternshipFormController(data as IRBInternship);
          break;
        case ERBType.Language:
          controller = new LanguageFormController(data as IRBLanguage);
          break;
        case ERBType.Reference:
          controller = new ReferenceFormController(data as IRBReference);
          break;
      }

      controller.id = id;
      controllers.push(controller);
    }

    this.setState({ controllers, section });
  };

  onClickAddForm = () => {
    const id = this.getUniqueId(this.state.controllers);

    const controllers = [...this.state.controllers];
    let controller: TBuilderFormController;

    switch (this.state.section.type) {
      case ERBType.Detail:
        controller = new DetailFormController();
        break;
      case ERBType.Summary:
        controller = new SummaryFormController();
        break;
      case ERBType.Education:
        controller = new EducationFormController();
        break;
      case ERBType.Link:
        controller = new LinkFormController();
        break;
      case ERBType.Skill:
        controller = new SkillFormController();
        break;
      case ERBType.Custom:
        controller = new CustomFormController();
        break;
      case ERBType.Course:
        controller = new CoursesFormController();
        break;
      case ERBType.ExtraCurricular:
        controller = new ExtraCurricularFormController();
        break;
      case ERBType.Internship:
        controller = new InternshipFormController();
        break;
      case ERBType.Language:
        controller = new LanguageFormController();
        break;
      case ERBType.Reference:
        controller = new ReferenceFormController();
        break;
    }
    controller.id = id;
    controllers.push(controller);
    this.setState({ controllers });
  };

  value = (): IRBSection => {
    return {
      type: this.state.section.type,
      data: this.state.controllers.map((v) => v.form),
    };
  };
}
