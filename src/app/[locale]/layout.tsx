import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';

import '../globals.css'

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const message = await getMessages({ locale })

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={message}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
