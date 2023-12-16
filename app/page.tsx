'use client';

import PreviewContent from '@/components/edit-portfolio/PreviewContent';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Portfolio Builder</title>
        <meta
          name="description"
          content="Create a great portfolio with MAKEIT"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/kakaoico.ico" />
      </Head>
      <main className="p-4 md:px-8 py-4">
        <PreviewContent />
      </main>
    </>
  );
}
