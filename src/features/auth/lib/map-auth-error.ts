const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'Invalid login credentials': '아이디 또는 비밀번호가 올바르지 않습니다.',
  'Email not confirmed': '이메일 인증이 완료되지 않았습니다.',
  'User already registered': '이미 가입된 이메일입니다.',
  'A user with this email address has already been registered':
    '이미 가입된 이메일입니다.',
  'Password should be at least 6 characters':
    '비밀번호는 6자 이상이어야 합니다.',
  'email rate limit exceeded':
    '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.',
  CredentialsSignin: '아이디 또는 비밀번호가 올바르지 않습니다.',
};

export function mapAuthError(message: string): string {
  if (message.startsWith('Email address') && message.endsWith('is invalid')) {
    return '유효한 이메일 주소를 입력해 주세요.';
  }

  if (message.includes('profiles_username_unique_idx')) {
    return '이미 사용 중인 사용자명입니다.';
  }

  return AUTH_ERROR_MESSAGES[message] ?? '요청을 처리하지 못했습니다. 다시 시도해 주세요.';
}
