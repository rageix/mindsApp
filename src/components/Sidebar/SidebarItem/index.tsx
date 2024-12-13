import { cn } from '@/util/Cn';
import { INavItem } from '@/types/NavItem';
import Link from 'next/link';
import useTheme from '@/hooks/UseTheme';
import { ETheme } from "@/common/Theme";

interface Props {
  item: INavItem;
  active?: boolean;
}

export default function SidebarItem({item, active}: Props) {
  const theme = useTheme();

  return (
    <div>
      <Link
        href={item.href}
        className={cn(
          active
            ? theme === ETheme.light ? 'bg-gray-50 text-blue-600' : 'bg-gray-800 text-white'
            : theme === ETheme.light ? 'text-gray-700 hover:bg-gray-50 hover:text-blue-600' : 'text-gray-400 hover:bg-gray-800 hover:text-white',
          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
        )}
      >
        <item.icon
          aria-hidden="true"
          className="h-6 w-6 shrink-0 text-gray-500"
        />
        {item.name}
      </Link>
    </div>
  );
}
