import VirtualCardDynamic from '@/components/VirtualCards/Dynamic';
import { Metadata } from 'next';
import { pageTitle } from '@/types/PageTitle';

export const metadata: Metadata = {
  title: pageTitle('Omni Search'),
};

export default function Page() {
  return <VirtualCardDynamic />;
}
