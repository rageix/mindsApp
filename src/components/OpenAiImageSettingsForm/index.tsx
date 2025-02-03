import FormErrors from '../FormErrors';
import FormLabel from '@/components/FormLabel';
import Form from '@/components/Form';
import OpenAiImageSettingsFormController, {
  IForm,
} from '@/components/OpenAiImageSettingsForm/OpenAiImageSettingsFormController';
import { ISelectOption } from '@/types/SelectOption';
import {
  TDallE2Sizes,
  TDallE3Sizes,
  TImageModel,
  TImageQuality,
  TImageSizes,
  TImageStyle,
} from '@/types/OpenAiImagePrompt';
import Select from '@/components/Select';
import { useMemo } from 'react';

const imageModelOptions: ISelectOption<TImageModel>[] = [
  {
    key: '1',
    value: 'dall-e-3',
    label: 'DALL·E 3',
  },
  {
    key: '2',
    value: 'dall-e-2',
    label: 'DALL·E 2',
  },
];

const imageQualityOptions: ISelectOption<TImageQuality>[] = [
  {
    key: '1',
    value: 'standard',
    label: 'Standard',
  },
  {
    key: '2',
    value: 'hd',
    label: 'HD',
  },
];

const imageStyleOptions: ISelectOption<TImageStyle>[] = [
  {
    key: '1',
    value: 'vivid',
    label: 'Vivid',
  },
  {
    key: '2',
    value: 'natural',
    label: 'Natural',
  },
];

const dallE2SizeOptions: ISelectOption<TDallE2Sizes>[] = [
  {
    key: '1',
    value: '256x256',
    label: '256x256',
  },
  {
    key: '2',
    value: '512x512',
    label: '512x512',
  },
  {
    key: '3',
    value: '1024x1024',
    label: '1024x1024',
  },
];

const dallE3SizeOptions: ISelectOption<TDallE3Sizes>[] = [
  {
    key: '1',
    value: '1024x1024',
    label: '1024x1024',
  },
  {
    key: '2',
    value: '1792x1024',
    label: '1792x1024',
  },
  {
    key: '3',
    value: '1024x1792',
    label: '1024x1792',
  },
];

interface IProps {
  controller: OpenAiImageSettingsFormController;
  disabled?: boolean;
}

export default function OpenAiImageSettingsForm({
  controller,
  disabled,
}: IProps) {
  controller.useController();
  const { form, state } = controller;

  const modelValue = useMemo(
    () => imageModelOptions.find((v) => v.value === form.model),
    [form.model],
  );

  const styleValue = useMemo(
    () => imageStyleOptions.find((v) => v.value === form.style),
    [form.style],
  );

  const sizeValue = useMemo(() => {
    if (form.model === 'dall-e-3') {
      return dallE3SizeOptions.find((v) => v.value === form.size);
    }
    return dallE2SizeOptions.find((v) => v.value === form.size);
  }, [form.size]);

  const sizeOptions = useMemo(() => {
    if (form.model === 'dall-e-3') {
      return dallE3SizeOptions;
    }
    return dallE2SizeOptions;
  }, [form.model]);

  const qualityValue = useMemo(
    () => imageQualityOptions.find((v) => v.value === form.quality),
    [form.quality],
  );

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <div>
        <FormLabel<IForm> field="model">Model</FormLabel>
        <Select<TImageModel, IForm>
          field="model"
          errors={state.errors}
          options={imageModelOptions}
          value={modelValue || null}
          onChange={controller.onChangeModel}
          disabled={disabled}
        />
        <FormErrors<IForm>
          field="model"
          errors={state.errors}
        />
      </div>
      <div>
        <FormLabel<IForm> field="size">Size</FormLabel>
        <Select<TImageSizes, IForm>
          field="size"
          errors={state.errors}
          options={sizeOptions}
          value={sizeValue || null}
          onChange={controller.onChangeSize}
          disabled={disabled}
        />
        <FormErrors<IForm>
          field="size"
          errors={state.errors}
        />
      </div>
      <div>
        <FormLabel<IForm> field="quality">Quality</FormLabel>
        <Select<TImageQuality, IForm>
          field="quality"
          errors={state.errors}
          options={imageQualityOptions}
          value={qualityValue || null}
          onChange={controller.onChangeQuality}
          disabled={disabled}
        />
        <FormErrors<IForm>
          field="quality"
          errors={state.errors}
        />
      </div>
      <div>
        <FormLabel<IForm> field="quality">Style</FormLabel>
        <Select<TImageStyle, IForm>
          field="style"
          errors={state.errors}
          options={imageStyleOptions}
          value={styleValue || null}
          onChange={controller.onChangeStyle}
          disabled={disabled}
        />
        <FormErrors<IForm>
          field="style"
          errors={state.errors}
        />
      </div>
    </Form>
  );
}
