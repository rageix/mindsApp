'use client';
import { PropsWithChildren } from 'react';
import MinimalLayout from '@/components/Layouts/MinimalLayout';

interface Props extends PropsWithChildren {}

export default function Layout(props: Props) {
  return <MinimalLayout>{props.children}</MinimalLayout>;
}
