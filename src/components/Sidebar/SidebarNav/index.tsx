import SidebarItem from '../SidebarItem';
import { usePathname } from 'next/navigation';
import {
  ArrowLeftRightIcon,
  FileIcon,
  IdCardIcon,
  SettingsIcon,
} from 'lucide-react';
import useTeamId from '@/hooks/UseTeamId';
import { useMemo } from 'react';
import { INavItem } from '@/types/NavItem';
import useCurrentUserMember from '@/hooks/UseCurrentUserMember';

export default function SidebarNav() {
  const path = usePathname();
  const teamId = useTeamId();
  const currentUserMember = useCurrentUserMember();

  const mainNav: INavItem[] = useMemo(
    () => [
      // {
      //   name: 'Profiles',
      //   href: `/dashboard/${teamId}/profiles`,
      //   icon: SquareUserRound,
      // },
      {
        name: 'Dynamic Forms',
        href: `/dashboard/${teamId}/dynamicForms`,
        icon: FileIcon,
      },
      {
        name: 'Cards',
        href: `/dashboard/${teamId}/cards`,
        icon: IdCardIcon,
      },
      // {
      //   name: 'Calendars',
      //   href: `/dashboard/${teamId}/calendars`,
      //   icon: CalendarIcon,
      // },
    ],
    [teamId],
  );

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
                active={path === item.href}
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
          {currentUserMember.isLoaded() &&
            currentUserMember.canAccessTeamSettings() && (
              <SidebarItem
                item={{
                  name: 'Team Settings',
                  href: `/dashboard/${teamId}/settings/team`,
                  icon: SettingsIcon,
                }}
              />
            )}
          <SidebarItem
            item={{
              name: 'Switch Team',
              href: `/dashboard`,
              icon: ArrowLeftRightIcon,
            }}
          />
        </div>
      </ul>
    </nav>
  );
}
