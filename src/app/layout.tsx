import type { Metadata } from 'next';

import localFont from 'next/font/local';

import Footer from '@/components/footer/footer';
import './globals.css';

import AuthProviders from '../components/providers/AuthProviders';
import UIProviders from '@/components/providers/UIProviders';
import QueryProviders from '@/components/providers/QueryProviders';
import ToastProvider from '@/components/providers/ToastProvider';
import Transition from '@/app/Transition';

const KMITL2020 = localFont({
  src: [
    { path: '../../public/fonts/KMITL 2020 Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/KMITL 2020 Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/KMITL 2020 Italic.woff2', weight: '400', style: 'italic' },
    { path: '../../public/fonts/KMITL 2020 Bold Italic.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--font-kmitl2020', // ✅ ใช้ตัวแปร CSS เพื่อใช้งานกับ Tailwind หรือ Global Styles
  display: 'swap',
});

export const metadata: Metadata = {
  title: '3 Kings',
  description: 'ร่วมเป็นส่วนหนึ่งของประเพณีอันทรงเกียรติและการแข่งขันฟุตบอลที่ยิ่งใหญ่ที่สุดของ 3 สถาบัน',
  icons: [
    {
      media: '(prefers-color-scheme: light)',
      url: '/images/logo.webp',
      type: 'image/webp',
    },
    {
      media: '(prefers-color-scheme: dark)',
      url: '/images/logo_light.webp',
      type: 'image/webp',
    },
  ],
  openGraph: {
    title: '3Kings',
    description:
      'ฟุตบอลประเพณีชิงถ้วยพระราชทานสมเด็จพระกนิษฐาธิราชเจ้า กรมสมเด็จพระเทพรัตนราชสุดาฯ สยามบรมราชกุมารีและกีฬา 3 พระจอมเกล้า ครั้งที่ 16',
    url: 'https://3kgames.16th.kmitl.ac.th',
    siteName: '3Kings',
    images: [
      {
        url: '/images/og.png',
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '3kgames.16th.kmitl.ac.th',
    title: '3Kings',
    description:
      'ฟุตบอลประเพณีชิงถ้วยพระราชทานสมเด็จพระกนิษฐาธิราชเจ้า กรมสมเด็จพระเทพรัตนราชสุดาฯ สยามบรมราชกุมารีและกีฬา 3 พระจอมเกล้า ครั้งที่ 16',
    images: ['/images/og.png'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="../images/logo.webp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${KMITL2020.className} antialiased`}>
        <AuthProviders>
          <UIProviders>
            <QueryProviders>
              <ToastProvider />
              <Transition>{children}</Transition>
            </QueryProviders>
          </UIProviders>
        </AuthProviders>
        <Footer />
      </body>
    </html>
  );
}
