import { Metadata } from 'next';
import { pageTitle } from '@/types/PageTitle';
import MultiChatsView from '@/components/MultiChatsView';

export const metadata: Metadata = {
  title: pageTitle('Chat'),
};

export default function Page() {
  return <MultiChatsView />;
}
