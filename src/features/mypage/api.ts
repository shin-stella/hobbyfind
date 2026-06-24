export interface UserProfile {
  username: string | null;
  email: string;
  createdAt: string;
}

type ProfileResponse =
  | { success: true; profile: UserProfile }
  | { success: false; error: string };

type UpdateUsernameResponse =
  | { success: true; username: string }
  | { success: false; error: string };

export async function fetchUserProfile(): Promise<ProfileResponse> {
  try {
    const response = await fetch('/api/profile');
    const data = (await response.json()) as UserProfile & { error?: string };

    if (!response.ok) {
      return {
        success: false,
        error: data.error ?? '프로필 정보를 불러오지 못했습니다.',
      };
    }

    return {
      success: true,
      profile: {
        username: data.username,
        email: data.email,
        createdAt: data.createdAt,
      },
    };
  } catch {
    return {
      success: false,
      error: '프로필 정보를 불러오지 못했습니다.',
    };
  }
}

export async function updateUsername(
  username: string,
): Promise<UpdateUsernameResponse> {
  try {
    const response = await fetch('/api/profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    const data = (await response.json()) as {
      username?: string;
      error?: string;
    };

    if (!response.ok) {
      return {
        success: false,
        error: data.error ?? '사용자명 변경에 실패했습니다.',
      };
    }

    if (!data.username) {
      return {
        success: false,
        error: '사용자명 변경에 실패했습니다.',
      };
    }

    return { success: true, username: data.username };
  } catch {
    return {
      success: false,
      error: '사용자명 변경에 실패했습니다.',
    };
  }
}
