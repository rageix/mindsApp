import BasicController from '@/util/BasicController';
import FormController from '@/util/FormController';
import {
  ERBType,
  IRBCourse,
  IRBCustom,
  IRBDetail,
  IRBEducation,
  IRBEmployment,
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
import LinkFormController from '@/components/ResumeBuilder/Builder/Sections/Link/LinkForm/LinkFormController';
import CustomFormController from '@/components/ResumeBuilder/Builder/Sections/Custom/CustomForm/CustomFormController';
import CourseFormController from '@/components/ResumeBuilder/Builder/Sections/Course/CourseForm/CourseFormController';
import ExtraCurricularFormController from '@/components/ResumeBuilder/Builder/Sections/ExtraCurricular/ExtraCurricularForm/ExtraCurricularFormController';
import InternshipFormController from '@/components/ResumeBuilder/Builder/Sections/Internship/InternshipForm/InternshipFormController';
import LanguageFormController from '@/components/ResumeBuilder/Builder/Sections/Language/LanguageForm/LanguageFormController';
import ReferenceFormController from '@/components/ResumeBuilder/Builder/Sections/Reference/ReferenceForm/ReferenceFormController';
import SummaryFormController from '@/components/ResumeBuilder/Builder/Sections/Summary/SummaryForm/SummaryFormController';
import EducationFormController from '@/components/ResumeBuilder/Builder/Sections/Education/EducationForm/EducationFormController';
import SkillFormController from '@/components/ResumeBuilder/Builder/Sections/Skill/SkillForm/SkillFormController';
import EmploymentFormController from '@/components/ResumeBuilder/Builder/Sections/Employment/EmploymentForm/EmploymentFormController';

type TBuilderFormController =
  | CourseFormController
  | CustomFormController
  | DetailFormController
  | EmploymentFormController
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
    section: {
      type: ERBType.Detail,
      title: '',
      isHidden: true,
      isSortable: true,
      data: [],
    },
  };
}

export default class SectionController extends BasicController<IState> {
  defaultState = newDefaultState();
  isHidden = false;

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
        case ERBType.Employment:
          controller = new EmploymentFormController(data as IRBEmployment);
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
          controller = new CourseFormController(data as IRBCourse);
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

    this.isHidden = section.isHidden;
    this.setState({ controllers, section });
  };

  createNewController = () => {
    const id = this.getUniqueId(this.state.controllers);

    let controller: TBuilderFormController;

    switch (this.state.section.type) {
      case ERBType.Detail:
        controller = new DetailFormController();
        break;
      case ERBType.Summary:
        controller = new SummaryFormController();
        break;
      case ERBType.Employment:
        controller = new EmploymentFormController();
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
        controller = new CourseFormController();
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
    return controller;
  }

  onClickAddForm = () => {
    const controllers = [...this.state.controllers];

    controllers.push(this.createNewController());
    this.setState({ controllers });
  };

  value = (): IRBSection => {
    const state = this.state || this.defaultState;

    return {
      ...state.section,
      isHidden: this.isHidden,
      data: state.controllers.map((v) => v.form),
    };
  };

  type = (): ERBType => {
    const state = this.state || this.defaultState;

    return state.section.type;
  };

  onChangeHidden = () => {
    this.isHidden = !this.isHidden;
  };

  onDuplicateIndex = (index: number) => {
    const controllers = [...this.state.controllers];

    const controller = this.createNewController();
    const form = { ...controllers[index].form };
    controller.reset(form as any);

    controllers.splice(index + 1, 0, controller);

    this.setState({ controllers });
  };

  onDeleteIndex = (index: number) => {
    const controllers = [...this.state.controllers];
    controllers.splice(index, 1);

    this.setState({ controllers });
  };
}
