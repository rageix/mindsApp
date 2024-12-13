import { Metadata } from 'next';
import PasswordResetIdView from '@/components/PasswordResetIdView/page';

export const metadata: Metadata = {
  title: 'Password reset',
};

export default async function Page() {
  return <PasswordResetIdView />;
}
