import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ViewTransitions } from 'next-view-transitions';

import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Thirsty Virginia - Hampton Roads Beer Events Platform',
  description:
    'Beer Platform to help you find events for your local hampton road breweries. Food trucks, events, beer releases & more!',
  icons: {
    icon: '/assets/images/thirstyfav.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <ClerkProvider>
        <html lang="en">
          <body className={poppins.variable}>{children}</body>
        </html>
      </ClerkProvider>
    </ViewTransitions>
  );
}
