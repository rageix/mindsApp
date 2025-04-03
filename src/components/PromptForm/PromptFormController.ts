import FormController from '@/util/FormController';
import { z } from 'zod';
import { zStringRequiredValidator } from '@/util/Validators';
import { IPromptForm, newIPromptForm } from '@/types/PromptForm';
import { ChangeEvent } from 'react';

export interface IForm extends IPromptForm {}

export function defaultForm(): IForm {
  return newIPromptForm();
}

const formValidator = z.object({
  prompt: zStringRequiredValidator,
}) satisfies z.ZodType<IForm>;

export default class PromptFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();
  formValidator = () => formValidator;

  onChangePrompt = (e: ChangeEvent<HTMLTextAreaElement>) => {
    this.onChangeForm({ prompt: e.target.value });
  };

}
