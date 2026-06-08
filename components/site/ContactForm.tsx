'use client';

import { useState } from 'react';
import { CONTACT_EMAIL } from '@/lib/constants';
import { analytics } from '@/lib/events';

type Status = 'idle' | 'sending' | 'ok' | 'error';

const INPUT =
  'w-full rounded-input border border-surface-border bg-surface px-4 py-3 text-text-primary placeholder:text-text-secondary outline-none transition-colors focus:border-accent-green';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setStatus('ok');
      setForm({ name: '', email: '', message: '' });
      analytics.contactSubmit(true);
    } catch {
      setStatus('error');
      analytics.contactSubmit(false);
    }
  }

  if (status === 'ok') {
    return (
      <div className="rounded-card border border-accent-green/40 bg-surface p-8 text-center">
        <p className="text-lg font-bold text-accent-green">Message sent</p>
        <p className="mt-1 text-text-secondary">
          Thanks for reaching out — we&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          className={INPUT}
          placeholder="Your name"
          value={form.name}
          onChange={update('name')}
          required
          autoComplete="name"
        />
        <input
          className={INPUT}
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={update('email')}
          required
          autoComplete="email"
        />
      </div>
      <textarea
        className={`${INPUT} min-h-[150px] resize-y`}
        placeholder="Your message"
        value={form.message}
        onChange={update('message')}
        required
      />
      {status === 'error' && (
        <p className="text-sm text-accent-red">
          Couldn&apos;t send your message. Please email us at{' '}
          <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}
      <div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-full bg-accent-red px-7 py-3 font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}
