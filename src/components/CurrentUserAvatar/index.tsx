import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import CurrentUserAvatarMenuItem from '@/components/CurrentUserAvatarMenuItem';
import userService from '@/services/UserService';
import { UserAvatar } from '@/components/UserAvatar';
import useUser from '@/hooks/UseUser';
import AboutModal from '@/components/AboutModal';
import { useState } from 'react';

export default function CurrentUserAvatar() {
  const [about, setAbout] = useState(false);
  const router = useRouter();
  const user = useUser();

  async function onClickLogout() {
    await userService.logout();
    router.push('/login');
  }

  return (
    <>
      <Menu
        as="div"
        className="relative"
      >
        <MenuButton className="-m-1.5 flex items-center p-1.5">
          <span className="sr-only">Open user menu</span>
          <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-500">
            <UserAvatar value={user.data?.avatar} />
          </div>
        </MenuButton>
        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <CurrentUserAvatarMenuItem
            onClick={() => router.push(`/dashboard/account`)}
          >
            Account
          </CurrentUserAvatarMenuItem>
          <CurrentUserAvatarMenuItem
            onClick={() => router.push(`/dashboard/subscriptions`)}
          >
            Subscriptions
          </CurrentUserAvatarMenuItem>
          <CurrentUserAvatarMenuItem
            onClick={() => router.push(`/dashboard/invoices`)}
          >
            Invoices
          </CurrentUserAvatarMenuItem>
          <CurrentUserAvatarMenuItem onClick={() => setAbout(true)}>
            About
          </CurrentUserAvatarMenuItem>
          <CurrentUserAvatarMenuItem onClick={onClickLogout}>
            Logout
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
