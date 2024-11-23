import FieldController from '@/components/DynamicFormsView/DynamicFormEditor/Field/FieldController';
import TableOptionsMenu from "@/components/TableOptionsMenu";
import MenuItemButton from "@/components/MenuItemButton";

interface IProps {
  controller: FieldController;
  onClickDelete: () => void;
}

export default function Field({ controller, onClickDelete }: IProps) {
  controller.useController();

  return <div className="flex items-center text-white">
    <div className="grow block text-sm font-medium leading-6">
      {controller.form.type}
    </div>
    <TableOptionsMenu className="shrink-0">
      <MenuItemButton onClick={() => null}>
        Edit
      </MenuItemButton>
      <MenuItemButton onClick={onClickDelete}>
        Delete
      </MenuItemButton>
    </TableOptionsMenu>
  </div>
}
