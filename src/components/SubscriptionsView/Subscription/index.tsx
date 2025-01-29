'use client';

import CardBody from '@/components/Card/CardBody';
import Card from '@/components/Card';
import FormattedDate from '@/components/FormattedDate';
import TextBlock from '@/components/SubscriptionsView/Subscription/TextBlock';
import Button from '@/components/Buttton';
import { PLAN_INTERVALS, PLANS } from '@/types/IPlan';
import { formatAsMoney } from '@/util/FormatAsMoney';
import { TUseCurrentSubscription } from '@/hooks/UseCurrentSubscription';
import useSubscriptionPortal from '@/hooks/UseSubscriptionPortal';
import useTeamId from '@/hooks/UseTeamId';
import CardHeader from '@/components/Card/CardHeader';
import CardTitle from '@/components/Card/CardTitle';
import MenuItemButton from '@/components/MenuItemButton';
import TableOptionsMenu from '@/components/TableOptionsMenu';
import useTheme from '@/hooks/UseTheme';
import { cn } from '@/util/Cn';
import { ETheme } from '@/common/Theme';

interface IProps {
  useCurrentSubscription: TUseCurrentSubscription;
}

export default function Subscription({ useCurrentSubscription }: IProps) {
  const theme = useTheme();
  const teamId = useTeamId();
  const portal = useSubscriptionPortal(teamId);

  if (!useCurrentSubscription.data) {
    return null;
  }

  const subscription = useCurrentSubscription.data;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Active Subscription</CardTitle>
            <p
              className={cn(
                'mt-1 max-w-2xl text-sm/6 ',
                theme === ETheme.light ? 'text-gray-500' : null,
                theme === ETheme.dark ? 'text-gray-400' : null,
              )}
            >
              Details about your subscription.
            </p>
          </div>
          <div>
            <TableOptionsMenu className="!w-36">
              <a
                href={portal.data?.url}
                target="_blank"
                rel="noreferrer"
              >
                <MenuItemButton onClick={() => null}>
                  Update payment
                </MenuItemButton>
              </a>
            </TableOptionsMenu>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div>
          {/*<div className="px-4 sm:px-0">*/}
          {/*  <h3 className="text-base/7 font-semibold text-white">*/}
          {/*    Active Subscription*/}
          {/*  </h3>*/}
          {/*  <p className="mt-1 max-w-2xl text-sm/6 text-gray-400">*/}
          {/*    Details about your subscription.*/}
          {/*  </p>*/}
          {/*</div>*/}
          <div className="border-t border-white/10">
            <dl className={cn('divide-y ',
              theme === ETheme.light ? 'divide-gray-200' : null,
              theme === ETheme.dark ? 'divide-white/10' : null,
              )}>
              <TextBlock title="Started On">
                <FormattedDate
                  value={subscription.createdAt}
                  time={false}
                  year={true}
                />
              </TextBlock>
              <TextBlock title="Plan">{PLANS[subscription.plan]}</TextBlock>
              <TextBlock title="Interval">
                {PLAN_INTERVALS[subscription.interval]}
              </TextBlock>
              <TextBlock title="Rate">
                {formatAsMoney(subscription.subtotal / 100)}
              </TextBlock>
              {subscription.canceledAt && (
                <TextBlock title="Cancled On">
                  <FormattedDate
                    value={subscription.canceledAt}
                    time={false}
                  />
                </TextBlock>
              )}
              {subscription.expiresAt && (
                <TextBlock title="Expires On">
                  <FormattedDate
                    value={subscription.expiresAt}
                    time={false}
                  />
                </TextBlock>
              )}
            </dl>
          </div>
          <div className="border-t border-white/10 pt-6">
            {!subscription.canceledAt && (
              <Button
                variant="red"
                isInline
                onClick={useCurrentSubscription.cancel}
              >
                Cancel Subscription
              </Button>
            )}
            {subscription.canceledAt && (
              <Button
                variant="green"
                isInline
                onClick={useCurrentSubscription.resume}
              >
                Resume Subscription
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
