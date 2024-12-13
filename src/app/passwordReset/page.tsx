import { Metadata } from 'next';
import PasswordResetView from '@/components/PasswordResetView/page';

export const metadata: Metadata = {
  title: 'Password reset',
};

export default async function Page() {
  return <PasswordResetView />;
}
