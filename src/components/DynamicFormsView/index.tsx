import DashboardPageHeader from '@/components/DashboardPageHeader';
import DynamicFormsList from '@/components/DynamicFormsView/DynamicFormsList';

export default function DynamicFormsView() {
  return (
    <>
      <div className="max-w-7xl m-auto">
        <DashboardPageHeader title="Dynamic Forms" />
        <DynamicFormsList />
      </div>
    </>
  );
}
