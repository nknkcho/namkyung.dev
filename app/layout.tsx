import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '@nkakmk',
  description: 'Generated by create next app',
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
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;