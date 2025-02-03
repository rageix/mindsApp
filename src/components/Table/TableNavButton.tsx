import { PropsWithChildren } from 'react';
import Button from '@/components/Buttton';

interface IProps extends PropsWithChildren {
  onClick: () => void;
  disabled?: boolean;
}

export default function TableNavButton({
  onClick,
  disabled,
  children,
}: IProps) {
  return (
    <div className="w-24">
      <Button
        variant="blue"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Button>
    </div>
  );
}
