import { DetailedHTMLProps, HTMLAttributes } from 'react';
import Logo from '@/components/Logo';
import { cn } from '@/util/Cn';
import SidebarNav from '@/components/Sidebar/SidebarNav';
import Link from 'next/link';
import useTeamId from '@/hooks/UseTeamId';

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function Sidebar(props: IProps) {
  const teamId = useTeamId();

  return (
    <div
      {...props}
      className={cn(
        'flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 bg-gray-900 bg-bank-note',
        props.className,
      )}
    >
      <div className="flex h-16 shrink-0 items-center">
        <Link
          href={`/dashboard/${teamId}`}
          className="flex items-baseline"
        >
          <Logo className="h-8 w-auto" />
        </Link>
      </div>
      <SidebarNav />
    </div>
  );
}
