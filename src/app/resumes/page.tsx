import ResumeView from '../../components/ResumeView';
import { Metadata } from 'next';
import { pageTitle } from '@/types/PageTitle';

export const metadata: Metadata = {
  title: pageTitle('Resume Builder'),
};

export default function Page() {
  return <ResumeView />;
}
