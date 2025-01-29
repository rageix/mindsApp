'use client';
import { cn } from '@/util/Cn';
import { CheckIcon } from 'lucide-react';
import { EPlan, IPlan } from '@/types/IPlan';
import Button from '@/components/Buttton';
import { Merriweather } from 'next/font/google';

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
});

const plans: IPlan[] = [
  {
    name: 'Monthly',
    id: EPlan.Monthly,
    price: '$19.99',
    suffix: '/month',
    description:
      'Access all products for one low monthly price. Cancel anytime.',
    features: [
      'Unlimited resumes and exports',
      'Full access to all current products',
      'Priority support',
    ],
    bestValue: false,
  },
  {
    id: EPlan.Yearly,
    name: 'Yearly',
    price: '$199.99',
    suffix: '/year',
    description:
      'Access all products for one low yearly price. Cancel anytime.',
    features: [
      'Unlimited resumes and exports',
      'Full access to all current products',
      'Priority support',
    ],
    bestValue: true,
  },
];

interface IProps {
  onClick?: (plan: EPlan) => void;
}

export default function Plans({ onClick }: IProps) {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-lg md:text-3xl font-semibold text-blue-600">
            Plans
          </h2>
          <p
            className={cn(
              'mt-2 text-balance text-3xl sm:text-5xl font-semibold tracking-tight text-gray-900 md:text-6xl',
              merriweather.className,
            )}
          >
            Straight forward pricing, no bull.
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-pretty md:text-center font-medium text-gray-700 text-md sm:text-lg md:text-xl/8">
          We offer 2 very straight forward plans, the only difference is the
          length. Your subscription gives you all access to all tools currently
          available on our platform. When we add new tools you automatically get
          full access to them at no additional cost.
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-pretty md:text-center font-medium text-gray-700 text-md sm:text-lg md:text-xl/8">
          Cancel anytime with just one click. It&apos;s seriously that easy.
        </p>
        <div className="flex justify-center">
          <div className="mt-10 flex flex-col md:flex-row gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  plan.bestValue
                    ? 'ring-2 ring-blue-600'
                    : 'ring-1 ring-gray-200',
                  'rounded-3xl p-8 xl:p-10 max-w-sm',
                )}
              >
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={plan.id}
                    className="text-lg/8 font-semibold text-gray-900"
                  >
                    {plan.name}
                  </h3>
                  {plan.bestValue ? (
                    <p className="rounded-full bg-blue-600 px-2.5 py-1 text-xs/5 font-semibold text-white">
                      Best value!
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm/6 text-gray-700">
                  {plan.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <>
                    <span className="text-4xl font-semibold tracking-tight text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-sm/6 font-semibold text-gray-700">
                      {plan.suffix}
                    </span>
                  </>
                </p>
                <Button
                  variant="blue"
                  onClick={() => (onClick ? onClick(plan.id) : null)}
                  aria-describedby={plan.id}
                  className="mt-6"
                >
                  Buy now
                </Button>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm/6 text-gray-700 xl:mt-10"
                >
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-x-3"
                    >
                      <CheckIcon
                        aria-hidden="true"
                        className="h-6 w-5 flex-none text-green-700"
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
    </div>
  );
}
