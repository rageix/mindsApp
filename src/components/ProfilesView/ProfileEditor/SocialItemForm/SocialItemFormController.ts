import FormController from '@/util/FormController';
import { z } from 'zod';
import { ESocialLinkType, ISocialItem } from '@/types/Profile';
import { ChangeEvent } from 'react';

export interface IForm extends ISocialItem {}

export function defaultForm(): IForm {
  return {
    canDelete: true,
    canDisable: true,
    enabled: true,
    fieldName: 'Facebook',
    type: ESocialLinkType.Facebook,
    value: '',
  };
}

const formValidator = () =>
  z
    .object({
      canDelete: z.boolean(),
      canDisable: z.boolean(),
      enabled: z.boolean(),
      fieldName: z.string().optional(),
      type: z.nativeEnum(ESocialLinkType),
      value: z.string(),
    })
    .refine(
      (data) => {
        if (!data.enabled) {
          return true;
        }
        return data.enabled && data.value.length > 0;
      },
      {
        path: ['value'],
        message: 'An active field must not be empty',
      },
    ) satisfies z.ZodType<IForm>;

export default class SocialItemFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();
  formValidator = formValidator;

  onChangeEnabled = () => {
    this.onChangeForm({ enabled: !this.form.enabled });
  };

  onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ value: e.target.value });
  };
}
