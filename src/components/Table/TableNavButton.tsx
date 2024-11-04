import { ButtonHTMLAttributes } from 'react';
import Button from '@/components/Buttton';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

export default function TableNavButton(props: Props) {
  return (
    <div className="w-24">
      <Button
        variant="blue"
        {...props}
      >
        {props.children}
      </Button>
    </div>
  );
}
