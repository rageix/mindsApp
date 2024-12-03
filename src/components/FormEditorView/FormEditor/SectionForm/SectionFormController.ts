import FormController from '@/util/FormController';
import { z } from 'zod';
import { ChangeEvent } from 'react';
import { ISection } from '@/types/Form';
import { nanoid } from 'nanoid';
import { sectionSchema } from '@/common/DynamicForms';

export interface IForm extends ISection {}

export function defaultForm(): IForm {
  return {
    key: nanoid(),
    heading: '',
    description: '',
    fields: [],
  };
}

const formValidator = () =>
  sectionSchema.extend({
    fields: z.array(z.any()),
  }) satisfies z.ZodType<IForm>;

export default class SectionFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = this.resetForm;
  formValidator = formValidator;

  onChangeHeading = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    this.onChangeForm({ heading: e.target.value });
  };

  onChangeDescription = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    this.onChangeForm({ description: e.target.value });
  };
}
