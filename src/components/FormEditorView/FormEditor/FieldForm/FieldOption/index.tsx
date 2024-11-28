import TableOptionsMenu from '@/components/TableOptionsMenu';
import MenuItemButton from '@/components/MenuItemButton';
import Input from '@/components/Input';
import { IFieldOption } from '@/types/Form';
import { ChangeEvent } from 'react';

interface IProps {
  option: IFieldOption;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickMoveUp: () => void;
  onClickMoveDown: () => void;
  onClickDelete: () => void;
}

export default function FieldOption({
  option,
  onChange,
  onClickDelete,
  onClickMoveUp,
  onClickMoveDown,
}: IProps) {
  return (
    <div className="flex items-center text-white">
      <div className="grow block text-sm font-medium leading-6">
        <Input<IFieldOption>
          field="value"
          value={option.value}
          onChange={onChange}
          className="!mt-0"
        />
      </div>
      <TableOptionsMenu className="shrink-0 w-10">
        <MenuItemButton onClick={onClickMoveUp}>Move Up</MenuItemButton>
        <MenuItemButton onClick={onClickMoveDown}>Move Down</MenuItemButton>
        <MenuItemButton onClick={onClickDelete}>Delete</MenuItemButton>
      </TableOptionsMenu>
    </div>
  );
}
