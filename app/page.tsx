import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';
import { SiteShell } from '@/components/site/SiteShell';
import { AppStoreButton } from '@/components/layout/AppStoreButton';
import { ContactForm } from '@/components/site/ContactForm';

export const metadata: Metadata = {
  title: `${APP_NAME} — Tournament Bracket Maker`,
  description:
    'Create custom tournament brackets for sports and esports — single & double elimination, round-robin, Swiss and groups. Share them live.',
};

const FEATURES = [
  {
    title: 'Every format',
    body: 'Single & double elimination, round-robin, Swiss system, and group stages with playoffs — seeded or random.',
  },
  {
    title: 'Go live in a tap',
    body: 'Share a link or QR code and let everyone follow the bracket update in real time, right in their browser. No sign-up, no app required.',
  },
  {
    title: 'Built for competition',
    body: 'Score tracking, automatic standings, champion highlights, and PDF export for sports and esports events.',
  },
];

export default function Home() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-16 text-center md:pb-24 md:pt-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt={APP_NAME}
          className="mx-auto h-20 w-20 rounded-[18px] shadow-lg md:h-24 md:w-24"
        />
        <h1 className="mx-auto mt-7 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-text-primary md:text-6xl">
          Create custom tournament brackets
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-text-secondary md:text-xl">
          For sports and esports competitions — build your bracket in minutes and
          broadcast it live to every player and fan.
        </p>
        <div className="mt-9 flex items-center justify-center">
          <AppStoreButton />
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 pb-8 md:pb-16">
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-card border border-surface-border bg-surface p-6"
            >
              <h3 className="text-lg font-bold text-text-primary">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-text-secondary">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="mx-auto max-w-3xl scroll-mt-20 px-6 py-16 md:py-20"
      >
        <h2 className="text-center text-3xl font-bold text-text-primary md:text-4xl">
          Contact us
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-text-secondary">
          Questions, feedback, or feature requests? Send us a message.
        </p>
        <div className="mt-8">
          <ContactForm />
        </div>
      </section>
    </SiteShell>
  );
}
