import FormController from '@/util/FormController';
import {
  dallE2AllowedImageSizes,
  dallE3AllowedImageSizes,
  IOpenAiImageOptions,
  TDallE2Sizes,
  TDallE3Sizes,
  TImageModel,
  TImageQuality,
  TImageSizes,
  TImageStyle,
} from '@/types/OpenAiImagePrompt';
import { ISelectOption } from '@/types/SelectOption';

export interface IForm extends IOpenAiImageOptions {}

export function defaultForm(): IForm {
  return {
    model: 'dall-e-3',
    size: '1024x1024',
    quality: 'standard',
    style: 'natural',
  };
}

// const formValidator = z.object({
//   name: z.string().min(1),
//   pinned: z.boolean(),
// }) satisfies z.ZodType<IForm>;

export default class OpenAiImageSettingsFormController extends FormController<IForm> {
  defaultForm = defaultForm();
  // formValidator = () => true;

  onChangeModel = (option: ISelectOption<TImageModel>) => {
    const value = option.value;
    const update: Partial<IOpenAiImageOptions> = { model: value };

    if (
      value === 'dall-e-3' &&
      !dallE3AllowedImageSizes.includes(<TDallE3Sizes>this.form.size)
    ) {
      update.size = '1024x1024';
    }

    if (
      value === 'dall-e-2' &&
      !dallE2AllowedImageSizes.includes(<TDallE2Sizes>this.form.size)
    ) {
      update.size = '1024x1024';
    }

    this.onChangeForm(update);
  };

  onChangeSize = (option: ISelectOption<TImageSizes>) => {
    this.onChangeForm({ size: option.value });
  };

  onChangeQuality = (option: ISelectOption<TImageQuality>) => {
    this.onChangeForm({ quality: option.value });
  };

  onChangeStyle = (option: ISelectOption<TImageStyle>) => {
    this.onChangeForm({ style: option.value });
  };
}
