'use client';
import { PropsWithChildren } from 'react';
import useAuthentication from '@/hooks/UseAuthentication';
import DashboardLayout from '@/components/Layouts/DashboardLayout';

interface Props extends PropsWithChildren {}

export default function Layout(props: Props) {
  const authController = useAuthentication();

  if (!authController.isLoaded()) {
    return null;
  }
  return <DashboardLayout>{props.children}</DashboardLayout>;
}
