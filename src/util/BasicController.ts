import { Dispatch, SetStateAction, useState } from 'react';

export default class BasicController<T> {
  defaultState: T = undefined as T;
  state: T = this.defaultState;
  updateState: Dispatch<SetStateAction<T>> | undefined;

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
}
