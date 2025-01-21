// import { jsPDF } from 'jspdf';
import Button from '@/components/Buttton';
import { AArrowUp, MinusIcon, PlusIcon } from 'lucide-react';
import roundTo2Places from '@/util/RoundTo2Place';
import { limitNumberWithinRange } from '@/util/LimitNumberWithinRange';

interface IProps {
  value: number;
  onChange: (value: number) => void;
}

export default function LineHeightPicker({ value, onChange }: IProps) {
  function onClick(value: number) {
    onChange(roundTo2Places(limitNumberWithinRange(value, 0, 2)));
  }

  return (
    <div className="flex gap-x-2 items-end">
      <Button
        variant="link"
        onClick={() => onClick(value - 0.25)}
        isInline
      >
        <MinusIcon />
      </Button>
      <div
        title="Line Height"
        className="flex flex-col w-8"
      >
        <div className="flex justify-center">
          <AArrowUp />
        </div>
        <div className="text-center">{value}</div>
      </div>
      <Button
        variant="link"
        onClick={() => onClick(value + 0.25)}
        isInline
      >
        <PlusIcon />
      </Button>
    </div>
  );
}
