import { ISection } from '@/types/Form';
import FieldController
  from "@/components/PublicFormView/PublicFormEditor/Field/FieldController";
import BasicController from "@/util/BasicController";
import { IResponseSection } from "@/types/FormPublicRequest";

export interface IState {
  fieldControllers: FieldController[];
}

// export function defaultState(): IState {
//   return {
//     fieldControllers: [],
//   };
// }

export default class SectionController extends BasicController<IState> {
  // defaultState = defaultState()
  section: ISection;

  constructor(section: ISection) {
    super();
    this.section = section;

    this.defaultState = {
      fieldControllers: section.fields.map((v) => new FieldController(v))
    }
  }

  onValidateForm = (): boolean => {
    let result = true;

    for(const controller of this.state.fieldControllers) {
      console.log(controller.field.type);
      controller.submit = true;
      if(!controller.onValidateForm()) {
       result = false;
      }
    }

    return result;
  }

  getValue = (): IResponseSection => {
    return {
      key: this.section.key,
      fields: this.state.fieldControllers.map((v) => v.getValue())
    }
  };
}
