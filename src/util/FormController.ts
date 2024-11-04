import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { z } from 'zod';
import { IForm, newIForm } from '@/types/Form';
import _ from 'lodash';
import { getZodErrorsObj } from './GetZodErrors';
import { nanoid } from 'nanoid';
import BasicController from '@/util/BasicController';

export default class FormController<T> extends BasicController<IForm<T>> {
  resetForm: T = null as T;
  defaultForm: T = null as T;
  form: T = this.defaultForm;
  updateForm: Dispatch<SetStateAction<T>> = null as unknown as Dispatch<
    SetStateAction<T>
  >;
  formValidator: ((form: T) => z.ZodType<T>) | undefined;
  submit = false;
  onSubmit: ((form: T) => void) | undefined;
  name?: string;
  id = nanoid();
  defaultState = newIForm<T>();
  lastUpdate: Date | undefined;

  constructor(arg?: T) {
    super();

    if (arg) {
      this.defaultForm = arg;
    }
  }

  _useController = (onSubmit?: (form: T) => void) => {
    this.onSubmit = onSubmit;
    [this.state, this.updateState] = useState<IForm<T>>(this.defaultState);
    [this.form, this.updateForm] = useState<T>(this.defaultForm);
  };

  useController = (onSubmit?: (form: T) => void) => {
    this._useController(onSubmit);
  };

  _reset = (form?: T) => {
    this.submit = false;
    this.setState(this.defaultState);
    this.setForm(form || this.resetForm);
  };

  reset = (form?: T) => {
    this._reset(form);
  };

  _softReset = () => {
    this.submit = true;
    this.setState({ ...this.state, dirty: false });
  };

  softReset = () => {
    this._softReset();
  };

  _setForm = (form: T) => {
    this.lastUpdate = new Date();
    if (this.updateForm) {
      this.updateForm(form);
      return;
    }

    this.defaultForm = form;
  };

  setForm = (form: T) => {
    this._setForm(form);
  };

  /**
   * Should be called after field change.
   */
  _onChangeForm = (update: Partial<T>, validate = true) => {
    const form = { ...this.form, ...update };

    this.setForm(form);
    this.setState({ ...this.state, dirty: true });

    if (validate && this.submit) {
      return this.onValidateForm(form);
    }
  };

  onChangeForm = (update: Partial<T>, validate = true) => {
    return this._onChangeForm(update, validate);
  };

  /**
   * Should be called when you want to validate the form.
   * @returns {boolean}
   */
  _onValidate = (): boolean => {
    if (this.submit) {
      return this.onValidateForm(this.form);
    }

    return false;
  };

  onValidate = (): boolean => {
    return this._onValidate();
  };

  /**
   * Call when you want to submit a form using the form onSubmit handler.
   *
   * @param {FormEvent<HTMLFormElement>} event
   */
  _onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.onClickSubmit();
  };

  onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    this._onSubmitForm(event);
  };

  /**
   * For use when clicking a form submit button.
   */
  _onClickSubmit = () => {
    this.submit = true;

    if (this.onValidateForm(this.form)) {
      if (this.onSubmit) {
        this.onSubmit(this.form);
      }
    }
  };

  onClickSubmit = () => {
    this._onClickSubmit();
  };

  /**
   * Another placeholder function that all children should have,
   * put actual form validation code in this method.
   *
   * @returns {boolean}
   */
  _onValidateForm = (form?: T): boolean => {
    if (!this.formValidator) {
      return true;
    }

    const data = form || this.form;
    const result = this.formValidator(data).safeParse(data);

    const state: IForm<T> = { ...this.state };

    // this might show a warning depending on typescript config
    // this is the best way to do it no matter the config
    if (result.success === false) {
      state.errors = getZodErrorsObj(result) as Record<keyof T, string[]>;
    } else {
      state.errors = {} as Record<keyof T, string[]>;
    }

    this.state = state;
    this.setState(state);

    return _.isEmpty(state.errors);
  };

  onValidateForm = (form?: T): boolean => {
    return this._onValidateForm(form);
  };
}
