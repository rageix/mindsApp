import DashboardPageHeader from '@/components/DashboardPageHeader';
import FilesView from '@/components/FilesView';
import { Metadata } from 'next';
import { pageTitle } from '@/types/PageTitle';

export const metadata: Metadata = {
  title: pageTitle('My Files'),
};

export default function Page() {
  return (
    <>
      <DashboardPageHeader title="Files" />
      <FilesView />
    </>
  );
}
