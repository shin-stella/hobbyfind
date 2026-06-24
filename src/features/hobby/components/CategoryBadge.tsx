'use client';

import { Badge } from '@/components/ui/badge';
import { CATEGORY_LABELS } from '@/features/hobby/constants/categories';
import type { HobbyCategory } from '@/features/hobby/types';
import { cn } from '@/lib/utils';

const CATEGORY_BADGE_VARIANTS: Record<
  HobbyCategory,
  'default' | 'secondary' | 'outline'
> = {
  sports: 'default',
  intelligence: 'secondary',
  art: 'outline',
};

interface CategoryBadgeProps {
  category: HobbyCategory;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <Badge
      variant={CATEGORY_BADGE_VARIANTS[category]}
      className={cn(className)}
    >
      {CATEGORY_LABELS[category]}
    </Badge>
  );
}
