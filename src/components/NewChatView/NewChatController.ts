import { IPersona } from '@/types/Persona';
import BasicController from '@/util/BasicController';

export interface IState {
  selected: IPersona[];
}

export function defaultState(): IState {
  return {
    selected: [],
  };
}

export default class NewChatController extends BasicController<IState> {
  defaultState = defaultState();

  onAdd = (value: IPersona) => {
    this.setState({ selected: [...this.state.selected, value] });
  };

  onClickRemove = (index: number) => {
    const selected = [...this.state.selected];
    selected.splice(index, 1);

    this.setState({ selected });
  };
}
