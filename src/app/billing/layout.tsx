'use client';
import { PropsWithChildren } from 'react';
import useAuthentication from '@/hooks/UseAuthentication';
import MinimalLayout from '@/components/Layouts/MinimalLayout';

interface Props extends PropsWithChildren {}

export default function Layout(props: Props) {
  const authController = useAuthentication();

  if (!authController.isLoaded()) {
    return null;
  }

  return <MinimalLayout>{props.children}</MinimalLayout>;
}
