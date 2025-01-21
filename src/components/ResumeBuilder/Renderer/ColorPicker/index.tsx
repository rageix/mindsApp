// import { jsPDF } from 'jspdf';
import { useState } from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import SimpleColors from '@/components/ResumeBuilder/Renderer/ColorPicker/SimpleColors';
import { ISelectOption } from '@/types/SelectOption';
import Select from '@/components/Select';

enum ETabs {
  Simple,
  Pallets,
  ColorPicker,
  HSL,
  Hex,
}

const TAB_OPTIONS: ISelectOption<ETabs>[] = [
  {
    key: String(ETabs.Simple),
    value: ETabs.Simple,
    label: 'Simple',
  },
  {
    key: String(ETabs.Pallets),
    value: ETabs.Pallets,
    label: 'Pallets',
  },
  {
    key: String(ETabs.ColorPicker),
    value: ETabs.ColorPicker,
    label: 'Color Picker',
  },
  {
    key: String(ETabs.HSL),
    value: ETabs.HSL,
    label: 'HSL',
  },
  {
    key: String(ETabs.Hex),
    value: ETabs.Hex,
    label: 'Hex',
  },
];

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ColorPicker({ value, onChange }: IProps) {
  // const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<ISelectOption<ETabs>>(TAB_OPTIONS[0]);

  // function onClick(value: number) {
  //   // onChange(roundTo2Places(limitNumberWithinRange(value, 12, 32)));
  // }

  return (
    <Popover className="relative">
      <PopoverButton>
        <div
          className="size-10 rounded-full border-2 border-gray-900"
          style={{ backgroundColor: value }}
        />
      </PopoverButton>
      <PopoverPanel anchor="bottom" className="mt-1">
        <div className="flex flex-col gap-y-3 bg-white rounded-md px-2 py-4 border border-gray-200">
          <div className="flex justify-end">
            <div className="w-44">
              <Select
                options={TAB_OPTIONS}
                value={tab}
                onChange={setTab}
              />
            </div>
          </div>
          {tab.value === ETabs.Simple && (
            <SimpleColors
              value={value}
              onChange={onChange}
            />
          )}
        </div>
      </PopoverPanel>
    </Popover>
  );
}
