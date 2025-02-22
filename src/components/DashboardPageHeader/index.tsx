import { cn } from '@/util/Cn';
import { merriweather } from '@/util/Fonts';

interface IProps {
  title: string;
}

export default function DashboardPageHeader({ title }: IProps) {
  return (
    <div className="mb-6">
      <h1
        className={cn(
          '!text-3xl font-bold tracking-tight !text-blue-900',
          merriweather.className,
        )}
      >
        {title}
      </h1>
    </div>
  );
}
