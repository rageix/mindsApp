import {
  EFieldType,
  ISection,
  newIField,
  newISection,
} from '@/types/Form';
import { nanoid } from 'nanoid';
import BasicController from '@/util/BasicController';
import FieldController
  from "@/components/FormEditorView/FormEditor/Field/FieldController";
import SectionFormController
  from "@/components/FormEditorView/FormEditor/SectionForm/SectionFormController";

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
    let key: string;

    while (true) {
      key = nanoid();
      if (
        this.state.fieldControllers.findIndex(
          (v) => v.state.field.key === key,
        ) === -1
      ) {
        break;
      }
    }

    const form = newIField(type);
    form.key = key;
    const controller = new FieldController();
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
    newState.section = section;
    newState.sectionFormController.setForm(section);
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

  onClickMoveFieldUp = (index: number) => {
    if (index === 0) {
      return;
    }

    const fields = [...this.state.fieldControllers];
    const spliced = fields.splice(index, 1);
    fields.splice(index - 1, 0, spliced[0]);
    this.setState({ fieldControllers: fields });
  };

  onClickMoveFieldDown = (index: number) => {
    if (index >= this.state.fieldControllers.length -1) {
      return;
    }

    const fields = [...this.state.fieldControllers];
    const spliced = fields.splice(index, 1);
    fields.splice(index + 1, 0, spliced[0]);
    this.setState({ fieldControllers: fields });
  };
}
