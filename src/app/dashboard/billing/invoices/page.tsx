import InvoicesView from '@/components/InvoicesView';
import DashboardPageHeader from '@/components/DashboardPageHeader';

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto">
      <DashboardPageHeader title="Invoices" />
      <InvoicesView />
    </div>
  );
}
