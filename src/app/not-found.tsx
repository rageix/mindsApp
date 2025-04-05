import { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/Buttton';

export const metadata: Metadata = {
  title: '404 - Page not found',
};

export default async function NotFound() {
  return (
    <div className="grid place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-2xl font-semibold text-gray-400">404</p>
        <h1
          className={
            'mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'
          }
        >
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-700">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <p className="mt-3">
          <Link
            className="text-blue-600 hover:text-blue-400 flex justify-center"
            href="/"
          >
            <Button
              variant="link"
              isInline
            >
              Go home
            </Button>
          </Link>
        </p>
      </div>
    </div>
  );
}
