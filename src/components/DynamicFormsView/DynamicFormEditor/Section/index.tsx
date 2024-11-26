import SectionController from '@/components/DynamicFormsView/DynamicFormEditor/Section/SectionController';
import Button from '@/components/Buttton';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { cn } from '@/util/Cn';
import MenuItemButton from '@/components/MenuItemButton';
import { EFieldType } from '@/types/DynamicForm';
import Field from '@/components/DynamicFormsView/DynamicFormEditor/Field';
import { PlusIcon } from 'lucide-react';
import TableOptionsMenu from '@/components/TableOptionsMenu';
import SectionEditor from '@/components/DynamicFormsView/DynamicFormEditor/SectionEditor';

interface IProps {
  controller: SectionController;
  onClickDelete: () => void;
}

export default function Section({
  controller,
  onClickDelete,
}: IProps) {
  controller.useController();

  const {state} = controller;

  return (
    <div className="overflow-hidden bg-gray-700 px-4 py-4 shadow rounded-md sm:px-6">
      <div className="flex items-center">
        <div className="grow block text-sm font-medium leading-6">{state.section.heading}</div>
        <TableOptionsMenu className="shrink-0">
          <MenuItemButton onClick={controller.onClickEdit}>Edit</MenuItemButton>
          <MenuItemButton onClick={onClickDelete}>Delete</MenuItemButton>
        </TableOptionsMenu>
      </div>
      <div>
        <ul
          role="list"
          className="py-6 space-y-3"
        >
          {controller.state.fieldControllers.map((v, i) => (
            <li
              key={v.id}
              className="px-6 py-4 overflow-hidden rounded-md bg-gray-800 shadow"
            >
              <Field
                controller={v}
                onClickDelete={() => controller.onRemoveField(i)}
              />
            </li>
          ))}
        </ul>
        <Menu
          as="div"
          className="flex justify-end"
        >
          <MenuButton>
            <span className="sr-only">Open options</span>
            <Button variant="blue">
              <PlusIcon className="me-1" />
              <span>Add Field</span>
            </Button>
          </MenuButton>
          <MenuItems
            transition
            className={cn(
              'absolute z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in',
            )}
            anchor={{ to: 'bottom' }}
          >
            <MenuItemButton
              onClick={() => controller.onAddField(EFieldType.Input)}
            >
              Input
            </MenuItemButton>
            <MenuItemButton
              onClick={() => controller.onAddField(EFieldType.Text)}
            >
              Text
            </MenuItemButton>
            <MenuItemButton
              onClick={() => controller.onAddField(EFieldType.File)}
            >
              File
            </MenuItemButton>
            <MenuItemButton
              onClick={() => controller.onAddField(EFieldType.Date)}
            >
              Date
            </MenuItemButton>
            <MenuItemButton
              onClick={() => controller.onAddField(EFieldType.Select)}
            >
              Select
            </MenuItemButton>
            <MenuItemButton
              onClick={() => controller.onAddField(EFieldType.Rating)}
            >
              Rating
            </MenuItemButton>
          </MenuItems>
        </Menu>
      </div>
      <SectionEditor
        controller={controller.state.sectionFormController}
        open={controller.state.showEditor}
        onClose={controller.onCloseEditor}
      />
    </div>
  );
}
