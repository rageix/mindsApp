'use client';
import { PropsWithChildren, ReactElement } from 'react';
import Card from '@/components/Card';
import CardBody from "@/components/Card/CardBody";
import useTheme from "@/hooks/UseTheme";
import { ETheme } from "@/common/Theme";
import { cn } from "@/util/Cn";

interface Props extends PropsWithChildren {
  h2: string | ReactElement;
  message: string | ReactElement;
}

export default function SuccessView(props: Props) {
  const theme = useTheme();

  return (
    <div className="flex min-h-screen justify-center items-center">
      <Card>
        <CardBody>
          <div className="px-6 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {props.h2}
              </h2>
              <div className={cn('mx-auto mt-6 max-w-xl text-lg leading-8',
                theme === ETheme.light ? 'text-gray-500' : null,
                theme === ETheme.dark ? 'text-gray-400' : null,
                )}>
                {props.message}
              </div>
              {props.children}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
