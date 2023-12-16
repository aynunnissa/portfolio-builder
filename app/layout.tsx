import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/App.scss';
import { Providers } from '@/store/providers';
import Layout from '@/components/layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio Builder',
  description: 'Keep your portfolio accurate and up-to-date with ease',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <Layout>{children}</Layout>
        </body>
      </html>
    </Providers>
  );
}
