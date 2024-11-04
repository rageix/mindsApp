import { PropsWithChildren } from 'react';
import DashboardLayout from '@/components/Layouts/DashboardLayout';

interface Props extends PropsWithChildren {}

export default function Layout(props: Props) {
  return <DashboardLayout>{props.children}</DashboardLayout>;
}
