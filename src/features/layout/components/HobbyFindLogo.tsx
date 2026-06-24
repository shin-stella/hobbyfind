'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';

type HobbyFindLogoProps = {
  className?: string;
};

function HeartLogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('h-8 w-8 shrink-0', className)}
    >
      <rect
        width="32"
        height="32"
        rx="12"
        className="fill-primary"
      />
      <g transform="translate(0, 1.2)">
        <path
          d="M16 22.8C16 22.8 7.8 17.2 7.8 12.4C7.8 9.8 10 7.8 12.6 7.8C14.1 7.8 15.3 8.5 16 9.6C16.7 8.5 17.9 7.8 19.4 7.8C22 7.8 24.2 9.8 24.2 12.4C24.2 17.2 16 22.8 16 22.8Z"
          className="stroke-primary-foreground"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function HobbyFindLogo({ className }: HobbyFindLogoProps) {
  return (
    <Link
      href="/"
      aria-label="HobbyFind 홈으로 이동"
      className={cn(
        'inline-flex items-center gap-2 transition-opacity hover:opacity-90',
        className,
      )}
    >
      <HeartLogoIcon />
      <span className="text-xl font-bold tracking-tight text-text">
        HobbyFind
      </span>
    </Link>
  );
}
