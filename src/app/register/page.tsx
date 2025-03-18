import { Metadata } from 'next';
import RegisterView from '@/components/RegisterView/page';
import { pageTitle } from '@/types/PageTitle';

export const metadata: Metadata = {
  title: pageTitle('Register'),
};

export default function Page() {
  return <RegisterView />;
}
