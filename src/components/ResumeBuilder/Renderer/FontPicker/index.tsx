import { MinusIcon, PlusIcon } from 'lucide-react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ISelectOption } from '@/types/SelectOption';
import { EResumeFonts } from '@/types/Resume';
import Select from '@/components/Select';
import StyleController from '@/components/ResumeBuilder/Builder/Sections/StyleController';
import { useMemo } from 'react';
import roundTo2Places from '@/util/RoundTo2Place';
import { limitNumberWithinRange } from '@/util/LimitNumberWithinRange';
import Button from '@/components/Buttton';
import FormLabel from '@/components/FormLabel';

function makeOption(font: EResumeFonts): ISelectOption<EResumeFonts> {
  return {
    key: font,
    value: font,
    label: font,
  };
}

const OPTIONS: ISelectOption<EResumeFonts>[] = Object.entries(EResumeFonts).map(
  (v) => makeOption(v[1]),
);

interface IProps {
  controller: StyleController;
}

export default function FontPicker({ controller }: IProps) {
  const { fontFamily, titleFontFamily, scale, lineHeight } =
    controller.getForm();

  const fontOption = useMemo(
    () => OPTIONS.find((v) => v.value === fontFamily),
    [fontFamily],
  );

  const titleFontOption = useMemo(
    () => OPTIONS.find((v) => v.value === titleFontFamily),
    [titleFontFamily],
  );

  function onChangeScale(value: number) {
    controller.onChangeScale(
      roundTo2Places(limitNumberWithinRange(value, 0.25, 2)),
    );
  }

  function onChangeLineHeight(value: number) {
    controller.onChangeLineHeight(
      roundTo2Places(limitNumberWithinRange(value, 0.25, 2)),
    );
  }

  return (
    <Popover className="relative">
      <PopoverButton as="div">
        <Button
          variant="blue"
          // title="Font Size"
          // className="flex justify-center items-center rounded-md hover:bg-blue-100"
          isInline
        >
          {/*{fontOption?.label || 'None selected'}*/}
          Font
        </Button>
      </PopoverButton>
      <PopoverPanel
        anchor="bottom"
        className="mt-1 overflow-hidden"
      >
        <div className="flex flex-col gap-y-2 bg-white rounded-md px-2 py-4 border border-gray-200 min-w-[15rem]">
          <div className="w-full">
            <FormLabel>Font</FormLabel>
            <Select
              options={OPTIONS}
              value={fontOption || null}
              onChange={(option) => controller.onChangeFontFamily(option.value)}
            />
          </div>
          <div className="w-full">
            <FormLabel>Title Font</FormLabel>
            <Select
              options={OPTIONS}
              value={titleFontOption || null}
              isClearable
              onChange={(option) =>
                controller.onChangeTitleFontFamily(option.value)
              }
              onClickClear={() => controller.onChangeTitleFontFamily(null)}
            />
          </div>
          <div className="flex gap-x-2">
            <div className="flex flex-col gap-y-2 bg-gray-100 rounded-md px-2 py-4">
              <div className="text-center text-sm font-medium leading-6">
                Scale
              </div>
              <div className="flex gap-x-2 items-center">
                <Button
                  variant="link"
                  onClick={() => onChangeScale(scale - 0.05)}
                  isInline
                >
                  <MinusIcon />
                </Button>
                <div
                  title="Font Size"
                  className="flex justify-center w-8"
                >
                  <div>{scale}</div>
                </div>
                <Button
                  variant="link"
                  onClick={() => onChangeScale(scale + 0.05)}
                  isInline
                >
                  <PlusIcon />
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-y-3 bg-gray-100 rounded-md px-2 py-4">
              <div className="text-center text-sm font-medium leading-6">
                Line Height
              </div>
              <div className="flex gap-x-2 items-center">
                <Button
                  variant="link"
                  onClick={() => onChangeLineHeight(lineHeight - 0.25)}
                  isInline
                >
                  <MinusIcon />
                </Button>
                <div
                  title="Font Size"
                  className="flex justify-center w-8"
                >
                  <div>{lineHeight}</div>
                </div>
                <Button
                  variant="link"
                  onClick={() => onChangeLineHeight(lineHeight + 0.25)}
                  isInline
                >
                  <PlusIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
