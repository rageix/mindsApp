import Button from '@/components/Buttton';
import Link from 'next/link';
import { TButtonVariant } from '@/types/Variant';

interface IProps {
  label?: string;
  variant?: TButtonVariant
  isInline?: boolean
}

export default function LoginButton({ label = 'Log in', variant = 'blue', isInline }: IProps) {
  return (
    <Link href="/login">
      <Button variant={variant} isInline={isInline}>{label}</Button>
    </Link>
  );
}
