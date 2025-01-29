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
import useTheme from '@/hooks/UseTheme';
import { cn } from '@/util/Cn';
import { ETheme } from '@/common/Theme';

interface Navigation {
  name: string;
  href: string;
}

interface Props extends PropsWithChildren {}

export default function SettingsLayout({ children }: Props) {
  const teamId = useTeamId();
  const path = usePathname();
  const router = useRouter();
  const theme = useTheme();
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
    <div className="max-w-3xl mx-auto">
      <DashboardPageHeader title="Team Settings" />
      <nav
        className={cn(
          'mt-6 flex overflow-x-auto border-b-2 border-blue-600 py-4 px-3',
          theme === ETheme.light ? 'bg-white' : null,
          theme === ETheme.dark ? 'bg-gray-800' : null,
        )}
      >
        <ul
          role="list"
          className={cn(
            'flex min-w-full flex-none gap-x-6 text-sm font-semibold leading-6',
            theme === ETheme.light ? 'text-gray-500' : null,
            theme === ETheme.dark ? 'text-gray-400' : null,
          )}
        >
          {navigation.map((item) => (
            <li
              key={item.name}
              className={cn(
                theme === ETheme.light ? 'hover:text-gray-400' : null,
                theme === ETheme.dark ? 'hover:text-white' : null,
              )}
            >
              <Link
                href={item.href}
                className={
                  path.indexOf(item.href) === 0
                    ? theme === ETheme.light
                      ? 'text-blue-600 hover:text-blue-600'
                      : 'text-blue-300 hover:text-white'
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
