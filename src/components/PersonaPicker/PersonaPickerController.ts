import { ChangeEvent } from 'react';
import { IPersona } from '@/types/Persona';
import { PERSONAS } from '@/common/Personas';
import BasicController from '@/util/BasicController';

export interface IState {
  text: string;
  filtered: IPersona[];
}

export function defaultState(): IState {
  return {
    text: '',
    filtered: [...PERSONAS],
  };
}

export default class PersonaPickerController extends BasicController<IState> {
  defaultState = defaultState();

  onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let filtered: IPersona[];
    if (value.trim() === '') {
      filtered = [...PERSONAS];
    } else {
      filtered = PERSONAS.filter(
        (v) => v.name.search(new RegExp(value, 'ig')) > -1,
      );
    }
    this.setState({ text: value, filtered });
  };

  onClickClearText = () => {
    this.setState({ text: '', filtered: [...PERSONAS] });
  }
}
