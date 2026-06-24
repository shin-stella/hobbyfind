import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, '아이디(이메일)를 입력해 주세요.')
    .email('올바른 이메일 형식이 아닙니다.'),
  password: z
    .string()
    .min(1, '비밀번호를 입력해 주세요.')
    .min(6, '비밀번호는 6자 이상이어야 합니다.'),
});

export const usernameSchema = z
  .string()
  .min(1, '사용자명을 입력해 주세요.')
  .min(2, '사용자명은 2자 이상이어야 합니다.')
  .max(20, '사용자명은 20자 이하이어야 합니다.')
  .regex(
    /^[a-zA-Z0-9_가-힣]+$/,
    '사용자명은 한글, 영문, 숫자, 밑줄(_)만 사용할 수 있습니다.',
  );

export const signupSchema = loginSchema
  .extend({
    username: usernameSchema,
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해 주세요.'),
    agreeTerms: z.boolean().refine((value) => value, {
      message: '약관에 동의해 주세요.',
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;

export const signupDefaultValues: SignupFormValues = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false,
};
