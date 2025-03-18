import { Metadata } from 'next';
import LoginView from '@/components/LoginView/page';
import { pageTitle } from '@/types/PageTitle';

export const metadata: Metadata = {
  title: pageTitle('Login'),
};

export default async function Page() {
  return <LoginView />;
}
