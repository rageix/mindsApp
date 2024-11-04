import FormController from '@/util/FormController';
import { z } from 'zod';
import { ChangeEvent } from 'react';
import { zStringRequiredValidator } from '@/util/Validators';
import { MongoId } from '@/types/MongoDocument';
import { ICard } from '@/types/Card';
import { postApiCardsFindOne } from '@/requests/api/cards/findOne';

export interface IForm extends ICard {}

export function defaultForm(): IForm {
  return {
    teamId: '',
    name: 'New Card',
    profileId: '',
  };
}

const formValidator = () =>
  z.object({
    teamId: z.string(),
    name: zStringRequiredValidator,
    profileId: zStringRequiredValidator,
  }) satisfies z.ZodType<IForm>;

export default class CardFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();
  formValidator = formValidator;

  loadId = async (_id: MongoId, teamId: MongoId) => {
    const result = await postApiCardsFindOne({ _id, teamId });

    if (result) {
      this.setForm(result);
    }
  };

  onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ name: e.target.value });
  };

  onChangeProfile = (_id: MongoId | null) => {
    this.onChangeForm({ profileId: _id || undefined });
  };
}
