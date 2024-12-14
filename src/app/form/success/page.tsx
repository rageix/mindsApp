import { Metadata } from 'next';
import SuccessView from '@/components/SuccessView';

export const metadata: Metadata = {
  title: 'cluvv - Success',
};

const message = (
  <div className="space-y-6">
    <p>Your response has been recorded.</p>
    <p className="text-sm">You can now close this window.</p>
  </div>
);

export default async function Page() {
  return (
    <SuccessView
      h2="Thanks!"
      message={message}
    />
  );
}
