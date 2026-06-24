'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AuthPageLayout } from '@/features/auth/components/AuthPageLayout';
import {
  loginSchema,
  type LoginFormValues,
} from '@/features/auth/constants/auth-schemas';
import { mapAuthError } from '@/features/auth/lib/map-auth-error';
import { cn } from '@/lib/utils';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace(callbackUrl);
    }
  }, [callbackUrl, router, status]);

  const triggerShake = () => {
    setIsShaking(true);
    window.setTimeout(() => setIsShaking(false), 400);
  };

  const onSubmit = async (values: LoginFormValues) => {
    setAuthError(null);
    setIsSubmitting(true);

    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    setIsSubmitting(false);

    if (result?.error) {
      setAuthError(mapAuthError(result.error));
      triggerShake();
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  if (status === 'loading' || session?.user) {
    return null;
  }

  return (
    <AuthPageLayout
      title="로그인"
      description="HobbyFind에 로그인하고 관심 취미를 저장해 보세요."
      footerLink={
        <>
          아직 계정이 없으신가요?{' '}
          <Link
            href="/signup"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            회원가입
          </Link>
        </>
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn('space-y-4', isShaking && 'animate-shake')}
          noValidate
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>아이디 (이메일)</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="focus-visible:ring-4 focus-visible:ring-primary/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="current-password"
                    placeholder="비밀번호를 입력하세요"
                    className="focus-visible:ring-4 focus-visible:ring-primary/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {authError ? (
            <p className="text-sm font-medium text-red-500" role="alert">
              {authError}
            </p>
          ) : null}

          <Button
            type="submit"
            className="w-full focus-visible:ring-4 focus-visible:ring-primary/20"
            disabled={isSubmitting}
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </Button>
        </form>
      </Form>
    </AuthPageLayout>
  );
}
