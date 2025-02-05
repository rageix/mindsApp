import SubscriptionsView from '@/components/SubscriptionsView';
import DashboardPageHeader from '@/components/DashboardPageHeader';

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto">
      <DashboardPageHeader title="Subscriptions" />
      <SubscriptionsView />
    </div>
  );
}
