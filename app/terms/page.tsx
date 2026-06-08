import type { Metadata } from 'next';
import { SiteShell } from '@/components/site/SiteShell';
import { LegalArticle, Section } from '@/components/site/Prose';
import {
  APP_NAME,
  CONTACT_EMAIL,
  DEVELOPER_NAME,
  LEGAL_EFFECTIVE_DATE,
} from '@/lib/constants';

export const metadata: Metadata = {
  title: `Terms of Use · ${APP_NAME}`,
  description: `Terms and Conditions for the ${APP_NAME} app.`,
};

export default function TermsPage() {
  return (
    <SiteShell>
      <LegalArticle
        title="Terms and Conditions"
        effectiveDate={LEGAL_EFFECTIVE_DATE}
      >
        <Section>
          <p>
            By downloading or using this app, you automatically agree to these
            terms. Therefore, please read them carefully before using the app. You
            are not allowed to copy or modify the app, any part of the app, or our
            trademarks in any way. Attempting to extract the source code of the
            app, translating the app into other languages, or creating derivative
            versions is also prohibited. All intellectual property rights related
            to the app, including trademarks, copyrights, and database rights,
            belong to {DEVELOPER_NAME}.
          </p>
          <p>
            {DEVELOPER_NAME} is dedicated to making the app as useful and
            efficient as possible. For this reason, we reserve the right to make
            changes to the app or to charge for its services at any time and for
            any reason. We will never charge you for the app or its services
            without clearly explaining what you are paying for.
          </p>
          <p>
            The {APP_NAME} app stores and processes personal data that you have
            provided to us to deliver our Service. It is your responsibility to
            keep your phone and access to the app secure. We recommend that you do
            not jailbreak or root your phone, which removes software restrictions
            and limitations imposed by your device&apos;s official operating
            system. This could make your phone vulnerable to
            malware/viruses/malicious programs, compromise your phone&apos;s
            security features, and prevent the {APP_NAME} app from working
            properly or at all.
          </p>
        </Section>

        <Section title="Third-Party Services">
          <p>
            The app uses third-party services that declare their own Terms and
            Conditions. Links to the Terms and Conditions of third-party service
            providers used by the app:
          </p>
          <ul>
            <li>
              <a
                href="https://developers.google.com/admob/terms"
                target="_blank"
                rel="noopener noreferrer"
              >
                AdMob
              </a>
            </li>
            <li>
              <a
                href="https://firebase.google.com/terms/analytics"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Analytics for Firebase
              </a>
            </li>
            <li>
              <a
                href="https://firebase.google.com/terms/crashlytics"
                target="_blank"
                rel="noopener noreferrer"
              >
                Firebase Crashlytics
              </a>
            </li>
            <li>
              <a
                href="https://www.revenuecat.com/terms"
                target="_blank"
                rel="noopener noreferrer"
              >
                RevenueCat
              </a>
            </li>
          </ul>
        </Section>

        <Section title="Liability">
          <p>
            {DEVELOPER_NAME} is not responsible for certain things. Some functions
            of the app require an active internet connection. The connection can
            be Wi-Fi or provided by your mobile network provider, but{' '}
            {DEVELOPER_NAME} cannot be held responsible if the app does not work
            fully due to lack of Wi-Fi or data allowance.
          </p>
          <p>
            If you use the app outside of Wi-Fi coverage, remember that your mobile
            network provider&apos;s terms and conditions will still apply. This
            means you may be charged by your mobile provider for data usage while
            accessing the app or other third-party charges. By using the app, you
            accept responsibility for any such charges, including roaming data
            charges if you use the app outside of your home region without turning
            off data roaming. If you are not the bill payer for the device, we
            assume you have received permission from the bill payer to use the app.
          </p>
          <p>
            Similarly, {DEVELOPER_NAME} is not responsible if your device runs out
            of battery and you cannot turn it on to use the Service. It is your
            responsibility to ensure your device remains charged.
          </p>
          <p>
            While using the app, please keep in mind that although we strive to
            ensure it is updated and correct at all times, we rely on third
            parties to provide information to us. {DEVELOPER_NAME} is not liable
            for any loss, direct or indirect, you experience as a result of
            relying wholly on the functionality of the app.
          </p>
          <p>
            We may update the app at some point. The app is currently available on
            iOS — the system requirements (and for any additional systems we
            extend the availability of the app to) may change, and you&apos;ll
            need to download the updates to continue using the app. {DEVELOPER_NAME}{' '}
            does not guarantee that the app will always be updated to be relevant
            to you and/or work with the iOS version you have installed. However,
            you agree to accept updates to the application when offered. We may
            also stop providing the app and terminate its use at any time without
            notice. Unless stated otherwise, upon termination, (a) the rights and
            licenses granted to you in these terms will end; (b) you must stop
            using the app and delete it from your device if necessary.
          </p>
        </Section>

        <Section title="Changes to These Terms and Conditions">
          <p>
            We may update our Terms and Conditions periodically. You are advised to
            review this page regularly for any changes. We will notify you of any
            changes by posting the new Terms and Conditions on this page. These
            terms and conditions are effective as of {LEGAL_EFFECTIVE_DATE}.
          </p>
        </Section>

        <Section title="Contact Us">
          <p>
            If you have any questions or suggestions about our Terms and
            Conditions, do not hesitate to contact us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </Section>
      </LegalArticle>
    </SiteShell>
  );
}
