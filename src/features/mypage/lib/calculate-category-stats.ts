import { countBy } from 'es-toolkit';

import {
  CATEGORY_LABELS,
  HOBBY_CATEGORIES,
} from '@/features/hobby/constants/categories';
import type { Hobby, HobbyCategory } from '@/features/hobby/types';

export interface CategoryStat {
  category: HobbyCategory;
  label: string;
  count: number;
}

export const CATEGORY_CHART_COLORS: Record<HobbyCategory, string> = {
  sports: '#FF385C',
  intelligence: '#00A699',
  art: '#007A87',
};

export function calculateCategoryStats(hobbies: Hobby[]): CategoryStat[] {
  const counts = countBy(hobbies, (hobby) => hobby.category);

  return HOBBY_CATEGORIES.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    count: counts[category] ?? 0,
  }));
}
