import FormController from '@/util/FormController';
import { z } from 'zod';
import { EMemberRole, IMember } from '@/types/Member';
import { ChangeEvent } from 'react';
import { ISelectOption } from '@/types/SelectOption';

export interface IForm extends IMember {}

export function defaultForm(): IForm {
  return {
    enabled: true,
    teamId: '',
    role: EMemberRole.Member,
    inviteEmail: '',
  };
}

const formValidator = () =>
  z.object({
    enabled: z.boolean(),
    teamId: z.string(),
    role: z.nativeEnum(EMemberRole),
    inviteEmail: z.string().email(),
  }) satisfies z.ZodType<IForm>;

export default class MemberFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();
  formValidator = formValidator;

  onChangeRole = (option: ISelectOption<EMemberRole>) => {
    this.onChangeForm({ role: option.value });
  };

  onChangeInviteEmail = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ inviteEmail: e.target.value });
  };
}
