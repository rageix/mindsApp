import { PropsWithChildren } from 'react';
import NewDashboardLayout from '@/components/Layouts/NewDashboardLayout';

interface Props extends PropsWithChildren {}

export default function Layout(props: Props) {
  return <NewDashboardLayout>{props.children}</NewDashboardLayout>;
}
