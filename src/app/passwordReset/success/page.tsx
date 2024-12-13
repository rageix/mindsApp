import { Metadata } from 'next';
import Link from 'next/link';
import SuccessView from '@/components/SuccessView';
import Button from '@/components/Buttton';

export const metadata: Metadata = {
  title: 'Verify email - success',
};

const message = (
  <div className="flex flex-col space-y-2">
    <p>Your password has been updated.</p>
    <p>You can continue to use the website normally.</p>
  </div>
);

export default async function Page() {
  return (
    <SuccessView
      h2="Success!"
      message={message}
    >
      <p className="mt-6 mx-auto max-w-sm">
        <Link href="/login">
          <Button variant="blue">Log in</Button>
        </Link>
      </p>
    </SuccessView>
  );
}
