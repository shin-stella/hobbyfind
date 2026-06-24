# HobbyFind Design Guide

*(Airbnb-inspired – TailwindCSS ready)*

---

## 1. Design System Overview

| 항목            | 가이드                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------- |
| **브랜드 아이덴티티** | “취미 찾기의 설렘과 간편함”을 전달하는 따뜻·산뜻한 감성. Airbnb의 라우쉬(Rausch) 레드를 핵심 포인트로 삼되, 보다 뉴트럴한 배경·타이포로 가독성 유지 |
| **톤 & 매너**    | Friendly · Clean · Approachable · Trustworthy                                                |
| **UI 키비주얼**   | 라운드 카드, 큰 썸네일 이미지, 여백을 넉넉히 둔 세련된 그리드, 섬세한 shadow, 8 px spacing scale                         |
| **타이포그래피**    | 기본 – `Pretendard Variable` (가변 400–700, `font-sans`)<br>H1 – 32 / 40 / bold (`text-4xl` / `2xl:text-5xl font-bold`)<br>Body – 16 / 24 / regular (`text-base`) |

---

## 2. Tailwind Color Palette

> Tailwind `tailwind.config.ts` 확장 예시

```ts
theme: {
  extend: {
    fontFamily: {
      sans: ['"Pretendard Variable"', 'Pretendard', 'system-ui', 'sans-serif'],
    },
    colors: {
      primary: '#FF385C',   // Rausch Red
      secondary: '#00A699', // Airbnb Dark Teal
      accent:   '#007A87',  // Hover / Active
      bg:       '#FFFFFF',
      bgMuted:  '#F7F7F7',
      text:     '#222222',
      textMuted:'#717171',
      border:   '#E0E0E0'
    }
  }
}
```

| 용도                | 색상      | Tailwind Token                |
| ----------------- | ------- | ----------------------------- |
| Brand Primary     | #FF385C | `bg-primary` / `text-primary` |
| Brand Secondary   | #00A699 | `bg-secondary`                |
| Accent / Hover    | #007A87 | `hover:bg-accent`             |
| Success           | #34D399 | `text-green-500`              |
| Error             | #EF4444 | `text-red-500`                |
| Background (base) | #FFFFFF | `bg-bg`                       |
| Background (mut)  | #F7F7F7 | `bg-bgMuted`                  |
| Text (primary)    | #222222 | `text-text`                   |
| Text (secondary)  | #717171 | `text-textMuted`              |
| Border            | #E0E0E0 | `border-border`               |

### Typography

| 항목 | 가이드 |
| --- | --- |
| **폰트** | [Pretendard Variable](https://github.com/orioncactus/pretendard) — 한글·라틴 가독성에 최적화 |
| **로드 방식** | `pretendard` npm 패키지, `pretendardvariable-dynamic-subset.css` (`src/app/layout.tsx`) |
| **Tailwind 토큰** | `font-sans` (전역 기본) |
| **굵기** | Regular 400 · Medium 500 · Semibold 600 · Bold 700 (`font-normal` / `font-medium` / `font-semibold` / `font-bold`) |
| **렌더링** | `antialiased` (루트 `body`에 적용) |

---

## 3. Page Implementation Guide

| 페이지                             | 핵심 UI / 레이아웃 규칙                                                                                                                                                           | Tailwind 핵심 클래스                                          |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **Home (/)**                    | • `TopBar` 고정<br>• `Hero`(max-w-3xl mx-auto text-center)<br>• `CategoryFilter` pill 버튼 (= `btn-ghost` 스타일)<br>• `HobbyCardGrid` → `grid cols-1 sm:cols-2 lg:cols-3 gap-6` | `container`, `grid`, `gap-6`, `shadow-md`, `rounded-2xl` |
| **Category (/category/[type])** | Header 섹션(카테고리 색 배경 + 큰 타이틀)<br>동일 `HobbyCardGrid` 재사용                                                                                                                    | `bg-primary/10`, `py-10`                                 |
| **Login (/login)**              | Center Form( `max-w-sm mx-auto mt-16` )<br>Stacked Inputs + CTA                                                                                                           | `space-y-4`, `btn-primary`, `focus:ring-4`               |
| **Signup (/signup)**            | Login 폼 재사용 + 추가 필드                                                                                                                                                       |                                                          |
| **MyPage (/mypage)**            | `BookmarkList`(grid) 상단, `StatsChart` 하단. 데스크톱 2컬럼, 모바일 1컬럼                                                                                                               | `lg:grid-cols-2`, `gap-8`                                |

> **Hero 예시**

```html
<section class="text-center py-12">
  <h1 class="text-4xl font-bold mb-4">취미를 발견하고 저장하세요</h1>
  <p class="text-textMuted">운동·지능·예술형 취미를 한곳에서 탐색해 보세요.</p>
</section>
```

---

## 4. Layout Components

| 컴포넌트               | 목적 / 특징                        | 재사용 포인트                                                            |
| ------------------ | ------------------------------ | ------------------------------------------------------------------ |
| **TopBar**         | 로고 + `CategoryMenu` + AuthMenu | Sticky `top-0`, Shadow-sm                                          |
| **CategoryMenu**   | 3 pill 버튼                      | `flex space-x-2`                                                   |
| **HobbyCard**      | 썸네일, 이름, 카테고리배지, 북마크           | `rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition` |
| **BookmarkButton** | Heart Icon(Outline ↔ Filled)   | `aria-pressed` 상태로 토글                                              |
| **FilterToggle**   | Pill / Checkbox 변형             | Active → `bg-primary text-white`                                   |
| **StatsChart**     | Pie / Bar (Recharts)           | Container 높이 고정 280 px                                             |
| **Footer**         | 최소 정보                          | `text-textMuted text-sm py-6`                                      |

---

## 5. Interaction Patterns

| 패턴                  | 데스크톱                                                 | 모바일                                 |
| ------------------- | ---------------------------------------------------- | ----------------------------------- |
| **Hover Card**      | 이미지 scale `transform hover:scale-105`                | Tap highlight (`active:opacity-90`) |
| **Bookmark Toggle** | 즉시 색 변화 + `ring-primary` focus                       | 동일. 탭 후 150 ms toast “북마크 저장됨”      |
| **Category Filter** | 버튼 클릭 → 색상 & route push<br>`transition-colors 150ms` | 하단 슬라이드 인(≒Airbnb mobile filter)    |
| **Page Transition** | `framer-motion` fade (`opacity 0 → 1`)               | 동일                                  |
| **Error Shake**     | 로그인 실패 시 `animate-shake`                             | 진동(feedback) 권장                     |

---

## 6. Responsive Breakpoints

| Tailwind BP | 해상도       | 그리드 & UI 변화                          |
| ----------- | --------- | ------------------------------------ |
| `sm`        | ≥ 640 px  | Card grid 1 col, TopBar menu icon(☰) |
| `md`        | ≥ 768 px  | Card 2 col, TopBar full menu         |
| `lg`        | ≥ 1024 px | Card 3 col, MyPage 2 col layout      |
| `xl`        | ≥ 1280 px | Card 4 col, 넉넉한 gutter               |
| `2xl`       | ≥ 1536 px | Card 5 col, Hero 텍스트 5xl             |

> **Tailwind utility 예시**

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6">
  <!-- HobbyCard -->
</div>
```

---

### 참고 리소스

• Pretendard — [orioncactus/pretendard](https://github.com/orioncactus/pretendard)
• Airbnb 디자인 시스템 - [Airbnb Design System](https://airbnb.design/base/?utm_source=chatgpt.com)
• TailwindCSS – Tailwind CSS (필요 패키지: `tailwindcss`, `@tailwindcss/forms`, `pretendard`)

---
