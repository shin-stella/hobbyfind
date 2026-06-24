'use client';

import { Menu } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { AuthMenu } from '@/features/layout/components/AuthMenu';
import { CategoryMenu } from '@/features/layout/components/CategoryMenu';
import { HobbyFindLogo } from '@/features/layout/components/HobbyFindLogo';

export function TopBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg shadow-sm">
      <div className="container flex h-16 items-center justify-between gap-4">
        <HobbyFindLogo />

        <div className="hidden items-center gap-6 md:flex">
          <CategoryMenu />
          <AuthMenu />
        </div>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="메뉴 열기"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>메뉴</SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-8">
              <CategoryMenu variant="inline" onNavigate={closeMobileMenu} />
              <AuthMenu
                className="flex-col items-stretch [&_a]:w-full [&_button]:w-full"
                onNavigate={closeMobileMenu}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
