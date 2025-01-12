import { PropsWithChildren } from 'react';
import Button from '@/components/Buttton';

interface IProps extends PropsWithChildren {
  onClick: () => void
}

export default function AddFormButton({ onClick }: IProps) {
  return <Button
    variant="link"
    className="mt-2 !justify-start"
    onClick={onClick}
  >
    + Add One
  </Button>;
}
