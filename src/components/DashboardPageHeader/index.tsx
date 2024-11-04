interface IProps {
  title: string;
}

export default function DashboardPageHeader({ title }: IProps) {
  return (
    <div className="mx-auto max-w-7xl mb-6">
      <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
    </div>
  );
}
