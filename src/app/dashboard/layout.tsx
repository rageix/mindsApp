'use client';
import { PropsWithChildren } from 'react';
import NewDashboardLayout from '@/components/Layouts/NewDashboardLayout';
import useAuthentication from '@/hooks/UseAuthentication';

interface Props extends PropsWithChildren {}

export default function Layout(props: Props) {
  const authController = useAuthentication();

  if (!authController.isLoaded()) {
    return null;
  }
  return <NewDashboardLayout>{props.children}</NewDashboardLayout>;
}
