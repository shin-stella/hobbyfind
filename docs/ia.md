아래는 HobbyFind 서비스의 IA(Information Architecture) 문서입니다.

# HobbyFind IA (Information Architecture)

## 1. 전체 사이트맵 구조 (Site Map)

```text
HobbyFind
│
├── Home (/)
│   ├── 운동형 카테고리
│   ├── 지능형 카테고리
│   └── 예술형 카테고리
│
├── Category
│   ├── /category/sports
│   ├── /category/intelligence
│   └── /category/art
│
├── Login (/login)
│
├── Signup (/signup)
│
└── My Page (/mypage)
    ├── 북마크 목록
    └── 북마크 통계
```

---

# 2. 사용자 흐름 (User Flow)

## 비회원 사용자 플로우

```text
홈 접속
    ↓
취미 탐색
    ↓
카테고리 선택
    ↓
카테고리 페이지 이동
    ↓
취미 확인
    ↓
북마크 시도
    ↓
로그인 페이지 이동
```

### 상세 흐름

1. 사용자가 홈 진입
2. 전체 취미 탐색
3. 카테고리 메뉴 선택
4. 카테고리별 취미 확인
5. 북마크 기능 접근 시 로그인 유도
6. 로그인 또는 회원가입 진행

---

## 회원 사용자 플로우

```text
로그인
    ↓
홈 탐색
    ↓
취미 선택
    ↓
북마크 등록
    ↓
마이페이지 이동
    ↓
북마크 목록 확인
    ↓
통계 확인
```

### 상세 흐름

1. 로그인
2. 취미 탐색
3. 관심 취미 북마크
4. 마이페이지 이동
5. 저장한 취미 목록 확인
6. 카테고리별 분포 확인

---

# 3. 내비게이션 구조 (Navigation Structure)

## Top Bar

### 비로그인 상태

| 영역   | 기능          |
| ---- | ----------- |
| 로고   | 홈 이동        |
| 운동형  | 운동형 카테고리 이동 |
| 지능형  | 지능형 카테고리 이동 |
| 예술형  | 예술형 카테고리 이동 |
| 로그인  | 로그인 페이지 이동  |
| 회원가입 | 회원가입 페이지 이동 |

---

### 로그인 상태

| 영역    | 기능          |
| ----- | ----------- |
| 로고    | 홈 이동        |
| 운동형   | 운동형 카테고리 이동 |
| 지능형   | 지능형 카테고리 이동 |
| 예술형   | 예술형 카테고리 이동 |
| 마이페이지 | 마이페이지 이동    |
| 로그아웃  | 세션 종료       |

---

## Footer

### 포함 여부

포함

### 구성

| 항목        |
| --------- |
| 서비스명      |
| Copyright |

---

# 4. 페이지 계층 구조 (Page Hierarchy)

## Home (/)

```text
Home
│
├── Top Bar
├── Hero Section
├── Category Filter
├── Hobby Card Grid
└── Footer
```

---

## Category Page

```text
Category Page
│
├── Top Bar
├── Category Header
│   ├── 카테고리명
│   └── 소개 문구
├── Hobby Card Grid
└── Footer
```

---

## Login Page

```text
Login
│
├── Top Bar
├── Login Form
│   ├── 아이디
│   ├── 비밀번호
│   ├── 에러 메시지
│   └── 로그인 버튼
├── 회원가입 링크
└── Footer
```

---

## Signup Page

```text
Signup
│
├── Top Bar
├── Signup Form
│   ├── 아이디
│   ├── 비밀번호
│   ├── 약관 동의
│   └── 회원가입 버튼
├── 로그인 링크
└── Footer
```

---

## My Page

```text
My Page
│
├── Top Bar
├── Bookmark Summary
├── Bookmark List
├── Statistics Section
│   ├── 총 북마크 수
│   └── 카테고리 분포 차트
└── Footer
```

---

# 5. 페이지별 주요 콘텐츠 구성 (Content Organization)

## Home

| 영역      | 콘텐츠       |
| ------- | --------- |
| Hero    | 서비스 소개 문구 |
| Filter  | 카테고리 토글   |
| Content | 전체 취미 카드  |

---

## Category Page

| 영역          | 콘텐츠           |
| ----------- | ------------- |
| Header      | 카테고리명         |
| Description | 카테고리 소개       |
| Content     | 해당 카테고리 취미 카드 |

---

## Login

| 영역     | 콘텐츠     |
| ------ | ------- |
| Form   | 아이디 입력  |
| Form   | 비밀번호 입력 |
| Action | 로그인 버튼  |
| Link   | 회원가입 이동 |

---

## Signup

| 영역     | 콘텐츠   |
| ------ | ----- |
| Form   | 아이디   |
| Form   | 비밀번호  |
| Form   | 약관 동의 |
| Action | 회원가입  |

---

## My Page

| 영역      | 콘텐츠       |
| ------- | --------- |
| Summary | 북마크 총 개수  |
| List    | 저장된 취미 목록 |
| Chart   | 카테고리 분포   |

---

# 6. 상호작용 패턴 (Interaction Patterns)

## 카테고리 메뉴 클릭

```text
사용자 클릭
    ↓
카테고리 페이지 이동
    ↓
선택 카테고리 취미 표시
```

---

## 홈 카테고리 필터

```text
전체
 ↓
운동형
 ↓
지능형
 ↓
예술형
```

선택된 카테고리만 카드 표시

---

## 북마크 버튼

### 로그인 상태

```text
북마크 추가
    ↕
북마크 해제
```

토글 방식

---

### 비로그인 상태

```text
북마크 클릭
    ↓
로그인 페이지 이동
```

---

## 로그인 실패

```text
로그인 요청
    ↓
인증 실패
    ↓
에러 메시지 표시
```

---

## 마이페이지 접근

### 로그인 상태

```text
마이페이지 진입
```

### 비로그인 상태

```text
마이페이지 접근
    ↓
로그인 페이지 이동
```

---

# 7. URL 구조 (URL Structure)

| 페이지   | URL                    |
| ----- | ---------------------- |
| 홈     | /                      |
| 로그인   | /login                 |
| 회원가입  | /signup                |
| 마이페이지 | /mypage                |
| 운동형   | /category/sports       |
| 지능형   | /category/intelligence |
| 예술형   | /category/art          |

---

# 8. 컴포넌트 계층 구조 (Component Hierarchy)

```text
App
│
├── TopBar
│   ├── Logo
│   ├── CategoryMenu
│   └── AuthMenu
│
├── HeroSection
│
├── CategoryFilter
│
├── HobbyCardGrid
│   └── HobbyCard
│       ├── HobbyTitle
│       ├── CategoryBadge
│       └── BookmarkButton
│
├── LoginForm
│
├── SignupForm
│
├── BookmarkList
│
├── StatsSummary
│
├── StatsChart
│
└── Footer
```

---

# 9. 상단바 / 하단바 구조

## Top Bar

### 공통 요소

| 요소      |
| ------- |
| 로고      |
| 카테고리 메뉴 |

### 비로그인

| 요소   |
| ---- |
| 로그인  |
| 회원가입 |

### 로그인

| 요소    |
| ----- |
| 마이페이지 |
| 로그아웃  |

---

## Footer

| 요소        |
| --------- |
| 서비스명      |
| Copyright |

---

# 10. 기술 스택 고려 (Next.js 기반)

## App Router 구조

```text
src/app
│
├── page.tsx
│
├── login
│   └── page.tsx
│
├── signup
│   └── page.tsx
│
├── mypage
│   └── page.tsx
│
└── category
    └── [type]
        └── page.tsx
```

## 주요 컴포넌트

```text
src/components
│
├── layout
│   ├── TopBar
│   └── Footer
│
├── hobby
│   ├── HobbyCard
│   ├── HobbyCardGrid
│   └── BookmarkButton
│
├── auth
│   ├── LoginForm
│   └── SignupForm
│
└── mypage
    ├── BookmarkList
    └── StatsChart
```

## 고정 취미 데이터

### 운동형

* 조깅/러닝
* 요가
* 수영
* 자전거
* 클라이밍
* 댄스

### 지능형

* 독서
* 퍼즐
* 체스
* 프로그래밍
* 외국어 학습
* 사진 촬영

### 예술형

* 그림 그리기
* 악기 연주
* 요리
* 서예
* 도자기 만들기
* 정원 가꾸기

※ 취미 데이터는 고정값으로 사용하며 추가·변경하지 않는다.
