import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import CurrentUserAvatarMenuItem from '@/components/CurrentUserAvatarMenuItem';
import userService from '@/services/UserService';
import AboutModal from '@/components/AboutModal';
import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/util/Cn';
import SidebarItem from '@/components/Sidebar/SidebarItem';
import { UserIcon } from 'lucide-react';

type Align = 'start' | 'end';
type Placement = 'top' | 'right' | 'bottom' | 'left';
export type AnchorProps = false | (`${Placement}` | `${Placement} ${Align}`);

interface IProps {
  anchor: AnchorProps | undefined;
  menuItemsClassName?: string;
}

export default function CurrentUserAvatar({
  anchor,
  menuItemsClassName,
}: IProps) {
  const [about, setAbout] = useState(false);
  // const user = useUser();

  async function onClickLogout() {
    await userService.logout();
    // this prevents other api calls from modifying the url
    window.location.href = '/login';
  }

  return (
    <>
      <Menu
        as="div"
        className="relative w-full"
      >
        <MenuButton
          as="div"
          className="flex items-center cursor-pointer w-full"
        >
          <span className="sr-only">Open user menu</span>
          <SidebarItem
            icon={<UserIcon className="size-6 shrink-0 " />}
            onClick={() => null}
            active={false}
          >
            User
          </SidebarItem>
        </MenuButton>
        <MenuItems
          transition
          className={cn(
            'absolute right-0 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in z-50',
            menuItemsClassName,
          )}
          anchor={anchor}
        >
          <CurrentUserAvatarMenuItem>
            <Link
              className="block w-full"
              href="/dashboard/account"
            >
              Account
            </Link>
          </CurrentUserAvatarMenuItem>
          <CurrentUserAvatarMenuItem>
            <Link
              className="block w-full"
              href="/dashboard/billing/subscriptions"
            >
              Subscriptions
            </Link>
          </CurrentUserAvatarMenuItem>
          <CurrentUserAvatarMenuItem>
            <Link
              className="block w-full"
              href="/dashboard/billing/invoices"
            >
              Invoices
            </Link>
          </CurrentUserAvatarMenuItem>
          <CurrentUserAvatarMenuItem>
            <div
              className="block w-full"
              onClick={() => setAbout(true)}
            >
              About
            </div>
          </CurrentUserAvatarMenuItem>
          <CurrentUserAvatarMenuItem>
            <div
              className="block w-full"
              onClick={onClickLogout}
            >
              Logout
            </div>
          </CurrentUserAvatarMenuItem>
        </MenuItems>
      </Menu>
      <AboutModal
        open={about}
        onClose={() => setAbout(false)}
      />
    </>
  );
}
