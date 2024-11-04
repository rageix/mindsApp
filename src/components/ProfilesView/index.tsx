import ProfilesList from '@/components/ProfilesView/ProfilesList';
import DashboardPageHeader from '@/components/DashboardPageHeader';

export default function ProfilesView() {
  return (
    <>
      <div className="max-w-7xl m-auto">
        <DashboardPageHeader title="Profiles" />
        <ProfilesList />
      </div>
    </>
  );
}
