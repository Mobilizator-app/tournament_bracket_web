import Link from 'next/link';
import { APP_NAME, CONTACT_EMAIL } from '@/lib/constants';

/** Marketing-site footer: copyright + legal/contact links. */
export function SiteFooter() {
  return (
    <footer className="border-t border-surface-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="text-sm text-text-secondary">
          © 2024–2026 {APP_NAME}. All rights reserved.
        </p>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-text-secondary">
          <Link href="/" className="transition-colors hover:text-text-primary">
            Home
          </Link>
          <Link
            href="/privacy"
            className="transition-colors hover:text-text-primary"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="transition-colors hover:text-text-primary"
          >
            Terms
          </Link>
          <Link
            href="/contact"
            className="transition-colors hover:text-text-primary"
          >
            Contact
          </Link>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="transition-colors hover:text-text-primary"
          >
            {CONTACT_EMAIL}
          </a>
        </nav>
      </div>
    </footer>
  );
}
