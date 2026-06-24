'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  CATEGORY_LABELS,
  CATEGORY_ROUTES,
  HOBBY_CATEGORIES,
} from '@/features/hobby/constants/categories';
import { cn } from '@/lib/utils';

interface CategoryMenuProps {
  className?: string;
  onNavigate?: () => void;
  variant?: 'dropdown' | 'inline';
}

export function CategoryMenu({
  className,
  onNavigate,
  variant = 'dropdown',
}: CategoryMenuProps) {
  if (variant === 'inline') {
    return (
      <nav
        className={cn('flex flex-col gap-1', className)}
        aria-label="카테고리 메뉴"
      >
        <p className="px-4 py-2 text-sm font-semibold text-text">카테고리</p>
        {HOBBY_CATEGORIES.map((category) => (
          <Link
            key={category}
            href={CATEGORY_ROUTES[category]}
            onClick={onNavigate}
            className="block rounded-md px-4 py-2 text-sm font-medium text-text transition-colors duration-150 hover:bg-bgMuted"
          >
            {CATEGORY_LABELS[category]}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn('gap-1 font-medium', className)}
        >
          카테고리
          <ChevronDown className="h-4 w-4" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[8rem]">
        {HOBBY_CATEGORIES.map((category) => (
          <DropdownMenuItem key={category} asChild>
            <Link href={CATEGORY_ROUTES[category]} onClick={onNavigate}>
              {CATEGORY_LABELS[category]}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
