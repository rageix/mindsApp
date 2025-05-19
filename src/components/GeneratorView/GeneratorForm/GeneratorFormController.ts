import { EModel } from '@/types/Model';
import { ChangeEvent } from 'react';

import FormController from '@/util/FormController';
import { z } from 'zod';
import { zStringRequiredValidator } from '@/util/Validators';
import { IGeneratorInput } from '@/types/Generator';

export interface IForm extends IGeneratorInput {}

export function defaultForm(): IForm {
  return {
    count: 10,
    directions: 'different ways to say:',
    text: '',
    models: {
      [EModel.ChatGPT4o]: true,
      [EModel.Gemini2]: true,
      [EModel.Claude37Sonnet]: true,
      [EModel.NovaPro]: true,
    },
  };
}

const formValidator = () =>
  z.object({
    count: z.number(),
    directions: zStringRequiredValidator,
    text: zStringRequiredValidator,
    models: z.object({
      [EModel.ChatGPT4o]: z.boolean(),
      [EModel.Gemini2]: z.boolean(),
      [EModel.Claude37Sonnet]: z.boolean(),
      [EModel.NovaPro]: z.boolean(),
    }),
  }) satisfies z.ZodType<IForm>;

export default class GeneratorFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();
  formValidator = formValidator;

  onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    this.onChangeForm({ text: e.target.value });
  };

  onChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ count: e.target.valueAsNumber });
  };

  onChangeDirections = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ directions: e.target.value });
  };

  onChangeModel = (model: EModel) => {
    const models = { ...this.form.models };
    models[model] = !models[model];
    this.onChangeForm({ models });
  };
}
