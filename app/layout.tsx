import type { Metadata, Viewport } from 'next';
import { jost } from '@/lib/fonts';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { APP_NAME, SITE_URL } from '@/lib/constants';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${APP_NAME} — Tournament Bracket Maker`,
  description:
    'Create custom tournament brackets for sports and esports — single & double elimination, round-robin, Swiss and groups. Share them live.',
  openGraph: { siteName: APP_NAME, type: 'website', images: ['/logo.png'] },
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
        <AnalyticsProvider>
          <ErrorBoundary>{children}</ErrorBoundary>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
