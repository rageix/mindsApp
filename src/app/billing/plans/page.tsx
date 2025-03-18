import PlansView from '@/components/PlansView';
import { Metadata } from 'next';
import { pageTitle } from '@/types/PageTitle';

export const metadata: Metadata = {
  title: pageTitle('Plans'),
};

export default function Page() {
  return <PlansView />;
}
