import CardsList from '@/components/CardsView/CardsList';
import DashboardPageHeader from '@/components/DashboardPageHeader';

export default function CardsView() {
  return (
    <>
      <div className="max-w-7xl m-auto">
        <DashboardPageHeader title="Cards" />
        <CardsList />
      </div>
    </>
  );
}
