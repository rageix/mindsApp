import FormController from '@/util/FormController';
import { z } from 'zod';
import { ChangeEvent } from 'react';
import { IFormSettings } from "@/types/Form";

export interface IForm extends IFormSettings {}

export function defaultForm(): IForm {
  return {
    completionUrl: '',
    googleAnalyticsId: '',
    postbackUrl: '',
  };
}

const formValidator = () =>
  z.object({
    completionUrl: z.string(),
    googleAnalyticsId: z.string(),
    postbackUrl: z.string(),
  }) satisfies z.ZodType<IForm>;

export default class FormSettingsFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();
  formValidator = formValidator;

  onChangeCompletionUrl = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ completionUrl: e.target.value });
  };

  onChangeGoogleAnalyticsId = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ googleAnalyticsId: e.target.value });
  };

  onChangePostbackUrl = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ postbackUrl: e.target.value });
  };




}
