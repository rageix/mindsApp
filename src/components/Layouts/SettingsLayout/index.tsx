'use client';

import { PropsWithChildren, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useTeamId from '@/hooks/UseTeamId';
import DashboardPageHeader from '@/components/DashboardPageHeader';

interface Navigation {
  name: string;
  href: string;
}

interface Props extends PropsWithChildren {}

export default function SettingsLayout({ children }: Props) {
  const teamId = useTeamId();
  const path = usePathname();
  const navigation: Navigation[] = useMemo(
    () => [
      { name: 'Team', href: `/dashboard/${teamId}/settings/team` },
      { name: 'Members', href: `/dashboard/${teamId}/settings/members` },
      { name: 'Plans', href: `/dashboard/${teamId}/settings/plans` },
      {
        name: 'Subscriptions',
        href: `/dashboard/${teamId}/settings/subscriptions`,
      },
      { name: 'Invoices', href: `/dashboard/${teamId}/settings/invoices` },
    ],
    [teamId],
  );

  return (
    <div>
      <DashboardPageHeader title="Team Settings" />
      <nav className="mt-6 flex overflow-x-auto border-b-2 border-blue-600 py-4 px-3 bg-gray-500/10">
        <ul
          role="list"
          className="flex min-w-full flex-none gap-x-6 text-sm font-semibold leading-6 text-gray-400"
        >
          {navigation.map((item) => (
            <li
              key={item.name}
              className="hover:text-white"
            >
              <Link
                href={item.href}
                className={
                  path.indexOf(item.href) === 0
                    ? 'text-blue-300 hover:text-white'
                    : ''
                }
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-6">{children}</div>
    </div>
  );
}
