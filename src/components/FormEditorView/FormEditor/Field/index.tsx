import TableOptionsMenu from '@/components/TableOptionsMenu';
import MenuItemButton from '@/components/MenuItemButton';
import FormDrawer from '@/components/FormDrawer';
import FieldController
  from "@/components/FormEditorView/FormEditor/Field/FieldController";
import FieldForm from "@/components/FormEditorView/FormEditor/FieldForm";

interface IProps {
  controller: FieldController;
  onClickDelete: () => void;
  onClickMoveUp: () => void;
  onClickMoveDown: () => void;
}

export default function Field({ controller, onClickDelete, onClickMoveUp, onClickMoveDown }: IProps) {
  controller.useController();

  return (
    <div className="flex items-center">
      <div className="grow block text-sm font-medium leading-6">
        {controller.state.field.label}
      </div>
      <TableOptionsMenu className="shrink-0">
        <MenuItemButton onClick={controller.onClickEdit}>Edit</MenuItemButton>
        <MenuItemButton onClick={onClickMoveUp}>Move Up</MenuItemButton>
        <MenuItemButton onClick={onClickMoveDown}>Move Down</MenuItemButton>
        <MenuItemButton onClick={onClickDelete}>Delete</MenuItemButton>
      </TableOptionsMenu>
      <FormDrawer
        open={controller.state.showEditor}
        onClose={() => null}
        title="Edit Field"
      >
        <FieldForm
          controller={controller.state.formController}
          onUpdate={controller.onCloseEditor}
        />
      </FormDrawer>
    </div>
  );
}
