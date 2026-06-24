'use client';

import { useMemo, useState } from 'react';

import { CategoryFilter } from '@/features/home/components/CategoryFilter';
import {
  HeroSection,
  HOBBY_EXPLORE_SECTION_ID,
} from '@/features/home/components/HeroSection';
import { HOBBIES } from '@/features/hobby/constants/hobbies';
import { HobbyCardGrid } from '@/features/hobby/components/HobbyCardGrid';
import { filterHobbies } from '@/features/hobby/lib/filter-hobbies';
import type { CategoryFilterValue } from '@/features/hobby/types';
import { Footer } from '@/features/layout/components/Footer';
import { TopBar } from '@/features/layout/components/TopBar';

export function HomePage() {
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilterValue>('all');

  const filteredHobbies = useMemo(
    () => filterHobbies(HOBBIES, categoryFilter),
    [categoryFilter],
  );

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <TopBar />

      <main className="flex-1">
        <HeroSection />

        <section id={HOBBY_EXPLORE_SECTION_ID} className="container scroll-mt-24 pb-16 pt-8">
          <header className="mx-auto mb-6 max-w-3xl text-center">
            <h4 className="mb-2 text-xl font-bold tracking-tight text-text">
              카테고리별 취미 탐색
            </h4>
            <p className="text-sm leading-6 text-textMuted">
              관심있는 카테고리를 선택하여 다양한 취미를 발견해보세요.
            </p>
          </header>

          <CategoryFilter
            value={categoryFilter}
            onChange={setCategoryFilter}
            className="mb-8"
          />
          <HobbyCardGrid hobbies={filteredHobbies} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
