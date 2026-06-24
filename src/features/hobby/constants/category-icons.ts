import { Brain, Dumbbell, Palette, type LucideIcon } from 'lucide-react';

import type { HobbyCategory } from '@/features/hobby/types';

export const CATEGORY_ICONS: Record<HobbyCategory, LucideIcon> = {
  sports: Dumbbell,
  intelligence: Brain,
  art: Palette,
};

export const CATEGORY_ICON_CLASSES: Record<HobbyCategory, string> = {
  sports: 'bg-primary/10 text-primary',
  intelligence: 'bg-secondary/10 text-secondary',
  art: 'bg-bgMuted text-text',
};
