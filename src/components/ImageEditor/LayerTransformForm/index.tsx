import FormLabel from '@/components/FormLabel';
import Form from '@/components/Form';
import ImageEditorController from '@/components/ImageEditor/ImageEditorController';
import { ILayerTransform } from '@/types/LayerTransform';
import Input from '@/components/Input';
import Button from '@/components/Buttton';
import { LinkIcon, UnlinkIcon } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import _ from 'lodash';
import { roundTo1Place } from '@/util/RoundTo1Place';

type TKeyOfILayerTransform = keyof ILayerTransform;
const LINKED_SIZE: TKeyOfILayerTransform[] = ['width', 'height'];

interface IActiveField<T> {
  field: keyof T | null;
  value: string;
}

interface IProps {
  controller: ImageEditorController;
}

export default function LayerTransformForm({ controller }: IProps) {
  // const [linkPosition, setLinkPosition] = useState(false);
  const [linkSize, setLinkSize] = useState(false);
  const [activeField, setActiveField] = useState<IActiveField<ILayerTransform>>(
    { field: null, value: '' },
  );
  const { transform, selectedLayers } = controller.state;

  function onChangeActiveField(e: ChangeEvent<HTMLInputElement>) {
    console.log('onChangeActiveField', activeField.field);
    if (activeField.field !== null) {
      const newActiveField = { ...activeField, value: e.target.value };
      setActiveField(newActiveField);
    }
  }

  function onSetField(field: keyof ILayerTransform) {
    setActiveField({ field, value: String(controller.state.transform[field]) });
  }

  function onBlurField() {
    if (activeField.field !== null) {
      const newTransform = { ...transform };
      const newValue = _.toNumber(activeField.value);
      if (isNaN(newValue)) {
        return;
      }

      newTransform[activeField.field] = roundTo1Place(newValue);
      if (
        linkSize &&
        LINKED_SIZE.findIndex((v) => v === activeField.field) > -1
      ) {
        const ratio = newValue / transform[activeField.field];

        if (activeField.field === 'width') {
          newTransform.height = roundTo1Place(newTransform.height * ratio);
        } else {
          newTransform.width = roundTo1Place(newTransform.width * ratio);
        }
      }
      controller.onTransformSelection(newTransform);
    }
  }

  const disabled = selectedLayers.length === 0;

  return (
    <Form
      onSubmit={(e) => e.preventDefault()}
      className="!space-y-3"
    >
      <div className="flex gap-x-3">
        <div className="grow">
          <FormLabel<ILayerTransform> field="x">X</FormLabel>
          <Input<ILayerTransform>
            field="x"
            type="number"
            onClick={() => onSetField('x')}
            value={activeField.field === 'x' ? activeField.value : transform.x}
            onBlur={onBlurField}
            onChange={onChangeActiveField}
            onFocus={() => onSetField('x')}
            disabled={disabled}
          />
        </div>
        {/*<div className="shrink-0 flex items-end">*/}
        {/*  <Button*/}
        {/*    variant="blue"*/}
        {/*    onClick={() => setLinkPosition(!linkPosition)}*/}
        {/*    isActive={linkPosition}*/}
        {/*  >*/}
        {/*    {linkPosition ? <LinkIcon /> : <UnlinkIcon />}*/}
        {/*  </Button>*/}
        {/*</div>*/}
        <div className="grow">
          <FormLabel<ILayerTransform> field="y">Y</FormLabel>
          <Input<ILayerTransform>
            field="y"
            type="number"
            onClick={() => onSetField('y')}
            value={activeField.field === 'y' ? activeField.value : transform.y}
            onBlur={onBlurField}
            onChange={onChangeActiveField}
            onFocus={() => onSetField('y')}
            disabled={disabled}
          />
        </div>
      </div>
      <div className="flex gap-x-3">
        <div className="grow">
          <FormLabel<ILayerTransform> field="width">Width</FormLabel>
          <Input<ILayerTransform>
            field="width"
            type="number"
            onClick={() => onSetField('width')}
            value={
              activeField.field === 'width'
                ? activeField.value
                : transform.width
            }
            onBlur={onBlurField}
            onChange={onChangeActiveField}
            onFocus={() => onSetField('width')}
            disabled={disabled}
          />
        </div>
        <div className="shrink-0 flex items-end">
          <Button
            variant="blue"
            onClick={() => setLinkSize(!linkSize)}
            isActive={linkSize}
          >
            <span className="sr-only">
              {linkSize
                ? 'Width and Height Linked'
                : 'Width and Height Unlinked'}
            </span>
            {linkSize ? <LinkIcon /> : <UnlinkIcon />}
          </Button>
        </div>
        <div className="grow">
          <FormLabel<ILayerTransform> field="height">Height</FormLabel>
          <Input<ILayerTransform>
            field="height"
            type="number"
            onClick={() => onSetField('height')}
            value={
              activeField.field === 'height'
                ? activeField.value
                : transform.height
            }
            onBlur={onBlurField}
            onChange={onChangeActiveField}
            onFocus={() => onSetField('height')}
            disabled={disabled}
          />
        </div>
      </div>
      <div className="">
        <div>
          <FormLabel<ILayerTransform> field="angle">Angle</FormLabel>
          <Input<ILayerTransform>
            field="height"
            type="number"
            onClick={() => onSetField('angle')}
            value={
              activeField.field === 'angle'
                ? activeField.value
                : transform.angle
            }
            onBlur={onBlurField}
            onChange={onChangeActiveField}
            onFocus={() => onSetField('angle')}
            disabled={disabled}
          />
        </div>
      </div>
    </Form>
  );
}
