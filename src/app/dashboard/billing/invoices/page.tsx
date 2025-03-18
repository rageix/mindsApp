import InvoicesView from '@/components/InvoicesView';
import DashboardPageHeader from '@/components/DashboardPageHeader';
import { Metadata } from 'next';
import { pageTitle } from '@/types/PageTitle';

export const metadata: Metadata = {
  title: pageTitle('Invoices'),
};

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto">
      <DashboardPageHeader title="Invoices" />
      <InvoicesView />
    </div>
  );
}
