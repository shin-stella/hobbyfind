'use client';

import type { ReactNode } from 'react';

import { Footer } from '@/features/layout/components/Footer';
import { TopBar } from '@/features/layout/components/TopBar';

interface AuthPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  footerLink: ReactNode;
}

export function AuthPageLayout({
  title,
  description,
  children,
  footerLink,
}: AuthPageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <TopBar />

      <main className="container flex flex-1 flex-col items-center px-4 pb-16 pt-16">
        <div className="w-full max-w-sm space-y-6">
          <header className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-text">
              {title}
            </h1>
            <p className="text-sm leading-6 text-textMuted">{description}</p>
          </header>

          {children}

          <div className="text-center text-sm text-textMuted">{footerLink}</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
