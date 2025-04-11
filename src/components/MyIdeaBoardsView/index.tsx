import DashboardPageHeader from '@/components/DashboardPageHeader';
import IdeaBoardsList from './IdeaBoardsList';

export default function MyIdeaBoardsView() {
  return (
    <>
      <div className="max-w-3xl m-auto">
        <DashboardPageHeader title="My Idea Boards" />
        {/* todo: hook up functions */}
        <IdeaBoardsList onNew={() => null} onOpenId={() => null} />
      </div>
    </>
  );
}
