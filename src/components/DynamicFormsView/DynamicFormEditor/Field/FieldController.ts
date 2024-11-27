import { EFieldType, IField, newIField } from '@/types/DynamicForm';
import FieldFormController from '@/components/DynamicFormsView/DynamicFormEditor/FieldForm/FieldFormController';
import BasicController from '@/util/BasicController';

export interface IState {
  field: IField;
  showEditor: boolean;
  formController: FieldFormController;
}

export function defaultState(): IState {
  return {
    field: newIField(EFieldType.Text),
    showEditor: false,
    formController: new FieldFormController(),
  };
}

export default class FieldController extends BasicController<IState> {
  defaultState = defaultState();

  onClickEdit = () => {
    this.state.formController.defaultForm = this.state.field;
    this.setState({ showEditor: true });
  };

  onCloseEditor = () => {
    this.setState({
      showEditor: false,
      field: this.state.formController.form,
    });
  };

  load = (field: IField) => {
    const state = defaultState();
    state.field = field;
    state.formController = new FieldFormController();
    const form = {
      ...newIField(field.type),
      ...field,
    };
    state.formController.defaultForm = form;
    state.formController.form = form;
    this.setState(state);
  };

  getValue = (): IField => {
    return {
      ...this.state.field,
    };
  };

}
