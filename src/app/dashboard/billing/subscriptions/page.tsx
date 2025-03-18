import SubscriptionsView from '@/components/SubscriptionsView';
import DashboardPageHeader from '@/components/DashboardPageHeader';
import { Metadata } from 'next';
import { pageTitle } from '@/types/PageTitle';

export const metadata: Metadata = {
  title: pageTitle('Subscriptions'),
};

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto">
      <DashboardPageHeader title="Subscriptions" />
      <SubscriptionsView />
    </div>
  );
}
