import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const notoSansKor = Noto_Sans_KR({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
  title: '@nkakmk',
  description: 'dev blog by nkakmk',
  icons: {
    icon: [
      {
        url: '/icon?<generated>',
      },
    ],
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko" className={notoSansKor.variable}>
      <body className="max-w-2xl mx-auto px-5 py-12 bg-[--bg] text-[--text]">
        <header className="flex place-content-between mb-20">
          <h1>
            <Link href="/">@nkakmk</Link>
          </h1>
          <ul className="flex">
            <li className="mr-3">
              <Link href="/about">about</Link>
            </li>
          </ul>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
