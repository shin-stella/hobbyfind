'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signupUser } from '@/features/auth/api';
import { AuthPageLayout } from '@/features/auth/components/AuthPageLayout';
import {
  signupDefaultValues,
  signupSchema,
  type SignupFormValues,
} from '@/features/auth/constants/auth-schemas';
import { mapAuthError } from '@/features/auth/lib/map-auth-error';
import { cn } from '@/lib/utils';

export function SignupForm() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [router, status]);

  if (status === 'loading' || session?.user) {
    return null;
  }

  return <SignupFormContent />;
}

function SignupFormContent() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: signupDefaultValues,
  });

  const triggerShake = () => {
    setIsShaking(true);
    window.setTimeout(() => setIsShaking(false), 400);
  };

  const onSubmit = async (values: SignupFormValues) => {
    if (isSubmittingRef.current) {
      return;
    }

    isSubmittingRef.current = true;
    setAuthError(null);
    setIsSubmitting(true);

    try {
      const signupResult = await signupUser({
        email: values.email,
        username: values.username,
        password: values.password,
      });

      if (signupResult.success === false) {
        setAuthError(signupResult.error);
        triggerShake();
        return;
      }

      const signInResult = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (signInResult?.error) {
        setAuthError(mapAuthError(signInResult.error));
        triggerShake();
        return;
      }

      router.push('/');
      router.refresh();
    } catch {
      setAuthError('요청을 처리하지 못했습니다. 다시 시도해 주세요.');
      triggerShake();
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPageLayout
      title="회원가입"
      description="간단한 정보 입력으로 HobbyFind를 시작해 보세요."
      footerLink={
        <>
          이미 계정이 있으신가요?{' '}
          <Link
            href="/login"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            로그인
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
                    disabled={isSubmitting}
                    className="focus-visible:ring-4 focus-visible:ring-primary/20"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>사용자명</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoComplete="username"
                    placeholder="2~20자, 한글·영문·숫자·_"
                    disabled={isSubmitting}
                    className="focus-visible:ring-4 focus-visible:ring-primary/20"
                    {...field}
                    value={field.value ?? ''}
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
                    autoComplete="new-password"
                    placeholder="6자 이상 입력"
                    disabled={isSubmitting}
                    className="focus-visible:ring-4 focus-visible:ring-primary/20"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    placeholder="비밀번호를 다시 입력"
                    disabled={isSubmitting}
                    className="focus-visible:ring-4 focus-visible:ring-primary/20"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agreeTerms"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-start gap-3 rounded-lg border border-border bg-bgMuted p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value ?? false}
                      disabled={isSubmitting}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                      aria-label="약관 동의"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal text-text">
                      서비스 이용약관 및 개인정보 처리방침에 동의합니다.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </div>
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
            aria-busy={isSubmitting}
          >
            {isSubmitting ? '가입 중...' : '회원가입'}
          </Button>
        </form>
      </Form>
    </AuthPageLayout>
  );
}
