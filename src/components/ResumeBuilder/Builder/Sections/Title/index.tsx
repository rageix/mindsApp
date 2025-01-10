import { PropsWithChildren } from 'react';
import { Merriweather } from 'next/font/google';
import { cn } from '@/util/Cn';

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
});

interface IProps extends PropsWithChildren {
  title: string;
}

export default function Title({ title }: IProps) {
  return <div className={cn('font-bold text-2xl', merriweather.className)}>{title}</div>;
}
