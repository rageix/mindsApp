import { ISection } from '@/types/Form';
import FieldController
  from "@/components/PublicFormView/PublicFormEditor/Field/FieldController";
import BasicController from "@/util/BasicController";
import { IResponseSection } from "@/types/FormResponse";

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

  getValue = (): IResponseSection => {
    return {
      key: this.section.key,
      fields: this.state.fieldControllers.map((v) => v.getValue())
    }
  };
}
