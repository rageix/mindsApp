import FormController from '@/util/FormController';
import { z } from 'zod';
import { EAvatarItemType, IAvatarItem } from '@/types/Profile';
import { MongoId } from '@/types/MongoDocument';

export interface IForm extends IAvatarItem {}

export function defaultForm(): IForm {
  return {
    canDelete: true,
    canDisable: true,
    enabled: true,
    fieldName: 'You',
    type: EAvatarItemType.Image,
    value: [],
  };
}

const formValidator = () =>
  z
    .object({
      canDelete: z.boolean(),
      canDisable: z.boolean(),
      enabled: z.boolean(),
      fieldName: z.string().optional(),
      type: z.nativeEnum(EAvatarItemType),
      value: z.array(z.string()),
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

export default class AvatarItemFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();
  formValidator = formValidator;

  onChangeEnabled = () => {
    this.onChangeForm({ enabled: !this.form.enabled });
  };

  onSetValue = (ids: MongoId[]) => {
    this.onChangeForm({ value: ids });
  };
}
