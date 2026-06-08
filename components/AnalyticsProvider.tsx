'use client';

import { useEffect } from 'react';
import { initAnalytics } from '@/lib/firebase';
import { analytics } from '@/lib/events';

/**
 * Boots Firebase Analytics and reports uncaught errors as `exception` events
 * (the web equivalent of Crashlytics, which doesn't exist for web).
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initAnalytics();

    const onError = (e: ErrorEvent) =>
      analytics.exception(e.message ?? 'error', false);
    const onRejection = (e: PromiseRejectionEvent) =>
      analytics.exception(String(e.reason ?? 'unhandledrejection'), false);

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, []);

  return <>{children}</>;
}
