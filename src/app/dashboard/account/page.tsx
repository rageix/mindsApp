import AccountView from '@/components/AccountView';
import DashboardPageHeader from '@/components/DashboardPageHeader';
import { Metadata } from 'next';
import { pageTitle } from '@/types/PageTitle';

export const metadata: Metadata = {
  title: pageTitle('Account'),
};

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto">
      <DashboardPageHeader title="Account" />
      <AccountView />
    </div>
  );
}
