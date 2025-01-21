// import { jsPDF } from 'jspdf';
import Button from '@/components/Buttton';
import { ALargeSmallIcon, MinusIcon, PlusIcon } from 'lucide-react';
import roundTo2Places from '@/util/RoundTo2Place';
import { limitNumberWithinRange } from '@/util/LimitNumberWithinRange';

interface IProps {
  value: number;
  onChange: (value: number) => void;
}

export default function FontSizePicker({ value, onChange }: IProps) {
  function onClick(value: number) {
    onChange(roundTo2Places(limitNumberWithinRange(value, 12, 32)));
  }

  return (
    <div className="flex gap-x-2 items-end">
      <Button
        variant="link"
        onClick={() => onClick(value - 1)}
        isInline
      >
        <MinusIcon />
      </Button>
      <div
        title="Font Size"
        className="flex flex-col w-8"
      >
        <div className="flex justify-center">
          <ALargeSmallIcon />
        </div>
        <div className="text-center">{value}</div>
      </div>
      <Button
        variant="link"
        onClick={() => onClick(value  +1)}
        isInline
      >
        <PlusIcon />
      </Button>
    </div>
  );
}
