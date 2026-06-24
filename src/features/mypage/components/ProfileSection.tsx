'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar, Mail, Pencil, User, X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { usernameSchema } from '@/features/auth/constants/auth-schemas';
import {
  useProfileQuery,
  useUpdateUsernameMutation,
} from '@/features/mypage/hooks/use-profile';
import { cn } from '@/lib/utils';

interface ProfileSectionProps {
  className?: string;
}

function ProfileField({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof User;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-bgMuted px-4 py-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-4 w-4 text-primary" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-textMuted">{label}</p>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}

export function ProfileSection({ className }: ProfileSectionProps) {
  const { update: updateSession } = useSession();
  const { data: profile, isLoading, isError } = useProfileQuery();
  const updateUsernameMutation = useUpdateUsernameMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (profile?.username) {
      setEditedUsername(profile.username);
    }
  }, [profile?.username]);

  const handleStartEdit = () => {
    setEditedUsername(profile?.username ?? '');
    setValidationError(null);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditedUsername(profile?.username ?? '');
    setValidationError(null);
    setIsEditing(false);
  };

  const handleSaveUsername = async () => {
    const parsed = usernameSchema.safeParse(editedUsername.trim());

    if (!parsed.success) {
      setValidationError(parsed.error.errors[0]?.message ?? '입력값을 확인해 주세요.');
      return;
    }

    if (parsed.data === profile?.username) {
      setIsEditing(false);
      return;
    }

    setValidationError(null);

    try {
      const newUsername = await updateUsernameMutation.mutateAsync(parsed.data);
      await updateSession({ name: newUsername });
      setIsEditing(false);
    } catch (error) {
      setValidationError(
        error instanceof Error ? error.message : '사용자명 변경에 실패했습니다.',
      );
    }
  };

  const formattedCreatedAt = profile?.createdAt
    ? format(new Date(profile.createdAt), 'yyyy년 M월 d일', { locale: ko })
    : '-';

  return (
    <section className={cn(className)}>
      <header className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-text">
          내 정보 관리
        </h2>
        <p className="mt-1 text-sm text-textMuted">
          계정 정보를 확인하고 사용자명을 변경할 수 있습니다.
        </p>
      </header>

      <Card className="rounded-2xl border-border shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-text">
            계정 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pb-6">
          {isLoading && (
            <p className="text-sm text-textMuted">정보를 불러오는 중입니다...</p>
          )}

          {isError && (
            <p className="text-sm text-destructive">
              프로필 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
            </p>
          )}

          {profile && (
            <>
              <ProfileField icon={User} label="사용자명">
                {isEditing ? (
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Input
                        value={editedUsername}
                        onChange={(event) => setEditedUsername(event.target.value)}
                        autoComplete="username"
                        className="max-w-xs"
                        disabled={updateUsernameMutation.isPending}
                      />
                      <Button
                        size="sm"
                        onClick={handleSaveUsername}
                        disabled={updateUsernameMutation.isPending}
                      >
                        저장
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCancelEdit}
                        disabled={updateUsernameMutation.isPending}
                      >
                        <X className="h-4 w-4" aria-hidden />
                        취소
                      </Button>
                    </div>
                    {validationError && (
                      <p className="text-sm text-destructive">{validationError}</p>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-text">
                      {profile.username ?? '미설정'}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleStartEdit}
                    >
                      <Pencil className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                      변경
                    </Button>
                  </div>
                )}
              </ProfileField>

              <ProfileField icon={Mail} label="이메일">
                <p className="break-all font-medium text-text">{profile.email}</p>
              </ProfileField>

              <ProfileField icon={Calendar} label="가입일">
                <p className="font-medium text-text">{formattedCreatedAt}</p>
              </ProfileField>
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
