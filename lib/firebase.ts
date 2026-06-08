import {
  initializeApp,
  getApps,
  getApp,
  type FirebaseApp,
} from 'firebase/app';
import {
  getAnalytics,
  isSupported,
  logEvent,
  type Analytics,
} from 'firebase/analytics';

// Web Firebase config (apiKey is public for web apps — safe to ship).
const firebaseConfig = {
  apiKey: 'AIzaSyDolcq2IZOTEqLsAFJAmyTqKtIq2SGRv_M',
  authDomain: 'bracket-web.firebaseapp.com',
  projectId: 'bracket-web',
  storageBucket: 'bracket-web.firebasestorage.app',
  messagingSenderId: '553613801275',
  appId: '1:553613801275:web:3de7a68100b7723e20a91e',
  measurementId: 'G-6LL6L0TZ0S',
};

let analytics: Analytics | null = null;
let initPromise: Promise<Analytics | null> | null = null;

/** Lazily initializes Firebase Analytics in the browser only (no-op on SSR). */
export function initAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined') return Promise.resolve(null);
  initPromise ??= isSupported()
    .then((ok) => {
      if (!ok) return null;
      const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
      analytics = getAnalytics(app);
      return analytics;
    })
    .catch(() => null);
  return initPromise;
}

/** Safe analytics event — fire-and-forget, never throws. */
export function track(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  initAnalytics().then((a) => {
    if (!a) return;
    try {
      logEvent(a, event, params);
    } catch {
      /* ignore */
    }
  });
}
