import { NextResponse } from 'next/server';

/**
 * Contact-form endpoint (stub).
 *
 * It validates the payload and logs it server-side so the form is wired
 * end-to-end. To actually deliver messages, plug a provider in below:
 *   • Resend:    await resend.emails.send({ to: CONTACT_EMAIL, subject, text })
 *   • Formspree: await fetch('https://formspree.io/f/XXXX', { method:'POST', ... })
 *   • SMTP (nodemailer), or forward to the Go backend.
 */
export async function POST(req: Request) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const message = (body.message ?? '').trim();

  const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (!name || !emailOk || !message) {
    return NextResponse.json(
      { ok: false, error: 'invalid_input' },
      { status: 422 },
    );
  }

  // TODO: deliver the message via an email/form provider (see file header).
  console.log('[contact]', {
    name: name.slice(0, 200),
    email: email.slice(0, 200),
    message: message.slice(0, 2000),
  });

  return NextResponse.json({ ok: true });
}
