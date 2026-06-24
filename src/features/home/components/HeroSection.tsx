'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import {
  ArrowDown,
  Compass,
  Infinity,
  LayoutGrid,
  Sparkles,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { HOBBY_CATEGORIES } from '@/features/hobby/constants/categories';
import { HOBBIES } from '@/features/hobby/constants/hobbies';

export const HOBBY_EXPLORE_SECTION_ID = 'hobby-explore';

const heroStats = [
  {
    label: '등록된 취미',
    value: String(HOBBIES.length),
    icon: Sparkles,
    iconClassName: 'text-primary',
  },
  {
    label: '카테고리',
    value: String(HOBBY_CATEGORIES.length),
    icon: LayoutGrid,
    iconClassName: 'text-secondary',
  },
  {
    label: '무한대의 가능성',
    value: '∞',
    icon: Infinity,
    iconClassName: 'text-accent',
  },
] as const;

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
} as const;

const itemVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
} as const;

function scrollToHobbyExplore() {
  document
    .getElementById(HOBBY_EXPLORE_SECTION_ID)
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function HeroSection() {
  const { data: session } = useSession();

  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={containerVariants}
      className="relative overflow-hidden border-b border-border bg-gradient-to-b from-bgMuted via-bg to-bg"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-secondary/10 blur-3xl"
      />

      <div className="container relative mx-auto max-w-4xl px-4 py-14 text-center md:py-20">
        <motion.p
          variants={itemVariants}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-bg px-4 py-1.5 text-sm font-medium text-textMuted"
        >
          <Sparkles className="h-4 w-4 text-primary" aria-hidden />
          취미 찾기의 설렘과 간편함
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="mb-5 text-4xl font-bold tracking-tight text-text 2xl:text-5xl"
        >
          나만의 취미,
          <br className="sm:hidden" />
          <span className="text-primary"> 설레는 첫걸음</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto max-w-2xl text-base leading-7 text-textMuted md:text-lg md:leading-8"
        >
          바쁜 일상 속 잊고 있던 작은 설렘을 다시 만나보세요.<br/>
          운동·지능·예술, 마음이 이끄는 취미를 발견하고 북마크하여 관리할 수 있습니다.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            size="lg"
            className="min-w-[160px] rounded-full px-8 shadow-md"
            onClick={scrollToHobbyExplore}
          >
            <Compass className="mr-2 h-4 w-4" aria-hidden />
            취미 탐색하기
          </Button>

          {session?.user ? (
            <Button
              size="lg"
              variant="outline"
              className="min-w-[160px] rounded-full px-8"
              asChild
            >
              <Link href="/mypage">내 북마크 보기</Link>
            </Button>
          ) : (
            <Button
              size="lg"
              variant="outline"
              className="min-w-[160px] rounded-full px-8"
              asChild
            >
              <Link href="/signup">회원가입</Link>
            </Button>
          )}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mx-auto mt-10 flex max-w-2xl items-start justify-center divide-x divide-border/60"
        >
          {heroStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="flex flex-1 flex-col items-center px-4 sm:px-8"
              >
                <div className="flex items-center justify-center gap-1.5">
                  <Icon
                    className={`h-4 w-4 shrink-0 ${stat.iconClassName}`}
                    aria-hidden
                  />
                  <span className="text-xs text-textMuted sm:text-sm">
                    {stat.label}
                  </span>
                </div>
                <p className="mt-2 text-2xl font-bold tabular-nums tracking-tight text-text sm:text-3xl">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </motion.div>

        <motion.button
          variants={itemVariants}
          type="button"
          onClick={scrollToHobbyExplore}
          className="mt-10 inline-flex flex-col items-center gap-1 text-sm text-textMuted transition-colors hover:text-primary"
          aria-label="아래 취미 목록으로 이동"
        >
          <span>아래에서 취미를 둘러보세요</span>
          <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden />
        </motion.button>
      </div>
    </motion.section>
  );
}
