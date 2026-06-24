import type { SignupFormValues } from '@/features/auth/constants/auth-schemas';

type SignupResponse =
  | { success: true }
  | { success: false; error: string };

export async function signupUser(
  values: Pick<SignupFormValues, 'email' | 'password' | 'username'>,
): Promise<SignupResponse> {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      return {
        success: false,
        error: data.error ?? '회원가입에 실패했습니다.',
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: '요청을 처리하지 못했습니다. 다시 시도해 주세요.',
    };
  }
}
