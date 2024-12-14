import BasicController from '@/util/BasicController';
import { nanoid } from 'nanoid';
import { MongoId } from '@/types/MongoDocument';
import { IForm, IFormSettings, newIForm, newIFormSettings } from '@/types/Form';
import { postApiFormsFindOne } from '@/requests/api/forms/findOne';
import FormDetailsFormController from '@/components/FormEditorView/FormEditor/FormDetailsForm/FormDetailsFormController';
import SectionController from '@/components/FormEditorView/FormEditor/Section/SectionController';
import FormSettingsFormController from '@/components/FormEditorView/FormEditor/FormSettingsForm/FormSettingsFormController';

interface IState {
  id: string;
  _id?: MongoId;
  hasErrors: boolean;
  initLoad: boolean;
  showSettings: boolean;
  settings: IFormSettings;
  detailsController: FormDetailsFormController;
  settingsController: FormSettingsFormController;
  sectionControllers: SectionController[];
  sectionController: SectionController | null;
}

export function newDefaultState(): IState {
  return {
    id: nanoid(),
    hasErrors: false,
    initLoad: false,
    showSettings: false,
    settings: newIFormSettings(),
    detailsController: new FormDetailsFormController(),
    settingsController: new FormSettingsFormController(),
    sectionControllers: [],
    sectionController: null,
  };
}

export default class FormEditorController extends BasicController<IState> {
  defaultState = newDefaultState();
  onUpdate: ((form: IForm) => void) | undefined;

  constructor(_id: MongoId, teamId: MongoId) {
    super();
    this.loadId(_id, teamId);
    // this.reset();
  }

  onClickShowSettings = () => {
    this.state.settingsController.defaultForm = { ...this.state.settings };
    this.setState({ showSettings: true });
  };

  onHideSettings = () => {
    this.state.settingsController.defaultForm = this.state.settings;
    this.setState({
      showSettings: false,
      settings: { ...this.state.settingsController.form },
    });
  };

  useController = (onUpdate: (form: IForm) => void) => {
    this._useController();
    this.onUpdate = onUpdate;
  };

  onClickDeleteSection = (index: number) => {
    if (this.state.sectionControllers.length <= 1) {
      return;
    }

    const state = { ...this.state };
    state.sectionControllers = state.sectionControllers.toSpliced(index, 1);
    this.setState(state);
  };

  onClickNewSection = () => {
    let key: string;

    while (true) {
      key = nanoid();
      if (
        this.state.sectionControllers.findIndex(
          (v) => v.state.section.key === key,
        ) === -1
      ) {
        break;
      }
    }

    const controller = new SectionController();
    controller.defaultState.key = key;
    this.setState({
      sectionControllers: [...this.state.sectionControllers, controller],
    });
  };

  load = (arg: IForm) => {
    const state = newDefaultState();
    state._id = arg._id;

    const detailsController = new FormDetailsFormController();
    detailsController.setForm(arg);
    state.detailsController = detailsController;

    const settingsController = new FormSettingsFormController();
    settingsController.setForm({ ...newIFormSettings(), ...arg.settings });
    state.settingsController = settingsController;

    state.sectionControllers = (arg.sections || []).map((section) => {
      const controller = new SectionController();
      controller.load(section);
      return controller;
    });

    state.initLoad = true;

    this.setState(state);
  };

  onClickSave = () => {
    const state: IState = { ...this.state };

    let hasErrors = false;

    if (!state.detailsController.onValidateForm()) {
      hasErrors = true;
    }

    // for (const controller of state.sectionControllers) {
    //   if (!controller.onValidateForm()) {
    //     hasErrors = true;
    //   }
    // }

    state.hasErrors = hasErrors;

    this.setState(state);

    if (!hasErrors) {
      if (this.onUpdate) {
        this.onUpdate(this.value());
      }
    }
  };

  value = (): IForm => {
    return {
      _id: this.state._id,
      ...this.state.detailsController.form,
      teamId: '',
      sections: this.state.sectionControllers.map((v) => v.getValue()),
    };
  };

  loadId = async (_id: MongoId, teamId: MongoId) => {
    if (_id === 'new') {
      this.load(newIForm(teamId));
      return;
    }

    const dynamicForm = await postApiFormsFindOne({ _id, teamId });

    if (dynamicForm) {
      this.load(dynamicForm);
    }
  };

  onClickMoveSectionUp = (index: number) => {
    if (index === 0) {
      return;
    }

    const sections = [...this.state.sectionControllers];
    const spliced = sections.splice(index, 1);
    sections.splice(index - 1, 0, spliced[0]);
    this.setState({ sectionControllers: sections });
  };

  onClickMoveSectionDown = (index: number) => {
    if (index > this.state.sectionControllers.length - 1) {
      return;
    }

    const sections = [...this.state.sectionControllers];
    const spliced = sections.splice(index, 1);
    sections.splice(index + 1, 0, spliced[0]);
    this.setState({ sectionControllers: sections });
  };
}
