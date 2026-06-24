'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { HOBBIES } from '@/features/hobby/constants/hobbies';
import { useBookmarksQuery } from '@/features/hobby/hooks/use-bookmarks';
import { BookmarkList } from '@/features/mypage/components/BookmarkList';
import { CategoryStatsSection } from '@/features/mypage/components/CategoryStatsSection';
import { ProfileSection } from '@/features/mypage/components/ProfileSection';
import { calculateCategoryStats } from '@/features/mypage/lib/calculate-category-stats';
import { Footer } from '@/features/layout/components/Footer';
import { TopBar } from '@/features/layout/components/TopBar';

export function MyPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const { data: bookmarkedIds = [], isLoading: isBookmarksLoading } =
    useBookmarksQuery(isAuthenticated);

  const bookmarkedHobbies = useMemo(
    () => HOBBIES.filter((hobby) => bookmarkedIds.includes(hobby.id)),
    [bookmarkedIds],
  );

  const categoryStats = useMemo(
    () => calculateCategoryStats(bookmarkedHobbies),
    [bookmarkedHobbies],
  );

  const totalCount = bookmarkedHobbies.length;

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login?callbackUrl=/mypage');
    }
  }, [router, status]);

  if (status === 'loading' || status === 'unauthenticated') {
    return null;
  }

  const displayName = session?.user?.name ?? '회원';

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <TopBar />

      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-b from-bgMuted to-bg py-10">
          <div className="container">
            <h1 className="text-3xl font-bold tracking-tight text-text md:text-4xl">
              마이페이지
            </h1>
            <p className="mt-2 text-base text-textMuted">
              <span className="font-medium text-text">{displayName}</span>님,
              내 정보를 확인하고 북마크를 관리해 보세요.
            </p>
          </div>
        </section>

        <section className="container py-10">
          <div className="space-y-12">
            <ProfileSection />
            {isBookmarksLoading ? (
              <p className="text-sm text-textMuted">
                북마크 목록을 불러오는 중입니다...
              </p>
            ) : (
              <BookmarkList hobbies={bookmarkedHobbies} />
            )}
            <CategoryStatsSection
              totalCount={totalCount}
              categoryStats={categoryStats}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
