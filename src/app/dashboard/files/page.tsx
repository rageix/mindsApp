import DashboardPageHeader from '@/components/DashboardPageHeader';
import FilesView from '@/components/FilesView';

export default function Page() {
  return (
    <>
      <DashboardPageHeader title="Files" />
      <FilesView />
    </>
  );
}
