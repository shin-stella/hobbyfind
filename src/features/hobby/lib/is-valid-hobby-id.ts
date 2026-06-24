import { HOBBIES } from '@/features/hobby/constants/hobbies';

const VALID_HOBBY_IDS = new Set(HOBBIES.map((hobby) => hobby.id));

export function isValidHobbyId(hobbyId: string): boolean {
  return VALID_HOBBY_IDS.has(hobbyId);
}
