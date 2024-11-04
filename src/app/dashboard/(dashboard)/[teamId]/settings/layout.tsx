import { PropsWithChildren } from 'react';
import SettingsLayout from '@/components/Layouts/SettingsLayout';

interface Props extends PropsWithChildren {}

export default function Layout(props: Props) {
  return <SettingsLayout>{props.children}</SettingsLayout>;
}
