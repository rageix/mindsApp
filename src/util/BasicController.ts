import { Dispatch, SetStateAction, useState } from 'react';
import { nanoid } from 'nanoid';

export default class BasicController<T> {
  defaultState: T = undefined as T;
  state: T = this.defaultState;
  updateState: Dispatch<SetStateAction<T>> | undefined;
  id = nanoid();
  currentState: T | null = null;

  constructor(arg?: T) {
    if (arg) {
      this.defaultState = arg;
      this.currentState = arg;
    }
  }

  _useController = () => {
    [this.state, this.updateState] = useState<T>(this.defaultState);
  };

  useController = (..._args: never[]) => {
    this._useController();
  };

  _setState = (state: Partial<T>) => {
    const newState: T = { ...(this.state || ({} as T)), ...state };
    this.currentState = newState;

    if (this.updateState) {
      this.updateState(newState);
      return;
    }
    this.defaultState = newState;
  };

  setState = (state: Partial<T>) => {
    this._setState(state);
  };

  _getState = (): T => {
    return this.currentState || this.defaultState;
  };

  getState = (): T => {
    return this._getState();
  };
}
