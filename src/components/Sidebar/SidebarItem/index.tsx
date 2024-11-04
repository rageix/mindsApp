import { cn } from '@/util/Cn';
import { INavItem } from '@/types/NavItem';
import Link from 'next/link';

interface Props {
  item: INavItem;
  active?: boolean;
}

export default function SidebarItem({ item, active }: Props) {
  return (
    <div>
      <Link
        href={item.href}
        className={cn(
          active
            ? 'bg-gray-800 text-white'
            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
        )}
      >
        <item.icon
          aria-hidden="true"
          className="h-6 w-6 shrink-0"
        />
        {item.name}
      </Link>
    </div>
  );
}
