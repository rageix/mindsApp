import DashboardPageHeader from '@/components/DashboardPageHeader';
import ResumesList from './ResumesList';

export default function ResumesView() {
  return (
    <>
      <div className="max-w-3xl m-auto">
        <DashboardPageHeader title="My Resumes" />
        <ResumesList />
      </div>
    </>
  );
}
