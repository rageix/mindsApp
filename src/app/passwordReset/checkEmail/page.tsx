import { Metadata } from 'next';
import SuccessView from '@/components/SuccessView';
import Button from '@/components/Buttton';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Password reset - Check email',
};

const message = (
  <div className="flex flex-col space-y-2">
    <p>
      If your email is in our system you should receive a password reset email
      shortly.
    </p>
    <p>Follow the link in the email to finish resetting your password.</p>
    <p>If you don&apos;t see the email please check your spam folder.</p>
  </div>
);

export default async function Page() {
  return (
    <SuccessView
      h2="Check your email"
      message={message}
    >
      <p className="mt-6 mx-auto max-w-sm">
        <Link href="/">
          <Button variant="blue">Go Home</Button>
        </Link>
      </p>
    </SuccessView>
  );
}
