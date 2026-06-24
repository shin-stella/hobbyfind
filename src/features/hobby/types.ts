export type HobbyCategory = 'sports' | 'intelligence' | 'art';

export interface Hobby {
  id: string;
  name: string;
  description: string;
  category: HobbyCategory;
  thumbnail: string;
}

export type CategoryFilterValue = 'all' | HobbyCategory;
