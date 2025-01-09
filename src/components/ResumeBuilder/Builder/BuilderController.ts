import BasicController from '@/util/BasicController';
import FormController from '@/util/FormController';
import { ERBType, IResumeBuilder, newIRBStyle } from '@/types/ResumeBuilder';
import { nanoid } from 'nanoid';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';

type THiddenType =
  | ERBType.Custom
  | ERBType.Course
  | ERBType.ExtraCurricular
  | ERBType.Internship
  | ERBType.Language
  | ERBType.Reference;
type THiddenSections = Record<THiddenType, boolean>;

// type TBuilderFormController = CoursesFormController | CustomFormController | DateFormController | DetailFormController | EducationFormController | CoursesFormController | InternshipFormController | LinkFormController | ReferenceFormController | SkillFormController | SummaryFormController;
interface IState {
  controllers: SectionController[];
  hiddenSections: THiddenSections;
}

export function newDefaultState(): IState {
  return {
    controllers: [],
    hiddenSections: {
      [ERBType.Custom]: true,
      [ERBType.Course]: true,
      [ERBType.ExtraCurricular]: true,
      [ERBType.Internship]: true,
      [ERBType.Language]: true,
      [ERBType.Reference]: true,
    },
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

    this.setState({ controllers });
  };

  value = (): IResumeBuilder => {
    return {
      sections: this.state.controllers.map((v) => v.value()),
      style: newIRBStyle(),
      templateId: '',
    };
  };

  onChangeSectionIsHidden = (type: ERBType) => {
    const hiddenSections = { ...this.state.hiddenSections };
    hiddenSections[type] = !hiddenSections[type];

    this.setState({ hiddenSections });
  };
}
