import AccountView from '@/components/AccountView';
import DashboardPageHeader from '@/components/DashboardPageHeader';

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto">
      <DashboardPageHeader title="Account" />
      <AccountView />
    </div>
  );
}
