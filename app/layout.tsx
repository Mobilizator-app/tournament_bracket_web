import type { Metadata, Viewport } from 'next';
import { jost } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tournament Live',
  description: 'Live tournament bracket — follow results in real time.',
};

export const viewport: Viewport = {
  themeColor: '#151515',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jost.variable} dark`}>
      <body className="min-h-[100dvh] bg-bg text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
