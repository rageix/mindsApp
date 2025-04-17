import FormController from '@/util/FormController';
import { z } from 'zod';
import { ChangeEvent } from 'react';
import { zStringRequiredValidator } from '@/util/Validators';

export interface IChatInput {
  text: string;
  fileId?: string;
}

export interface IForm extends IChatInput {}

export function defaultForm(): IForm {
  return {
    text: '',
  };
}

const formValidator = () =>
  z.object({
    text: zStringRequiredValidator,
  }) satisfies z.ZodType<IForm>;

export default class ChatInputController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();
  formValidator = formValidator;

  onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    this.onChangeForm({ text: e.target.value });
  };

  setText = (text: string) => {
    this.onChangeForm({ text });
  };

  onChangeFile = (fileId: string) => {
    this.onChangeForm({ fileId });
  };

  onResetForm = () => {
    this.setForm(defaultForm());
  };
}
