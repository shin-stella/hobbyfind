import type { Hobby } from '@/features/hobby/types';

const THUMBNAIL_BASE = '/thumbnails/thumbnails';

export const HOBBIES: Hobby[] = [
  {
    id: 'jogging',
    name: '조깅/러닝',
    category: 'sports',
    thumbnail: `${THUMBNAIL_BASE}/running.jpg`,
  },
  {
    id: 'yoga',
    name: '요가',
    category: 'sports',
    thumbnail: `${THUMBNAIL_BASE}/yoga.jpg`,
  },
  {
    id: 'swimming',
    name: '수영',
    category: 'sports',
    thumbnail: `${THUMBNAIL_BASE}/swimming.jpg`,
  },
  {
    id: 'cycling',
    name: '자전거',
    category: 'sports',
    thumbnail: `${THUMBNAIL_BASE}/cycling.jpg`,
  },
  {
    id: 'climbing',
    name: '클라이밍',
    category: 'sports',
    thumbnail: `${THUMBNAIL_BASE}/climbing.jpg`,
  },
  {
    id: 'dance',
    name: '댄스',
    category: 'sports',
    thumbnail: `${THUMBNAIL_BASE}/dance.jpg`,
  },
  {
    id: 'reading',
    name: '독서',
    category: 'intelligence',
    thumbnail: `${THUMBNAIL_BASE}/reading.jpg`,
  },
  {
    id: 'puzzle',
    name: '퍼즐',
    category: 'intelligence',
    thumbnail: `${THUMBNAIL_BASE}/puzzle.jpg`,
  },
  {
    id: 'chess',
    name: '체스',
    category: 'intelligence',
    thumbnail: `${THUMBNAIL_BASE}/chess.jpg`,
  },
  {
    id: 'programming',
    name: '프로그래밍',
    category: 'intelligence',
    thumbnail: `${THUMBNAIL_BASE}/programming.jpg`,
  },
  {
    id: 'language',
    name: '외국어 학습',
    category: 'intelligence',
    thumbnail: `${THUMBNAIL_BASE}/foreign_language_learning.jpg`,
  },
  {
    id: 'photography',
    name: '사진 촬영',
    category: 'intelligence',
    thumbnail: `${THUMBNAIL_BASE}/photography.jpg`,
  },
  {
    id: 'drawing',
    name: '그림 그리기',
    category: 'art',
    thumbnail: `${THUMBNAIL_BASE}/drawing.jpg`,
  },
  {
    id: 'instrument',
    name: '악기 연주',
    category: 'art',
    thumbnail: `${THUMBNAIL_BASE}/instrument_playing.jpg`,
  },
  {
    id: 'cooking',
    name: '요리',
    category: 'art',
    thumbnail: `${THUMBNAIL_BASE}/cooking.jpg`,
  },
  {
    id: 'calligraphy',
    name: '서예',
    category: 'art',
    thumbnail: `${THUMBNAIL_BASE}/calligraphy.jpg`,
  },
  {
    id: 'pottery',
    name: '도자기 만들기',
    category: 'art',
    thumbnail: `${THUMBNAIL_BASE}/pottery.jpg`,
  },
  {
    id: 'gardening',
    name: '정원 가꾸기',
    category: 'art',
    thumbnail: `${THUMBNAIL_BASE}/gardening.jpg`,
  },
];
