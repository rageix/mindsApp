import FormController from '@/util/FormController';
import { z } from 'zod';
import { ChangeEvent } from 'react';
import {
  IFormResponsesFilter
} from "@/requests/api/formResponses/paginated/schema";
import { MongoId } from "@/types/MongoDocument";

export interface IForm extends Pick<IFormResponsesFilter, 'text' | 'formId'> {}

export function defaultForm(): IForm {
  return {
    text: '',
    formId: null
  };
}

const formValidator: z.ZodType<IForm> = z.object({
  text: z.string(),
}) satisfies z.ZodType<IForm>;

export default class FormResponsesFilterController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();
  formValidator = () => formValidator;

  onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ text: e.target.value });
  };

  onChangeFormId = (value: MongoId | null) => {
    this.onChangeForm({ formId: value });
  };
}
