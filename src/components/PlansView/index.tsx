'use client';
import { useState } from 'react';
import { Radio, RadioGroup } from '@headlessui/react';
import { cn } from '@/util/Cn';
import { CheckIcon } from 'lucide-react';
import { EPlan, EPlanInterval, IPlan, IPlanPeriod } from '@/types/IPlan';
import Button from '@/components/Buttton';

const periods: IPlanPeriod[] = [
  { value: EPlanInterval.Monthly, label: 'Monthly', priceSuffix: '/month' },
  { value: EPlanInterval.Yearly, label: 'Yearly', priceSuffix: '/year' },
];

const plans: IPlan[] = [
  {
    name: 'Basic',
    id: EPlan.Basic,
    price: {
      [EPlanInterval.Monthly]: '$19',
      [EPlanInterval.Yearly]: '$190',
    },
    description: 'The essentials.',
    features: [
      '1 team member',
      'Up to 5 cards',
      'Card customizability (when it launches)',
      'Priority Support',
    ],
    mostPopular: false,
  },
  {
    id: EPlan.Business,
    name: 'Startup',
    price: {
      [EPlanInterval.Monthly]: '$59',
      [EPlanInterval.Yearly]: '$590',
    },
    description: 'A plan that scales for your rapidly growing business.',
    features: [
      '25 team members',
      'Unlimited cards',
      'Card customizability (when it launches)',
      'Priority Support',
    ],
    mostPopular: true,
  },
  {
    id: EPlan.Enterprise,
    name: 'Enterprise',
    price: {
      [EPlanInterval.Monthly]: '$119',
      [EPlanInterval.Yearly]: '$1,190',
    },
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited team members',
      'Unlimited cards',
      'Card customizability (when it launches)',
      'Priority Support',
    ],
    mostPopular: false,
  },
];

interface IProps {
  onClick?: (plan: EPlan, period: EPlanInterval) => void;
  currentPlan?: EPlan;
}

export default function PlansView({ onClick, currentPlan }: IProps) {
  const [period, setPeriod] = useState(periods[0]);

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-blue-400">Plans</h2>
          <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            Plans that grows with you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-400 sm:text-xl/8">
          Choose an affordable plan that’s packed with the best features for
          engaging your audience, creating customer loyalty, and driving sales.
        </p>
        <div className="mt-16 flex justify-center">
          <fieldset aria-label="Payment frequency">
            <RadioGroup
              value={period}
              onChange={setPeriod}
              className="grid grid-cols-2 gap-x-1 rounded-full bg-white/5 p-1 text-center text-xs/5 font-semibold text-white"
            >
              {periods.map((option) => (
                <Radio
                  key={option.value}
                  value={option}
                  className="cursor-pointer rounded-full px-2.5 py-1 data-[checked]:bg-blue-500"
                >
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          </fieldset>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 xl:mx-0 xl:max-w-none xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                plan.mostPopular
                  ? 'bg-white/5 ring-2 ring-blue-500'
                  : 'ring-1 ring-white/10',
                'rounded-3xl p-8 xl:p-10',
              )}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  id={plan.id}
                  className="text-lg/8 font-semibold text-white"
                >
                  {plan.name}
                </h3>
                {plan.mostPopular ? (
                  <p className="rounded-full bg-blue-500 px-2.5 py-1 text-xs/5 font-semibold text-white">
                    Most popular
                  </p>
                ) : null}
              </div>
              <p className="mt-4 text-sm/6 text-gray-300">{plan.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-semibold tracking-tight text-white">
                  {plan.price[period.value]}
                </span>
                <span className="text-sm/6 font-semibold text-gray-300">
                  {period.priceSuffix}
                </span>
              </p>
              <Button
                variant={plan.mostPopular ? 'blue' : 'white'}
                onClick={() =>
                  onClick ? onClick(plan.id, period.value) : null
                }
                aria-describedby={plan.id}
                className="mt-6"
                disabled={currentPlan === plan.id}
                // className={cn(
                //   plan.mostPopular
                //     ? 'bg-blue-500 text-white shadow-sm hover:bg-blue-400 focus-visible:outline-blue-500'
                //     : 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white',
                //   'mt-6 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                // )}
              >
                {currentPlan === plan.id ? 'Your current plan' : 'Buy plan'}
              </Button>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm/6 text-gray-300 xl:mt-10"
              >
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-x-3"
                  >
                    <CheckIcon
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-white"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
