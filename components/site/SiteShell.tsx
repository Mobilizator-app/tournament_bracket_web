import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

/** Full-height marketing layout: header + content + footer. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-bg">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
