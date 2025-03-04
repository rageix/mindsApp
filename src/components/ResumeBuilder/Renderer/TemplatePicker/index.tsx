import { ISelectOption } from '@/types/SelectOption';
import { ETemplate } from '@/types/Resume';
import Select from '@/components/Select';
import StyleController from '@/components/ResumeBuilder/Builder/Sections/StyleController';
import { useMemo } from 'react';
import Button from '@/components/Buttton';
import BlurInput from '@/components/BlurInput';
import FormLabel from '@/components/FormLabel';
import Tooltip from '@/components/Tooltip';
import TooltipBox from '@/components/TooltipBox';
import emitter from '@/util/Emitter';

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
  const { template, pagePadding, sectionGap, columnWidth } = controller.form;

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

  function onChangeInputValue() {
    emitter.emitResumeUpdated();
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex max-w-md mx-auto items-center gap-x-2">
        <div className="shrink-0">
          <Button
            variant="link"
            onClick={onClickPrev}
            isInline
          >
            Prev
          </Button>
        </div>
        <div className="grow">
          <Select
            options={OPTIONS}
            value={templateOption}
            onChange={(option) => controller.onChangeTemplate(option.value)}
          />
        </div>
        <div className="shrink-0">
          <Button
            variant="link"
            onClick={onClickNext}
            isInline
          >
            Next
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <div>
          <FormLabel className="flex items-end gap-x-1">
            <div>Page Padding</div>
            <div>
              <Tooltip size={15}>
                <TooltipBox>
                  <div>
                    This is the main padding value that goes around the outside
                    of the page as well as some internal elements. Based on 72
                    Dots Per Inch.
                  </div>
                  <div className="italic font-bold mt-3">Default value: 36</div>
                </TooltipBox>
              </Tooltip>
            </div>
          </FormLabel>
          <BlurInput
            type="number"
            value={String(pagePadding)}
            onChange={controller.onChangePagePadding}
            onChangeInputValue={onChangeInputValue}
          />
        </div>
        <div>
          <FormLabel className="flex items-end gap-x-1">
            <div>Section Gap</div>
            <div>
              <Tooltip size={15}>
                <TooltipBox>
                  <div>
                    This is the vertical distance between sections. Sections are
                    the main content blocks like Employment, Education, Links,
                    etc..
                  </div>
                  <div className="italic font-bold mt-3">Default value: 15</div>
                </TooltipBox>
              </Tooltip>
            </div>
          </FormLabel>
          <BlurInput
            type="number"
            value={String(sectionGap)}
            onChange={controller.onChangeSectionGap}
            onChangeInputValue={onChangeInputValue}
          />
        </div>
        <div>
          <FormLabel className="flex items-end gap-x-1">
            <div>Column Width %</div>
            <div>
              <Tooltip size={15}>
                <TooltipBox>
                  <div>
                    The width of the side column if the template supports it.
                  </div>
                  <div className="italic font-bold mt-3">Default value: 35</div>
                </TooltipBox>
              </Tooltip>
            </div>
          </FormLabel>
          <BlurInput
            type="number"
            value={String(columnWidth)}
            onChange={controller.onChangeColumnWidth}
            onChangeInputValue={onChangeInputValue}
          />
        </div>
      </div>
    </div>
  );
}
