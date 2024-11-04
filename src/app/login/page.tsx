import { Metadata } from 'next';
import LoginView from '@/components/LoginView/page';

export const metadata: Metadata = {
  title: 'Login',
};

export default async function Page() {
  return <LoginView />;
}
