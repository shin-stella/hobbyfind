import type { CategoryFilterValue, Hobby } from '@/features/hobby/types';

export function filterHobbies(
  hobbies: Hobby[],
  filter: CategoryFilterValue,
): Hobby[] {
  if (filter === 'all') {
    return hobbies;
  }

  return hobbies.filter((hobby) => hobby.category === filter);
}
