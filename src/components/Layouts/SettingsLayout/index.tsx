'use client';

import { PropsWithChildren, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import useTeamId from '@/hooks/UseTeamId';
import DashboardPageHeader from '@/components/DashboardPageHeader';
import subscriptionService from '@/services/SubscriptionService';
import useCurrentUserMember from '@/hooks/UseCurrentUserMember';
import Loading from '@/components/Loading';
import { EMemberRole } from '@/types/Member';

interface Navigation {
  name: string;
  href: string;
}

interface Props extends PropsWithChildren {}

export default function SettingsLayout({ children }: Props) {
  const teamId = useTeamId();
  const path = usePathname();
  const router = useRouter();
  subscriptionService.useController();
  const currentUserMember = useCurrentUserMember();

  useEffect(() => {
    if (currentUserMember.isLoaded()) {
      if (currentUserMember.state.data?.role === EMemberRole.Member) {
        router.push(`/dashboard/${teamId}`);
      }
    }
  }, [currentUserMember.isLoaded()]);

  const navigation: Navigation[] = useMemo(
    () => [
      { name: 'Team', href: `/dashboard/${teamId}/settings/team` },
      { name: 'Members', href: `/dashboard/${teamId}/settings/members` },
      {
        name: 'Subscriptions',
        href: `/dashboard/${teamId}/settings/subscriptions`,
      },
      { name: 'Invoices', href: `/dashboard/${teamId}/settings/invoices` },
    ],
    [teamId],
  );

  if (!currentUserMember.isLoaded()) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loading
          size="lg"
          showAfter={2000}
        />
      </div>
    );
  }

  if (
    !currentUserMember.state.data?.role ||
    currentUserMember.state.data?.role === EMemberRole.Member
  ) {
    return null;
  }

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
