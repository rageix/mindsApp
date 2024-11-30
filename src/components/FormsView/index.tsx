import DashboardPageHeader from '@/components/DashboardPageHeader';
import FormsList from './FormsList';

export default function FormsView() {
  return (
    <>
      <div className="max-w-7xl m-auto">
        <DashboardPageHeader title="Dynamic Forms" />
        <FormsList />
      </div>
    </>
  );
}
