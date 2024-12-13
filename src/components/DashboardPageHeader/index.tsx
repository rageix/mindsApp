interface IProps {
  title: string;
}

export default function DashboardPageHeader({ title }: IProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
    </div>
  );
}
