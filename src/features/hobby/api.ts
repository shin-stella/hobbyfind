type BookmarksResponse =
  | { success: true; hobbyIds: string[] }
  | { success: false; error: string };

type BookmarkMutationResponse =
  | { success: true; hobbyId: string }
  | { success: false; error: string };

export async function fetchBookmarks(): Promise<BookmarksResponse> {
  try {
    const response = await fetch('/api/bookmarks');
    const data = (await response.json()) as {
      hobbyIds?: string[];
      error?: string;
    };

    if (!response.ok) {
      return {
        success: false,
        error: data.error ?? '북마크 목록을 불러오지 못했습니다.',
      };
    }

    return {
      success: true,
      hobbyIds: data.hobbyIds ?? [],
    };
  } catch {
    return {
      success: false,
      error: '북마크 목록을 불러오지 못했습니다.',
    };
  }
}

export async function addBookmark(
  hobbyId: string,
): Promise<BookmarkMutationResponse> {
  try {
    const response = await fetch('/api/bookmarks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hobbyId }),
    });

    const data = (await response.json()) as {
      hobbyId?: string;
      error?: string;
    };

    if (!response.ok) {
      return {
        success: false,
        error: data.error ?? '북마크 저장에 실패했습니다.',
      };
    }

    if (!data.hobbyId) {
      return {
        success: false,
        error: '북마크 저장에 실패했습니다.',
      };
    }

    return { success: true, hobbyId: data.hobbyId };
  } catch {
    return {
      success: false,
      error: '북마크 저장에 실패했습니다.',
    };
  }
}

export async function removeBookmark(
  hobbyId: string,
): Promise<BookmarkMutationResponse> {
  try {
    const response = await fetch(
      `/api/bookmarks?hobbyId=${encodeURIComponent(hobbyId)}`,
      {
        method: 'DELETE',
      },
    );

    const data = (await response.json()) as {
      hobbyId?: string;
      error?: string;
    };

    if (!response.ok) {
      return {
        success: false,
        error: data.error ?? '북마크 해제에 실패했습니다.',
      };
    }

    if (!data.hobbyId) {
      return {
        success: false,
        error: '북마크 해제에 실패했습니다.',
      };
    }

    return { success: true, hobbyId: data.hobbyId };
  } catch {
    return {
      success: false,
      error: '북마크 해제에 실패했습니다.',
    };
  }
}
