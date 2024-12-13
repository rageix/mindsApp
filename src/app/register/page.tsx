import { Metadata } from 'next';
import RegisterView from '@/components/RegisterView/page';

export const metadata: Metadata = {
  title: 'Register',
};

export default function Page() {
  return <RegisterView />;
}
