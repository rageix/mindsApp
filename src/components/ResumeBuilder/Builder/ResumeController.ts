import BasicController from '@/util/BasicController';
import { IRBStyle, IResume, newIRBStyle, TVisibleToggle } from '@/types/Resume';
import { nanoid } from 'nanoid';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import { getApiResumesSession } from '@/requests/api/resumes/session';
import tokenService from '@/services/TokenService';
import { MongoId } from '@/types/MongoDocument';
import { postApiResumesFindOne } from '@/requests/api/resumes/findOne';
import { postApiResumes } from '@/requests/api/resumes';
import ResumeSettingsFormController from '@/components/ResumeBuilder/ResumeSettingsForm/ResumeSettingsFormController';
import StyleController from '@/components/ResumeBuilder/Builder/Sections/StyleController';
import ColorController from '@/components/Color/ColorController';

interface IState {
  controllers: SectionController[];
  isLoading: boolean;
  lastSavedAt: Date | null;
  original: IResume | null;
  settingsController: ResumeSettingsFormController | null;
  current: IResume | null;
  styleController: StyleController;
  primaryColorController: ColorController;
  secondaryColorController: ColorController;
  dirty: boolean;
  isFullScreen: boolean;
}

export function newDefaultState(): IState {
  return {
    controllers: [],
    isLoading: true,
    lastSavedAt: null,
    original: null,
    settingsController: null,
    current: null,
    styleController: new StyleController(),
    primaryColorController: new ColorController(),
    secondaryColorController: new ColorController(),
    dirty: false,
    isFullScreen: false,
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

    // load sections into their own controllers
    for (const section of resume.sections) {
      const id = this.getUniqueId(controllers);
      const controller = new SectionController(section);
      controller.id = id;
      controllers.push(controller);
    }

    // load general settings controller
    const settingsController = new ResumeSettingsFormController();
    settingsController.reset({ name: resume.name });

    // create and load all the style controllers
    const styleState = { ...newIRBStyle(), ...resume.style };
    this.state.styleController.reset(styleState);
    this.state.primaryColorController.onChangeHex(styleState.primaryColor);
    this.state.secondaryColorController.onChangeHex(styleState.secondaryColor);

    this.setState({
      controllers,
      isLoading: false,
      original: resume,
      lastSavedAt: resume.updatedAt,
      settingsController,
      current: resume,
      styleController: this.state.styleController,
      primaryColorController: this.state.primaryColorController,
      secondaryColorController: this.state.secondaryColorController,
    });
    window.scrollTo(0, 0);
  };

  value = (): IResume => {
    const style: IRBStyle = this.state.styleController.getForm();
    style.primaryColor = this.state.primaryColorController.getState().hex;
    style.secondaryColor = this.state.secondaryColorController.getState().hex;

    const state = this.currentState;

    return {
      _id: state?.original?._id,
      name: state?.settingsController?.getForm().name || '',
      sections: state?.controllers.map((v) => v.value()) || [],
      style: style,
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
      this.save();
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

  loadSession = async (): Promise<MongoId | undefined> => {
    this.setState({ isLoading: true });

    const response = await getApiResumesSession();

    if (response?.token) {
      tokenService.save(response.token);
    }

    if (response?.resume) {
      this.load(response.resume);
      return response.resume._id;
    }
  };

  save = async () => {
    const resume = this.value();
    const response = await postApiResumes(resume);

    this.setState({ lastSavedAt: new Date(), current: resume, dirty: false });
    // reset the dirty flag on all sub-forms
    for (const section of this.state.controllers) {
      for (const form of section.state.controllers) {
        form.isDirty = false;
      }
    }
    if (this.state.settingsController) {
      this.state.settingsController.isDirty = false;
    }

    return response;
  };

  onMoveUpSection = (id: string) => {
    const index = this.state.controllers.findIndex((v) => v.id === id);

    if (index <= 0) {
      return;
    }

    const controllers = [...this.state.controllers];
    const removed = controllers.splice(index, 1);

    controllers.splice(index - 1, 0, removed[0]);
    this.setState({ controllers, dirty: true });
    this.save();
  };

  onMoveDownSection = (id: string) => {
    const index = this.state.controllers.findIndex((v) => v.id === id);

    if (index >= this.state.controllers.length - 1) {
      return;
    }

    const controllers = [...this.state.controllers];
    const removed = controllers.splice(index, 1);

    controllers.splice(index + 1, 0, removed[0]);
    this.setState({ controllers, dirty: true });
    this.save();
  };

  onResumeUpdated = () => {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  };

  onChangeFullScreen = (isFullScreen: boolean) => {
    this.setState({ isFullScreen });
  };
}
