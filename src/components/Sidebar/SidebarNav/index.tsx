import SidebarItem from '../SidebarItem';
import { FolderUpIcon, MessageCircleIcon } from 'lucide-react';
import { INavItem } from '@/types/NavItem';
import CurrentUserAvatar from '@/components/CurrentUserAvatar';
import emitter from '@/util/Emitter';

const mainNav: INavItem[] = [
  {
    name: 'New Chat',
    icon: <MessageCircleIcon className="h-6 w-6 shrink-0 text-gray-500" />,
    onClick: () => emitter.emitNewChat(),
  },
  {
    name: 'Open Chat',
    icon: <FolderUpIcon className="h-6 w-6 shrink-0 text-gray-500" />,
    onClick: () => emitter.emitShowChatsModal(),
  },
];

export default function SidebarNav() {
  return (
    <nav className="flex flex-1 flex-col">
      <ul
        role="list"
        className="flex flex-1 flex-col gap-y-7"
      >
        <li>
          <ul
            role="list"
            className="-mx-2 space-y-1"
          >
            {mainNav.map((item) => (
              <SidebarItem
                key={item.name}
                item={item}
                active={false}
              />
            ))}
          </ul>
        </li>
        {/*<li>*/}
        {/*  /!*<div className="text-xs font-semibold leading-6 text-gray-400">*!/*/}
        {/*  /!*  Recent Projects*!/*/}
        {/*  /!*</div>*!/*/}
        {/*  <ul*/}
        {/*    role="list"*/}
        {/*    className="space-y-1"*/}
        {/*  >*/}
        {/*    <SidebarProjectsList />*/}
        {/*  </ul>*/}
        {/*</li>*/}
        <div className="mt-auto">
          <CurrentUserAvatar
            anchor="top start"
            menuItemsClassName="-mt-3"
          />
          {/*<SidebarItem*/}
          {/*  item={{*/}
          {/*    name: 'Switch Team',*/}
          {/*    href: `/dashboard`,*/}
          {/*    icon: ArrowLeftRightIcon,*/}
          {/*  }}*/}
          {/*/>*/}
        </div>
      </ul>
    </nav>
  );
}
