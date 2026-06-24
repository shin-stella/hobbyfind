import type { Hobby } from '@/features/hobby/types';

const THUMBNAIL_BASE = '/thumbnails/thumbnails';

export const HOBBIES: Hobby[] = [
  {
    id: 'jogging',
    name: '조깅/러닝',
    description:
      '페이스를 조절하며 달리는 유산소 운동으로, 체력 향상과 스트레스 해소에 좋아요.',
    category: 'sports',
    thumbnail: `${THUMBNAIL_BASE}/running.jpg`,
  },
  {
    id: 'yoga',
    name: '요가',
    description:
      '호흡과 스트레칭으로 균형을 잡는 운동으로, 유연성과 마음 안정에 도움이 돼요.',
    category: 'sports',
    thumbnail: `${THUMBNAIL_BASE}/yoga.jpg`,
  },
  {
    id: 'swimming',
    name: '수영',
    description:
      '전신을 사용하는 저충격 유산소 운동으로, 근력과 심폐 지구력을 함께 키울 수 있어요.',
    category: 'sports',
    thumbnail: `${THUMBNAIL_BASE}/swimming.jpg`,
  },
  {
    id: 'cycling',
    name: '자전거',
    description:
      '자전거를 타며 즐기는 아웃도어 활동으로, 하체 근력과 기분 전환에 좋아요.',
    category: 'sports',
    thumbnail: `${THUMBNAIL_BASE}/cycling.jpg`,
  },
  {
    id: 'climbing',
    name: '클라이밍',
    description:
      '벽을 오르며 균형과 힘을 쓰는 운동으로, 자신감과 성취감을 키울 수 있어요.',
    category: 'sports',
    thumbnail: `${THUMBNAIL_BASE}/climbing.jpg`,
  },
  {
    id: 'dance',
    name: '댄스',
    description:
      '음악에 맞춰 몸으로 표현하는 활동으로, 유연성과 스트레스 해소에 좋아요.',
    category: 'sports',
    thumbnail: `${THUMBNAIL_BASE}/dance.jpg`,
  },
  {
    id: 'reading',
    name: '독서',
    description:
      '책으로 이야기와 지식을 만나는 취미로, 상상력과 사고력을 넓힐 수 있어요.',
    category: 'intelligence',
    thumbnail: `${THUMBNAIL_BASE}/reading.jpg`,
  },
  {
    id: 'puzzle',
    name: '퍼즐',
    description:
      '조각을 맞추며 완성하는 두뇌 활동으로, 집중력과 문제 해결력을 기를 수 있어요.',
    category: 'intelligence',
    thumbnail: `${THUMBNAIL_BASE}/puzzle.jpg`,
  },
  {
    id: 'chess',
    name: '체스',
    description:
      '기물을 두고 승부를 겨루는 전략 게임으로, 논리적 사고와 인내심에 좋아요.',
    category: 'intelligence',
    thumbnail: `${THUMBNAIL_BASE}/chess.jpg`,
  },
  {
    id: 'programming',
    name: '프로그래밍',
    description:
      '코드로 앱이나 웹을 만드는 창작 활동으로, 논리력과 성취감을 키울 수 있어요.',
    category: 'intelligence',
    thumbnail: `${THUMBNAIL_BASE}/programming.jpg`,
  },
  {
    id: 'language',
    name: '외국어 학습',
    description:
      '새로운 언어의 단어와 회화를 익히는 학습으로, 시야 확장과 실용성을 얻을 수 있어요.',
    category: 'intelligence',
    thumbnail: `${THUMBNAIL_BASE}/foreign_language_learning.jpg`,
  },
  {
    id: 'photography',
    name: '사진 촬영',
    description:
      '카메라로 순간을 담는 시각 예술로, 관찰력과 미적 감각을 키울 수 있어요.',
    category: 'intelligence',
    thumbnail: `${THUMBNAIL_BASE}/photography.jpg`,
  },
  {
    id: 'drawing',
    name: '그림 그리기',
    description:
      '펜과 물감으로 표현하는 창작 활동으로, 상상력과 마음의 여유를 찾을 수 있어요.',
    category: 'art',
    thumbnail: `${THUMBNAIL_BASE}/drawing.jpg`,
  },
  {
    id: 'instrument',
    name: '악기 연주',
    description:
      '악기를 연주하며 음악을 만드는 활동으로, 집중력과 감정 표현에 좋아요.',
    category: 'art',
    thumbnail: `${THUMBNAIL_BASE}/instrument_playing.jpg`,
  },
  {
    id: 'cooking',
    name: '요리',
    description:
      '재료를 조리해 음식을 만드는 활동으로, 창의력과 소소한 즐거움을 얻을 수 있어요.',
    category: 'art',
    thumbnail: `${THUMBNAIL_BASE}/cooking.jpg`,
  },
  {
    id: 'calligraphy',
    name: '서예',
    description:
      '붓글씨로 정성껏 쓰는 전통 예술로, 집중력과 마음 가다듬기에 좋아요.',
    category: 'art',
    thumbnail: `${THUMBNAIL_BASE}/calligraphy.jpg`,
  },
  {
    id: 'pottery',
    name: '도자기 만들기',
    description:
      '흙을 빚어 그릇을 만드는 손 공예로, 인내심과 작품 완성의 보람을 느낄 수 있어요.',
    category: 'art',
    thumbnail: `${THUMBNAIL_BASE}/pottery.jpg`,
  },
  {
    id: 'gardening',
    name: '정원 가꾸기',
    description:
      '식물을 심고 키우는 자연 교감 활동으로, 책임감과 힐링을 얻을 수 있어요.',
    category: 'art',
    thumbnail: `${THUMBNAIL_BASE}/gardening.jpg`,
  },
];
