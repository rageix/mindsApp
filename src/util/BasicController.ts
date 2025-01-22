import { Dispatch, SetStateAction, useState } from 'react';
import { nanoid } from 'nanoid';

export default class BasicController<T> {
  defaultState: T = undefined as T;
  state: T = this.defaultState;
  updateState: Dispatch<SetStateAction<T>> | undefined;
  id = nanoid();

  _useController = () => {
    [this.state, this.updateState] = useState<T>(this.defaultState);
  };

  useController = (..._args: never[]) => {
    this._useController();
  };

  setState = (state: Partial<T>) => {
    const newState: T = { ...(this.state || ({} as T)), ...state };

    if (this.updateState) {
      this.updateState(newState);
      return;
    }
    this.defaultState = newState;
  };

  _getState = (): T => {
    return this.state || this.defaultState;
  };

  getState = (): T => {
    return this._getState();
  };
}
