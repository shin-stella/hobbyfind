'use client';

import { Button } from '@/components/ui/button';
import { CATEGORY_LABELS } from '@/features/hobby/constants/categories';
import { HOBBY_CATEGORIES } from '@/features/hobby/constants/categories';
import type { CategoryFilterValue } from '@/features/hobby/types';
import { cn } from '@/lib/utils';

const FILTER_OPTIONS: { value: CategoryFilterValue; label: string }[] = [
  { value: 'all', label: '전체' },
  ...HOBBY_CATEGORIES.map((category) => ({
    value: category,
    label: CATEGORY_LABELS[category],
  })),
];

interface CategoryFilterProps {
  value: CategoryFilterValue;
  onChange: (value: CategoryFilterValue) => void;
  className?: string;
}

export function CategoryFilter({
  value,
  onChange,
  className,
}: CategoryFilterProps) {
  return (
    <div
      className={cn('flex flex-wrap justify-center gap-2', className)}
      role="group"
      aria-label="카테고리 필터"
    >
      {FILTER_OPTIONS.map((option) => {
        const isActive = value === option.value;

        return (
          <Button
            key={option.value}
            type="button"
            variant={isActive ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onChange(option.value)}
            className={cn(
              'rounded-full px-4 transition-colors duration-150',
              isActive
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'hover:bg-primary/10 hover:text-primary',
            )}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
}
