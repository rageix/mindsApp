import { MoveLeftIcon } from 'lucide-react';
import Button from '@/components/Buttton';

interface IProps {
  onClick: () => void;
  label?: string;
}

export default function BackButton({ onClick, label = 'Back' }: IProps) {
  return (
    <Button
      variant="text"
      onClick={onClick}
      isInline
    >
      <MoveLeftIcon />
      <span className="ms-2">{label}</span>
    </Button>
  );
}
