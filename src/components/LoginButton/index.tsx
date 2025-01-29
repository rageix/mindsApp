import Button from '@/components/Buttton';
import Link from 'next/link';

interface IProps {
  label?: string;
}

export default function LoginButton({ label = 'Login' }: IProps) {
  return (
    <Link href="/login">
      <Button variant="blue">{label}</Button>
    </Link>
  );
}
