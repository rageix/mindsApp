import { ISelectOption } from '@/types/SelectOption';
import { ETab } from '@/types/ImageEditor';
import ImageEditorController from '@/components/ImageEditor/ImageEditorController';
import Button from '@/components/Buttton';
import { cn } from '@/util/Cn';
import { useMemo } from 'react';
import Select from '@/components/Select';

const TAB_OPTIONS: ISelectOption<ETab>[] = [
  {
    key: String(ETab.Layers),
    value: ETab.Layers,
    label: 'Layers',
  },
  {
    key: String(ETab.Settings),
    value: ETab.Settings,
    label: 'Settings',
  },
  {
    key: String(ETab.History),
    value: ETab.History,
    label: 'History',
  },
];

interface IProps {
  controller: ImageEditorController;
}

export default function Tabs({ controller }: IProps) {
  const { tab } = controller.state;
  const selected = useMemo(
    () => TAB_OPTIONS.find((v) => v.value === tab),
    [tab],
  );

  return (
    <div>
      <div className="grid grid-cols-1 sm:hidden">
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <Select<ETab, unknown>
          options={TAB_OPTIONS}
          value={selected}
          onChange={(option) => controller.onClickTab(option.value)}
        />
      </div>
      <div className="hidden sm:block">
        <nav
          aria-label="Tabs"
          className="flex space-x-4"
        >
          {TAB_OPTIONS.map((v) => (
            <Button
              key={v.key}
              variant="gray"
              className={cn(
                tab === v.value
                  ? '!bg-gray-500': null,
                // 'rounded-md px-3 py-2 text-sm font-medium',
              )}
              onClick={() => controller.onClickTab(v.value)}
            >
              {v.label}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
}
