import { cn } from '@/util/Cn';
import { INavItem } from '@/types/NavItem';
import useTheme from '@/hooks/UseTheme';
import { ETheme } from '@/common/Theme';

interface Props {
  item: INavItem;
  active?: boolean;
}

export default function SidebarItem({ item, active }: Props) {
  const theme = useTheme();

  return (
    <div>
      <button
        className={cn(
          active
            ? theme === ETheme.light
              ? 'bg-gray-50 text-blue-600'
              : 'bg-gray-800 text-white'
            : theme === ETheme.light
              ? 'text-gray-700 hover:bg-blue-100 hover:text-blue-600'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white',
          'group flex gap-x-3 rounded-xl py-2 px-4 text-sm font-semibold leading-6 w-full',
        )}
        onClick={item.onClick}
      >
        <div>{item.icon}</div>
        <div>{item.name}</div>
      </button>
    </div>
  );
}
