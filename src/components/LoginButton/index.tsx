import Button from '@/components/Buttton';
import Link from 'next/link';
import { TButtonVariant } from '@/types/Variant';

interface IProps {
  label?: string;
  variant?: TButtonVariant
}

export default function LoginButton({ label = 'Log in', variant = 'blue' }: IProps) {
  return (
    <Link href="/login">
      <Button variant={variant}>{label}</Button>
    </Link>
  );
}
