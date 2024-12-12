import DashboardPageHeader from '@/components/DashboardPageHeader';
import FormsList from './FormsList';

export default function FormsView() {
  return (
    <>
      <div className="max-w-3xl m-auto">
        <DashboardPageHeader title="Forms" />
        <FormsList />
      </div>
    </>
  );
}
