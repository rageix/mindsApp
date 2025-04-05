import './globals.css';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
// import { GeistSans } from 'geist/font/sans';
import { cn } from '@/util/Cn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProviderWrapper from '@/components/ProviderWrapper';
import OuterPageWrapper from '@/components/OuterPageWrapper';
import { GoogleAnalytics } from '@next/third-parties/google';
import { inter } from '@/util/Fonts';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'gigabrainai',
  };
}

interface Props extends PropsWithChildren {}

export default function RootLayout({ children }: Props) {
  return (
    <html
      lang="en"
      className="min-h-screen h-full"
    >
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        {/*<script src="https://analytics.ahrefs.com/analytics.js" data-key="wlPyvpkqwFV5xrCfpd2trg" async/>*/}
      </head>
      <body className={cn('min-h-screen', inter.className)}>
        <ProviderWrapper>
          <OuterPageWrapper>{children}</OuterPageWrapper>
        </ProviderWrapper>
        <GoogleAnalytics gaId="G-TK8HQHJF67" />
        <ToastContainer />
      </body>
    </html>
  );
}
