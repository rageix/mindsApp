// import { jsPDF } from 'jspdf';
import ColorCircle from '@/components/ResumeBuilder/Renderer/ColorPicker/ColorCircle';

const SIMPLE_COLORS: string[] = [
  '#111827',
  '#7f1d1d',
  '#14532d',
  '#1e3a8a',
  '#581c87',
  '#713f12',
];

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SimpleColors({ value, onChange }: IProps) {
  return (
    <div className="flex gap-x-2">
      {SIMPLE_COLORS.map((v) => (
        <ColorCircle
          key={v}
          color={v}
          value={value}
          onClick={() => onChange(v)}
        />
      ))}
    </div>
  );
}
