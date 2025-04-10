import DashboardPageHeader from '@/components/DashboardPageHeader';
import IdeaBoardsList from './IdeaBoardsList';

export default function IdeaBoardsView() {
  return (
    <>
      <div className="max-w-3xl m-auto">
        <DashboardPageHeader title="My Idea Boards" />
        <IdeaBoardsList />
      </div>
    </>
  );
}
