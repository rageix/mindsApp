import BasicController from '@/util/BasicController';
import FormController from '@/util/FormController';
import {
  IResumeBuilder,
  newIRBStyle,
  TVisibleToggle,
} from '@/types/ResumeBuilder';
import { nanoid } from 'nanoid';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';

// type TBuilderFormController = CoursesFormController | CustomFormController | DateFormController | DetailFormController | EducationFormController | CoursesFormController | InternshipFormController | LinkFormController | ReferenceFormController | SkillFormController | SummaryFormController;
interface IState {
  controllers: SectionController[];
  // hiddenSections: THiddenSections;
}

export function newDefaultState(): IState {
  return {
    controllers: [],
    // hiddenSections: {
    //   [ERBType.Custom]: true,
    //   [ERBType.Course]: true,
    //   [ERBType.ExtraCurricular]: true,
    //   [ERBType.Internship]: true,
    //   [ERBType.Language]: true,
    //   [ERBType.Reference]: true,
    // },
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
    const controllers: SectionController[] = builder.sections.map(
      (v) => new SectionController(v),
    );

    // const hiddenSections: THiddenSections = {
    //   [ERBType.Custom]: !!(controllers.find(
    //     (v) => v.state?.section?.type === ERBType.Custom,
    //   )?.state.section.isHidden),
    //   [ERBType.Course]: !!controllers.find(
    //     (v) => v.state?.section?.type === ERBType.Course,
    //   )?.state.section.isHidden,
    //   [ERBType.ExtraCurricular]: !!controllers.find(
    //     (v) => v.state?.section?.type === ERBType.ExtraCurricular,
    //   )?.state.section.isHidden,
    //   [ERBType.Internship]: !!controllers.find(
    //     (v) => v.state?.section?.type === ERBType.Internship,
    //   )?.state.section.isHidden,
    //   [ERBType.Language]: !!controllers.find(
    //     (v) => v.state?.section?.type === ERBType.Language,
    //   )?.state.section.isHidden,
    //   [ERBType.Reference]: !!controllers.find(
    //     (v) => v.state?.section?.type === ERBType.Reference,
    //   )?.state.section.isHidden,
    // };

    this.setState({ controllers });
  };

  value = (): IResumeBuilder => {
    return {
      sections: this.state.controllers.map((v) => v.value()),
      style: newIRBStyle(),
      templateId: '',
    };
  };

  onChangeSectionIsHidden = (type: TVisibleToggle) => {
    const controllers = [...this.state.controllers];

    const index = controllers.findIndex(
      (v) => (v.state || v.defaultState).section?.type === type,
    );

    if (index > -1) {
      controllers[index].onChangeHidden();
      this.setState({ controllers });
      return;
    }


    // const hiddenSections = { ...this.state.hiddenSections };
    //
    // hiddenSections[type] = !hiddenSections[type];
    //
    // this.setState({ hiddenSections });
  };
}
