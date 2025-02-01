import { ISelectOption } from '@/types/SelectOption';
import { ETemplate } from '@/types/Resume';
import Select from '@/components/Select';
import StyleController from '@/components/ResumeBuilder/Builder/Sections/StyleController';
import { useMemo } from 'react';
import Button from '@/components/Buttton';

const OPTIONS: ISelectOption<ETemplate>[] = Object.entries(ETemplate).map(
  (v) => {
    const value = v[1];
    return {
      key: value,
      value: value,
      label: value,
    };
  },
);

interface IProps {
  controller: StyleController;
}

export default function TemplatePicker({ controller }: IProps) {
  const { template } = controller.getForm();

  const templateIndex = useMemo(
    () => OPTIONS.findIndex((v) => v.value === template),
    [template],
  );

  const templateOption = templateIndex > -1 ? OPTIONS[templateIndex] : null;

  function onClickNext() {
    let newIndex = templateIndex + 1;

    if (newIndex > OPTIONS.length - 1) {
      newIndex = 0;
    }

    controller.onChangeTemplate(OPTIONS[newIndex].value);
  }

  function onClickPrev() {
    let newIndex = templateIndex - 1;

    if (newIndex < 0) {
      newIndex = OPTIONS.length - 1;
    }

    controller.onChangeTemplate(OPTIONS[newIndex].value);
  }

  return (
    <div className="flex items-center gap-x-2 justify-center">
      <div>
        <Button
          variant="link"
          onClick={onClickPrev}
        >
          Prev
        </Button>
      </div>
      <div>
        <Select
          options={OPTIONS}
          value={templateOption}
          onChange={(option) => controller.onChangeTemplate(option.value)}
        />
      </div>
      <div>
        <Button
          variant="link"
          onClick={onClickNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
