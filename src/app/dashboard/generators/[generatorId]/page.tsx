import { Metadata } from 'next';
import { pageTitle } from '@/types/PageTitle';
import GeneratorView from '@/components/GeneratorView';

export const metadata: Metadata = {
  title: pageTitle('Generators'),
};

export default function Page() {
  return <GeneratorView />;
}
