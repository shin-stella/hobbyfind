import { HOBBY_CATEGORIES } from '@/features/hobby/constants/categories';
import type { HobbyCategory } from '@/features/hobby/types';

export function isHobbyCategory(value: string): value is HobbyCategory {
  return (HOBBY_CATEGORIES as readonly string[]).includes(value);
}
