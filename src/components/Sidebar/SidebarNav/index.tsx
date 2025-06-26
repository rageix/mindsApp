import SidebarItem from '../SidebarItem';
import { HouseIcon, MessageCircleIcon } from 'lucide-react';
import CurrentUserAvatar from '@/components/CurrentUserAvatar';
import { usePathname, useRouter } from 'next/navigation';

export default function SidebarNav() {
  const path = usePathname();
  const router = useRouter();

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
            <SidebarItem
              icon={<HouseIcon className="size-6 shrink-0" />}
              onClick={() => router.push('/dashboard')}
              active={path === '/dashboard'}
            >
              Dashboard
            </SidebarItem>
            <SidebarItem
              icon={<MessageCircleIcon className="size-6 shrink-0" />}
              onClick={() => router.push('/dashboard/groupChats/new')}
              active={false}
            >
              New Group Chat
            </SidebarItem>
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
        <div className="mt-auto flex flex-col divide-gray-300">
          <div className="py-3 w-full">
            <CurrentUserAvatar
              anchor="top start"
              menuItemsClassName="-mt-3"
            />
          </div>
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
