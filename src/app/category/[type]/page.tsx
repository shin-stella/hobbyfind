'use client';

import { notFound } from 'next/navigation';
import { use } from 'react';

import { CategoryPage } from '@/features/category/components/CategoryPage';
import { isHobbyCategory } from '@/features/category/lib/is-hobby-category';

interface CategoryRoutePageProps {
  params: Promise<{ type: string }>;
}

export default function CategoryRoutePage({ params }: CategoryRoutePageProps) {
  const { type } = use(params);

  if (!isHobbyCategory(type)) {
    notFound();
  }

  return <CategoryPage category={type} />;
}
