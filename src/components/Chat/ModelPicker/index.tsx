import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { cn } from '@/util/Cn';
import { EModel } from '@/types/Model';
import { ISelectOption } from '@/types/SelectOption';
import ModelPickerMenuItem from '@/components/Chat/ModelPicker/ModelPickerMenuItem';
import { ChevronDownIcon } from 'lucide-react';

const modelOptions: ISelectOption<EModel>[] = [
  {
    key: EModel.ChatGPT4o,
    value: EModel.ChatGPT4o,
    label: 'ChatGPT 4o',
  },
  {
    key: EModel.Gemini2,
    value: EModel.Gemini2,
    label: 'Gemini 2.0',
  },
  {
    key: EModel.Claude37Sonnet,
    value: EModel.Claude37Sonnet,
    label: 'Claude 3.7 Sonnet',
  },
  {
    key: EModel.NovaPro,
    value: EModel.NovaPro,
    label: 'Amazon Nova Pro',
  },
];

interface IProps {
  value: EModel;
  onChange: (value: EModel) => void;
}

export default function ModelPicker({ value, onChange }: IProps) {
  const [model, setModel] = useState<ISelectOption<EModel>>(modelOptions[0]);

  useEffect(() => {
    const option = modelOptions.find((v) => v.value === value);

    if (option) {
      setModel(option);
    }
  }, [value]);

  return (
    <>
      <Menu
        as="div"
        className="relative"
      >
        <MenuButton className="flex items-center cursor-pointer">
          <div className="flex w-56 gap-x-3 rounded-md p-3 bg-gray-100 hover:bg-gray-50">
            <span className="sr-only">Open user menu</span>
            <div className="text-left wrap-break-word grow">{model.label}</div>
            <div className="shrink-0">
              <ChevronDownIcon />
            </div>
          </div>
        </MenuButton>
        <MenuItems
          transition
          className={cn(
            'absolute right-0 mt-1 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in z-10',
          )}
          anchor="bottom start"
        >
          {modelOptions.map((v) => (
            <ModelPickerMenuItem
              key={v.key}
              value={v}
              isSelected={v.value === model.value}
              onClick={() => onChange(v.value)}
            />
          ))}
        </MenuItems>
      </Menu>
    </>
  );
}
