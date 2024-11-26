import {
  EFieldType,
  ISection,
  newIField,
  newISection,
} from '@/types/DynamicForm';
import { nanoid } from 'nanoid';
import FieldController from '@/components/DynamicFormsView/DynamicFormEditor/Field/FieldController';
import BasicController from '@/util/BasicController';
import SectionFormController from '@/components/DynamicFormsView/DynamicFormEditor/SectionForm/SectionFormController';

export interface IState {
  key: string;
  section: ISection;
  showEditor: boolean;
  sectionFormController: SectionFormController;
  fieldControllers: FieldController[];
}

export function defaultState(): IState {
  return {
    key: nanoid(),
    section: newISection(),
    showEditor: false,
    sectionFormController: new SectionFormController(),
    fieldControllers: [],
  };
}

export default class SectionController extends BasicController<IState> {
  defaultState = defaultState();
  state = this.defaultState;

  onClickEdit = () => {
    this.state.sectionFormController.defaultForm = this.state.section;
    this.setState({ showEditor: true });
  };

  onCloseEditor = () => {
    this.setState({
      showEditor: false,
      section: this.state.sectionFormController.form,
    });
  };

  onAddField = (type: EFieldType) => {
    const form = newIField(type);
    const controller = new FieldController(form);
    controller.load(form);
    this.setState({
      fieldControllers: [...this.state.fieldControllers, controller],
    });
  };

  onRemoveField = (index: number) => {
    this.setState({
      fieldControllers: this.state.fieldControllers.toSpliced(index, 1),
    });
  };

  load = (section: ISection) => {
    const newState = defaultState();
    newState.sectionFormController.reset(section);
    newState.fieldControllers = (section.fields || []).map((v) => {
      const fieldController = new FieldController();
      fieldController.load(v);
      return fieldController;
    });
    this.setState(newState);
  };

  getValue = (): ISection => {
    return {
      key: this.state.key,
      heading: this.state.section.heading,
      description: this.state.section.description,
      fields: this.state.fieldControllers.map((v) => v.getValue()),
    };
  };
}
