import SectionController from '@/components/DynamicFormsView/DynamicFormEditor/Section/SectionController';
import Button from '@/components/Buttton';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { cn } from '@/util/Cn';
import MenuItemButton from '@/components/MenuItemButton';
import { EFieldType } from '@/types/DynamicForm';
import Field from '@/components/DynamicFormsView/DynamicFormEditor/Field';

interface IProps {
  controller: SectionController;
}

export default function Section({ controller }: IProps) {
  controller.useController();

  return (
    <div className="overflow-hidden bg-white px-4 py-4 shadow sm:rounded-md sm:px-6">
      <div className="overflow-hidden rounded-md bg-white shadow">
        <div>
          <Menu
            as="div"
            className="flex justify-end"
          >
            <MenuButton className="-m-2.5 block p-2.5 text-gray-400 hover:text-white">
              <span className="sr-only">Open options</span>
              <Button variant="blue">Add Field</Button>
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
        <ul
          role="list"
          className="divide-y divide-gray-200 py-6"
        >
          {controller.form.fieldControllers.map((v) => (
            <li
              key={v.id}
              className="px-6 py-4"
            >
              <Field controller={v} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
