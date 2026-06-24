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

const CATEGORY_BADGE_CLASSNAMES: Record<HobbyCategory, string> = {
  sports: '',
  intelligence: '',
  art: 'border-border bg-white text-foreground hover:bg-white',
};

interface CategoryBadgeProps {
  category: HobbyCategory;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <Badge
      variant={CATEGORY_BADGE_VARIANTS[category]}
      className={cn(CATEGORY_BADGE_CLASSNAMES[category], className)}
    >
      {CATEGORY_LABELS[category]}
    </Badge>
  );
}
