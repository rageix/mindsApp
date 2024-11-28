import BasicController from '@/util/BasicController';
import { MongoId } from '@/types/MongoDocument';
import { IForm } from '@/types/Form';

import { getApiFormsPublic } from '@/requests/api/forms/public';
import SectionController from '@/components/PublicFormView/PublicFormEditor/Section/SectionController';
import { IFormResponse } from "@/types/FormResponse";

interface IState {
  hasErrors: boolean;
  initLoad: boolean;
  form: IForm | null;
  sectionControllers: SectionController[];
}

export function newDefaultState(): IState {
  return {
    hasErrors: false,
    initLoad: false,
    form: null,
    sectionControllers: [],
  };
}

export default class PublicFormEditorController extends BasicController<IState> {
  defaultState = newDefaultState();
  onUpdate: ((response: IFormResponse) => void) | undefined;

  constructor(_id: MongoId) {
    super();
    this.loadId(_id);
  }

  useController = (onUpdate: (response: IFormResponse) => void) => {
    this._useController();
    this.onUpdate = onUpdate;
  };

  load = (arg: IForm) => {
    const state = newDefaultState();
    state.form = arg;
    state.sectionControllers = (arg.sections || []).map(
      (section) => new SectionController(section),
    );

    state.initLoad = true;

    this.setState(state);
  };

  onClickSave = () => {
    const state: IState = { ...this.state };

    let hasErrors = false;

    // if (!state.settingsController.onValidateForm()) {
    //   hasErrors = true;
    // }

    // for (const controller of state.sectionControllers) {
    //   if (!controller.onValidateForm()) {
    //     hasErrors = true;
    //   }
    // }

    state.hasErrors = hasErrors;

    this.setState(state);

    if (!hasErrors) {
      if (this.onUpdate) {
        this.onUpdate(this.getValue());
      }
    }
  };

  getValue = (): IFormResponse => {
    return {
      formId: this.state.form?._id || '',
      sections: this.state.sectionControllers.map((v) => v.getValue()),
    };
  };

  loadId = async (_id: MongoId) => {
    const form = await getApiFormsPublic(_id);

    if (form) {
      this.load(form);
    }
  };
}
