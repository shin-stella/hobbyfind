import type { HobbyCategory } from '@/features/hobby/types';

export const HOBBY_CATEGORIES: HobbyCategory[] = [
  'sports',
  'intelligence',
  'art',
];

export const CATEGORY_LABELS: Record<HobbyCategory, string> = {
  sports: '운동형',
  intelligence: '지능형',
  art: '예술형',
};

export const CATEGORY_ROUTES: Record<HobbyCategory, string> = {
  sports: '/category/sports',
  intelligence: '/category/intelligence',
  art: '/category/art',
};

export const CATEGORY_DESCRIPTIONS: Record<HobbyCategory, string> = {
  sports:
    '운동형 취미는 신체 활동을 통해 건강과 활력을 증진시키는 취미입니다.',
  intelligence:
    '지능형 취미는 사고력과 창의력을 키우며 새로운 지식을 쌓는 취미입니다.',
  art: '예술형 취미는 표현력과 감성을 키우며 아름다움을 창조하는 취미입니다.',
};
