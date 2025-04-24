import { DetailedHTMLProps, HTMLAttributes } from 'react';
import Logo from '@/components/Logo';
import { cn } from '@/util/Cn';
import SidebarNav from '@/components/Sidebar/SidebarNav';
import Link from 'next/link';
import useTheme from "@/hooks/UseTheme";
import { ETheme } from "@/common/Theme";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function Sidebar(props: IProps) {
  const theme = useTheme();

  return (
    <div
      {...props}
      className={cn(
        'flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 border-r shadow-md',
        theme === ETheme.light ? 'bg-gray-50 border-gray-100' : null,
        theme === ETheme.dark ? 'bg-gray-900 border-gray-800' : null,
        props.className,
      )}
    >
      <div className="flex h-16 shrink-0 items-center">
        <Link
          href={`/dashboard`}
          className="flex items-baseline"
        >
          <Logo className="h-8 w-auto" />
        </Link>
      </div>
      <SidebarNav />
    </div>
  );
}
