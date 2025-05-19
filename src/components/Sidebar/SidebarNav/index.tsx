import SidebarItem from '../SidebarItem';
import {
  HouseIcon,
  ListIcon,
  MessageCircleIcon,
  PanelRight,
} from 'lucide-react';
import CurrentUserAvatar from '@/components/CurrentUserAvatar';
import { usePathname, useRouter } from 'next/navigation';
import emitter from '@/util/Emitter';

// const mainNav: INavItem[] = [
//   {
//     name: 'New Chat',
//     icon: <MessageCircleIcon className="h-6 w-6 shrink-0 text-gray-500" />,
//     onClick: () => {
//
//     },
//   },
// ];

export default function SidebarNav() {
  const path = usePathname();
  const router = useRouter();

  const onClickNewChat = () => {
    if (path !== '/dashboard/chat') {
      router.push('/dashboard/chat');
      return;
    }

    emitter.emitNewChat();
  };

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
              onClick={onClickNewChat}
              active={false}
            >
              New Chat
            </SidebarItem>
            <SidebarItem
              icon={<ListIcon className="size-6 shrink-0" />}
              onClick={() => router.push('/dashboard/generators')}
              active={path === '/dashboard/generators'}
            >
              Generators
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
          <div className="py-3 border-b border-gray-300">
            <SidebarItem
              icon={<PanelRight className="size-6 shrink-0" />}
              onClick={() => emitter.emitToggleIdeaBoard()}
              active={false}
            >
              Toggle Idea Board
            </SidebarItem>
          </div>
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
