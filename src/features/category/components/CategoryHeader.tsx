'use client';

import {
  CATEGORY_DESCRIPTIONS,
  CATEGORY_LABELS,
} from '@/features/hobby/constants/categories';
import {
  CATEGORY_ICON_CLASSES,
  CATEGORY_ICONS,
} from '@/features/hobby/constants/category-icons';
import type { HobbyCategory } from '@/features/hobby/types';
import { cn } from '@/lib/utils';

interface CategoryHeaderProps {
  category: HobbyCategory;
  className?: string;
}

export function CategoryHeader({ category, className }: CategoryHeaderProps) {
  const Icon = CATEGORY_ICONS[category];

  return (
    <header
      className={cn(
        'mx-auto max-w-3xl px-4 py-12 text-center',
        className,
      )}
    >
      <div
        className={cn(
          'mx-auto mb-4 inline-flex items-center justify-center rounded-2xl p-4',
          CATEGORY_ICON_CLASSES[category],
        )}
        aria-hidden
      >
        <Icon className="h-10 w-10" />
      </div>
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-text 2xl:text-5xl">
        {CATEGORY_LABELS[category]}
      </h1>
      <p className="text-base leading-6 text-textMuted md:text-lg md:leading-7">
        {CATEGORY_DESCRIPTIONS[category]}
      </p>
    </header>
  );
}
