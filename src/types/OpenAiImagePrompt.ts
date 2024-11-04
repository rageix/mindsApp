/**
 * The size of the generated images. Must be one of `256x256`, `512x512`, or
 * `1024x1024` for `dall-e-2`. Must be one of `1024x1024`, `1792x1024`, or
 * `1024x1792` for `dall-e-3` models.
 */

export type TDallE2Sizes = '256x256' | '512x512' | '1024x1024';
export type TDallE3Sizes = '1024x1024' | '1792x1024' | '1024x1792';

export type TImageSizes = TDallE2Sizes | TDallE3Sizes;

export const dallE2AllowedImageSizes: TDallE2Sizes[] = [
  '256x256',
  '512x512',
  '1024x1024',
];

export const dallE3AllowedImageSizes: TDallE3Sizes[] = [
  '1024x1024',
  '1792x1024',
  '1024x1792',
];

export type TImageQuality = 'standard' | 'hd';

export type TImageStyle = 'vivid' | 'natural' | null;

export type TImageModel = 'dall-e-2' | 'dall-e-3';

export interface IOpenAiImageOptions {
  model: TImageModel;
  size: TImageSizes;
  quality: TImageQuality;
  style: TImageStyle;
}
