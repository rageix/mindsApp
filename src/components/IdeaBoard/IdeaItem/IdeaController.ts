import FormController from '@/util/FormController';
import { z } from 'zod';
import { ChangeEvent } from 'react';
import { zStringRequiredValidator } from '@/util/Validators';
import { IIdeaItem } from '@/types/IdeaBoard';

export interface IForm {
  text: string;
}

export function defaultForm(): IForm {
  return {
    text: '',
  };
}

const formValidator = () =>
  z.object({
    text: zStringRequiredValidator,
  }) satisfies z.ZodType<IForm>;

export default class IdeaController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();
  formValidator = formValidator;

  onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    this.onChangeForm({ text: e.target.value });
  };

  setText = (text: string) => {
    this.onChangeForm({ text });
  };

  getValue = (): IIdeaItem => {
    const form = this.getForm();
    return {
      id: this.id,
      text: form.text,
    };
  };
}
