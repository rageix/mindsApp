import './globals.css';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { GeistSans } from 'geist/font/sans';
import { cn } from '@/util/Cn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProviderWrapper from '@/components/ProviderWrapper';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'cluvv',
  };
}

interface Props extends PropsWithChildren {}

export default function RootLayout({ children }: Props) {
  return (
    <html
      lang="en"
      className="min-h-screen h-full bg-gray-900 text-white dark:[color-scheme:dark]"
    >
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-intersecting-circles',
          GeistSans.className,
        )}
      >
        <ProviderWrapper>{children}</ProviderWrapper>
        <ToastContainer />
      </body>
    </html>
  );
}
