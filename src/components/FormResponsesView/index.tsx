import DashboardPageHeader from '@/components/DashboardPageHeader';
import FormResponsesList from './FormResponsesList';

export default function FormResponsesView() {
  return (
    <>
      <div className="max-w-3xl m-auto">
        <DashboardPageHeader title="Form Responses" />
        <FormResponsesList />
      </div>
    </>
  );
}
