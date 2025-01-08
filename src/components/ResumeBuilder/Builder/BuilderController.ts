import BasicController from '@/util/BasicController';
import FormController from '@/util/FormController';
import { IResumeBuilder, newIRBStyle } from '@/types/ResumeBuilder';
import { nanoid } from 'nanoid';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';

// type TBuilderFormController = CoursesFormController | CustomFormController | DateFormController | DetailFormController | EducationFormController | CoursesFormController | InternshipFormController | LinkFormController | ReferenceFormController | SkillFormController | SummaryFormController;
interface IState {
  controllers: SectionController[];
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
}
