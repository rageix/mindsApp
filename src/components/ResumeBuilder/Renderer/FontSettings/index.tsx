import { MinusIcon, PlusIcon } from 'lucide-react';
import { ISelectOption } from '@/types/SelectOption';
import { EResumeFonts } from '@/types/Resume';
import Select from '@/components/Select';
import StyleController from '@/components/ResumeBuilder/Builder/Sections/StyleController';
import { useMemo } from 'react';
import roundTo2Places from '@/util/RoundTo2Place';
import { limitNumberWithinRange } from '@/util/LimitNumberWithinRange';
import Button from '@/components/Buttton';
import FormLabel from '@/components/FormLabel';
import Tooltip from '@/components/Tooltip';
import TooltipBox from '@/components/TooltipBox';

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

export default function FontSettings({ controller }: IProps) {
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
    <div className="grid grid-cols-2 gap-y-2 gap-x-4 max-w-xl w-full mx-auto">
      <div className="w-full">
        <FormLabel className="flex gap-x-1">
          <span>Font</span>
          <Tooltip size={15}>
            <TooltipBox>
              <div>
                We provide a variety of fonts for your convenience, I encourage
                you to experiment.
              </div>
              <div className="mt-3">Recommendations:</div>
              <ul className="mt-1 list-disc">
                <li>Nunito Sans</li>
                <li>Open Sans</li>
                <li>Work Sans</li>
                <li>Roboto</li>
              </ul>
            </TooltipBox>
          </Tooltip>
        </FormLabel>
        <Select
          options={OPTIONS}
          value={fontOption || null}
          onChange={(option) => controller.onChangeFontFamily(option.value)}
        />
      </div>
      <div className="w-full">
        <FormLabel className="flex gap-x-1">
          <span>Title Font</span>
          <Tooltip size={15}>
            <TooltipBox>
              <div>
                <div>
                  You can create some nice contrast by using a different font
                  for the title. If this is not set then it will use what you
                  have set in the other font field.
                </div>
                <div className="mt-3">Recommendations:</div>
              </div>
              <ul className="mt-1 list-disc">
                <li>Merriweather</li>
                <li>Lora</li>
                <li>PT Serif</li>
              </ul>
            </TooltipBox>
          </Tooltip>
        </FormLabel>
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
      <div className="w-full">
        <FormLabel>Scale</FormLabel>
        <div className="flex gap-x-2 items-center justify-center w-full bg-gray-100 rounded-md px-2 py-1">
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
      <div className="w-full">
        <FormLabel>Line Height</FormLabel>
        <div className="flex gap-x-2 items-center justify-center bg-gray-100 rounded-md px-2 py-1">
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
  );
}
