'use client';

import { useMemo } from 'react';

import { CategoryHeader } from '@/features/category/components/CategoryHeader';
import { HOBBIES } from '@/features/hobby/constants/hobbies';
import { HobbyCardGrid } from '@/features/hobby/components/HobbyCardGrid';
import { filterHobbies } from '@/features/hobby/lib/filter-hobbies';
import type { HobbyCategory } from '@/features/hobby/types';
import { Footer } from '@/features/layout/components/Footer';
import { TopBar } from '@/features/layout/components/TopBar';

interface CategoryPageProps {
  category: HobbyCategory;
}

export function CategoryPage({ category }: CategoryPageProps) {
  const filteredHobbies = useMemo(
    () => filterHobbies(HOBBIES, category),
    [category],
  );

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <TopBar />

      <main className="flex-1">
        <CategoryHeader category={category} />

        <section className="container pb-16">
          <HobbyCardGrid hobbies={filteredHobbies} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
