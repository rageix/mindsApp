import { ZoomIn, ZoomOut } from 'lucide-react';
import Select from '@/components/Select';
import { ISelectOption } from '@/types/SelectOption';
import { useMemo } from 'react';
import { float2Int } from '@/util/Float2Int';

const ZOOM_OPTIONS: ISelectOption<number>[] = [
  {
    key: '400%',
    value: 4,
    label: '400%',
  },
  {
    key: '300%',
    value: 3,
    label: '300%',
  },
  {
    key: '200%',
    value: 2,
    label: '200%',
  },
  {
    key: '175%',
    value: 1.75,
    label: '175%',
  },
  {
    key: '150%',
    value: 1.5,
    label: '150%',
  },
  {
    key: '125%',
    value: 1.25,
    label: '125%',
  },
  {
    key: '100%',
    value: 1,
    label: '100%',
  },
  {
    key: '75%',
    value: 0.75,
    label: '75%',
  },
  {
    key: '50%',
    value: 0.5,
    label: '50%',
  },
  {
    key: '25%',
    value: 0.25,
    label: '25%',
  },
  {
    key: '10%',
    value: 0.1,
    label: '10%',
  },
];

interface IProps {
  scale: number;
  onChange: (arg: number) => void;
  onClickZoomIn: () => void;
  onClickZoomOut: () => void;
}

export default function ZoomControl({
  scale,
  onChange,
  onClickZoomIn,
  onClickZoomOut,
}: IProps) {
  const value: ISelectOption<number> = useMemo(() => {
    const label = float2Int(scale * 100) + '%';
    return {
      key: label,
      value: scale,
      label,
    };
  }, [scale]);

  return (
    <span className="isolate inline-flex rounded-md shadow-sm gap-x-3">
      <button
        type="button"
        className="relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        onClick={onClickZoomOut}
      >
        <span className="sr-only">Zoom Out</span>
        <ZoomOut
          aria-hidden="true"
          className="size-5"
        />
      </button>
      <Select
        className="w-[5.75rem]"
        options={ZOOM_OPTIONS}
        value={value}
        onChange={(option) => onChange(option.value)}
      />
      <button
        type="button"
        className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        onClick={onClickZoomIn}
      >
        <span className="sr-only">Zoom In</span>
        <ZoomIn
          aria-hidden="true"
          className="size-5"
        />
      </button>
    </span>
  );
}
