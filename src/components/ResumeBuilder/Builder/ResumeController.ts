import BasicController from '@/util/BasicController';
import { IResume, newIRBStyle, TVisibleToggle } from '@/types/Resume';
import { nanoid } from 'nanoid';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import { getApiResumesSession } from '@/requests/api/resumes/session';
import tokenService from '@/services/TokenService';
import { MongoId } from '@/types/MongoDocument';
import { postApiResumesFindOne } from '@/requests/api/resumes/findOne';
import { postApiResumes } from '@/requests/api/resumes';

// type TBuilderFormController = CoursesFormController | CustomFormController | DateFormController | DetailFormController | EducationFormController | CoursesFormController | InternshipFormController | LinkFormController | ReferenceFormController | SkillFormController | SummaryFormController;
interface IState {
  controllers: SectionController[];
  isLoading: boolean;
  lastSavedAt: Date | null;
  original: IResume | null;
  // hiddenSections: THiddenSections;
}

export function newDefaultState(): IState {
  return {
    controllers: [],
    isLoading: true,
    lastSavedAt: null,
    original: null,
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

export default class ResumeController extends BasicController<IState> {
  defaultState = newDefaultState();

  constructor() {
    super();
  }

  getUniqueId = (controllers: SectionController[]) => {
    while (true) {
      const id = nanoid();

      if (controllers.findIndex((v) => v.id === id) === -1) {
        return id;
      }
    }
  };

  load = (resume: IResume) => {
    const controllers: SectionController[] = [];

    for (const section of resume.sections) {
      const id = this.getUniqueId(controllers);
      const controller = new SectionController(section);
      controller.id = id;
      controllers.push(controller);
    }

    this.setState({
      controllers,
      isLoading: false,
      original: resume,
      lastSavedAt: resume.updatedAt,
    });
  };

  value = (): IResume => {
    return {
      _id: this.state.original?._id,
      name: this.state.original?.name || '',
      sections: this.state.controllers.map((v) => v.value()),
      style: this.state.original?.style || newIRBStyle(),
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

  loadId = async (_id: MongoId) => {
    this.setState({ isLoading: true });

    const response = await postApiResumesFindOne({ _id });

    if (response) {
      this.load(response);
    }
  };

  loadSession = async () => {
    this.setState({ isLoading: true });

    const response = await getApiResumesSession();

    if (response?.token) {
      tokenService.save(response.token);
    }

    if (response?.resume) {
      this.load(response.resume);
    }
  };

  save = async () => {
    const resume = this.value();
    await postApiResumes(resume);

    this.setState({ lastSavedAt: new Date() });
  };
}
