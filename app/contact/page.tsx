import type { Metadata } from 'next';
import { SiteShell } from '@/components/site/SiteShell';
import { ContactForm } from '@/components/site/ContactForm';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Contact · ${APP_NAME}`,
  description: `Get in touch with the ${APP_NAME} team.`,
};

export default function ContactPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
        <h1 className="text-3xl font-bold text-text-primary md:text-4xl">
          Contact us
        </h1>
        <p className="mt-3 text-text-secondary">
          Questions, feedback, or feature requests? Send us a message and
          we&apos;ll get back to you soon.
        </p>
        <div className="mt-8">
          <ContactForm />
        </div>
      </div>
    </SiteShell>
  );
}
