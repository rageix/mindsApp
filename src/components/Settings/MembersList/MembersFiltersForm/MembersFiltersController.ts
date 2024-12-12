import FormController from '@/util/FormController';
import { ChangeEvent } from 'react';
import { IMemberFilters } from '@/requests/api/members/paginated/schema';
import { EMemberRole } from '@/types/Member';

export interface IForm extends Pick<IMemberFilters, 'text' | 'role'> {}

export function defaultForm(): IForm {
  return {
    text: '',
  };
}

export default class MembersFiltersController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ text: e.target.value });
  };

  onChangeRole = (value: EMemberRole | null) => {
    this.onChangeForm({ role: value });
  };
}
