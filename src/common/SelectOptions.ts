import { ISelectOption } from '@/types/SelectOption';
import { EMemberRole } from '@/types/Member';

export const roleSelectOptions: ISelectOption<EMemberRole>[] = [
  { key: '1', value: EMemberRole.Member, label: 'Member' },
  { key: '2', value: EMemberRole.Admin, label: 'Admin' },
  { key: '3', value: EMemberRole.Owner, label: 'Owner' },
];
