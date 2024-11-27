import BasicController from '@/util/BasicController';
import { nanoid } from 'nanoid';
import { MongoId } from '@/types/MongoDocument';
import { IDynamicForm, newIDynamicForm } from '@/types/DynamicForm';
import { postApiDynamicFormsFindOne } from '@/requests/api/dynamicForms/findOne';
import SectionController from '@/components/DynamicFormsView/DynamicFormEditor/Section/SectionController';
import SettingsFormController from '@/components/DynamicFormsView/DynamicFormEditor/SettingsForm/SettingsFormController';

interface IState {
  id: string;
  _id?: MongoId;
  hasErrors: boolean;
  initLoad: boolean;
  settingsController: SettingsFormController;
  sectionControllers: SectionController[];
  sectionController: SectionController | null;
}

export function newDefaultState(): IState {
  return {
    id: nanoid(),
    hasErrors: false,
    initLoad: false,
    settingsController: new SettingsFormController(),
    sectionControllers: [],
    sectionController: null,
  };
}

export default class DynamicFormEditorController extends BasicController<IState> {
  defaultState = newDefaultState();
  onUpdate: ((form: IDynamicForm) => void) | undefined;

  constructor(_id: MongoId, teamId: MongoId) {
    super();
    this.loadId(_id, teamId);
    // this.reset();
  }

  useController = (onUpdate: (form: IDynamicForm) => void) => {
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

  load = (arg: IDynamicForm) => {
    const state = newDefaultState();
    state._id = arg._id;

    const settingsController = new SettingsFormController();
    settingsController.setForm(arg);

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

    if (!state.settingsController.onValidateForm()) {
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

  value = (): IDynamicForm => {
    return {
      _id: this.state._id,
      ...this.state.settingsController.form,
      teamId: '',
      sections: this.state.sectionControllers.map((v) => v.getValue()),
    };
  };

  loadId = async (_id: MongoId, teamId: MongoId) => {
    if (_id === 'new') {
      this.load(newIDynamicForm(teamId));
      return;
    }

    const dynamicForm = await postApiDynamicFormsFindOne({ _id, teamId });

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
    if (index > this.state.sectionControllers.length -1) {
      return;
    }

    const sections = [...this.state.sectionControllers];
    const spliced = sections.splice(index, 1);
    sections.splice(index + 1, 0, spliced[0]);
    this.setState({ sectionControllers: sections });
  };
}
