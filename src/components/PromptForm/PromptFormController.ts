import FormController from '@/util/FormController';
import z from 'zod';
import { ChangeEvent } from 'react';

export interface IForm {
  prompt: string;
}

export function defaultForm(): IForm {
  return {
    prompt: '',
  };
}

const formValidator = z.object({
  prompt: z.string().min(1),
}) satisfies z.ZodType<IForm>;

export default class PromptFormController extends FormController<IForm> {
  defaultForm = defaultForm();
  formValidator = () => formValidator;

  onChangePrompt = (e: ChangeEvent<HTMLTextAreaElement>) => {
    this.onChangeForm({ prompt: e.target.value });
  };
}
