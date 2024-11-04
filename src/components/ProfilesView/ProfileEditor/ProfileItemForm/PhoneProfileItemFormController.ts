import BaseProfileItemFormController from '@/components/ProfilesView/ProfileEditor/ProfileItemForm/BaseProfileItemFormController';
import z from 'zod';
import { EProfileItemType, IProfileItem } from '@/types/Profile';
import _ from 'lodash';

const formValidator = (form: IProfileItem) =>
  z.object({
    canDelete: z.boolean(),
    canDisable: z.boolean(),
    enabled: z.boolean(),
    type: z.nativeEnum(EProfileItemType),
    value: z.string().refine(
      (value) => {
        if (!form.enabled) {
          return true;
        }
        return form.enabled && !_.isEmpty(value);
      },
      {
        message: 'An active field must not be empty',
      },
    ),
    label: z.string(),
  }) satisfies z.ZodType<IProfileItem>;

export default class PhoneProfileItemFormController extends BaseProfileItemFormController {
  formValidator = formValidator;
}
