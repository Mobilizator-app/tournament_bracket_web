import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import { AppStoreButton } from '@/components/layout/AppStoreButton';
import { PlayStoreButton } from '@/components/layout/PlayStoreButton';

const NAV = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/contact', label: 'Contact' },
];

/** Marketing-site header: brand → home, nav links, store buttons. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-surface-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-3 md:px-8 md:py-4">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 md:gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt={APP_NAME}
            className="h-9 w-9 shrink-0 rounded-[8px] md:h-11 md:w-11 md:rounded-[10px]"
          />
          <span className="hidden text-base font-bold tracking-wide text-text-primary sm:inline md:text-lg">
            {APP_NAME}
          </span>
        </Link>
        <div className="flex items-center gap-5 md:gap-7">
          <nav className="hidden items-center gap-6 text-sm font-semibold text-text-secondary sm:flex">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="transition-colors hover:text-text-primary"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 md:gap-3">
            <AppStoreButton placement="header" />
            <PlayStoreButton placement="header" />
          </div>
        </div>
      </div>
    </header>
  );
}
