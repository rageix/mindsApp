import { Metadata } from 'next';
import { pageTitle } from '@/types/PageTitle';
import DashboardPageHeader from '@/components/DashboardPageHeader';
import DashboardView from '@/components/DashboardView';

export const metadata: Metadata = {
  title: pageTitle('Account'),
};

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto">
      <DashboardPageHeader title="Dashboard" />
      <DashboardView />
    </div>
  );
}
