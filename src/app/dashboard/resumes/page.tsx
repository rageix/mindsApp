import ResumesView from '@/components/ResumesView';
import { Metadata } from 'next';
import { pageTitle } from '@/types/PageTitle';

export const metadata: Metadata = {
  title: pageTitle('My Resumes'),
};

export default function Page() {
  return <ResumesView />;
}
