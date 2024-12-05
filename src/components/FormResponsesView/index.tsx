import DashboardPageHeader from '@/components/DashboardPageHeader';
import FormResponsesList from '@/components/FormResponsesView/FormsList';

export default function FormResponsesView() {
  return (
    <>
      <div className="max-w-7xl m-auto">
        <DashboardPageHeader title="Form Responses" />
        <FormResponsesList />
      </div>
    </>
  );
}
