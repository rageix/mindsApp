// import { jsPDF } from 'jspdf';
import Button from '@/components/Buttton';
import { cn } from '@/util/Cn';

interface IProps {
  color: string;
  value: string;
  onClick: () => void;
}

export default function ColorCircle({ color, value, onClick }: IProps) {
  return (
    <Button
      variant="custom"
      className="!p-0"
      onClick={onClick}
    >
      <div
        className={cn(
          'size-10 rounded-full border-2',
          value.toLowerCase() === color.toLowerCase()
            ? 'border-gray-200'
            : 'border-gray-900',
        )}
        style={{ backgroundColor: color }}
      />
    </Button>
  );
}
