import { useState } from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import SimpleColors from '@/components/ResumeBuilder/Renderer/ColorPicker/SimpleColors';
import { ISelectOption } from '@/types/SelectOption';
import Select from '@/components/Select';
import ColorController from '@/components/Color/ColorController';
import HslView from '@/components/Color/HslView';
import RgbView from '@/components/Color/RgbView';
import HexView from '@/components/Color/HexView';
import PickerView from '@/components/Color/PickerView';
import SwatchView from '@/components/Color/SwatchView';
import Button from '@/components/Buttton';

enum EViews {
  Simple,
  Swatches,
  ColorPicker,
  HSL,
  RGB,
  Hex,
}

const VIEW_OPTIONS: ISelectOption<EViews>[] = [
  {
    key: String(EViews.Simple),
    value: EViews.Simple,
    label: 'Simple',
  },
  {
    key: String(EViews.Swatches),
    value: EViews.Swatches,
    label: 'Swatches' + '',
  },
  {
    key: String(EViews.ColorPicker),
    value: EViews.ColorPicker,
    label: 'Color Picker',
  },
  {
    key: String(EViews.RGB),
    value: EViews.RGB,
    label: 'RGB',
  },
  {
    key: String(EViews.HSL),
    value: EViews.HSL,
    label: 'HSL',
  },
  {
    key: String(EViews.Hex),
    value: EViews.Hex,
    label: 'Hex',
  },
];

interface IProps {
  controller: ColorController;
  title: string;
}

export default function ColorPicker({ controller, title }: IProps) {
  const [view, setView] = useState<ISelectOption<EViews>>(VIEW_OPTIONS[0]);
  controller.useController();

  const color = controller.state;

  return (
    <Popover className="relative flex">
      <PopoverButton as="div">
        <div className="flex gap-x-2 items-center">
        <div
          className="size-9 rounded-full border-2 border-gray-900 shrink-0"
          style={{ backgroundColor: color.hex }}
          title={title}
          aria-label={title}
        />
          <Button variant="link">Change</Button>
        </div>
      </PopoverButton>
      <PopoverPanel
        anchor="bottom"
        className="mt-1 overflow-hidden"
      >
        <div className="flex flex-col gap-y-3 bg-white rounded-md px-2 py-4 border border-gray-200 min-w-[15rem] overflow-hidden">
          <div className="flex justify-end">
            <div className="min-w-44 w-full">
              {/*<FormLabel>{title}</FormLabel>*/}
              <div className="text-center">{title}</div>
              <Select
                options={VIEW_OPTIONS}
                value={view}
                onChange={setView}
              />
            </div>
          </div>
          {view.value === EViews.Simple && (
            <SimpleColors
              value={color.hex}
              onChange={controller.onChangeHex}
            />
          )}
          {view.value === EViews.HSL && (
            <HslView
              h={color.h}
              s={color.s}
              l={color.l}
              onChangeH={controller.onChangeH}
              onChangeS={controller.onChangeS}
              onChangeL={controller.onChangeL}
            />
          )}
          {view.value === EViews.RGB && (
            <RgbView
              r={color.r}
              g={color.g}
              b={color.b}
              onChangeR={controller.onChangeR}
              onChangeG={controller.onChangeG}
              onChangeB={controller.onChangeB}
            />
          )}
          {view.value === EViews.Hex && (
            <HexView
              hex={color.hex}
              onChange={controller.onChangeHex}
            />
          )}
          {view.value === EViews.ColorPicker && (
            <PickerView
              h={color.h}
              s={color.s}
              l={color.l}
              onChange={controller.onChangeHSL}
            />
          )}
          {view.value === EViews.Swatches && (
            <SwatchView
              onChange={(hex) => controller.onChangeHex(hex, color.opacity)}
            />
          )}
        </div>
      </PopoverPanel>
    </Popover>
  );
}
