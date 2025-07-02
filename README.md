# New Edu Example

새로운 교육 서비스 프로젝트입니다.

## 기술 스택

### 공통
- Node.js 24
- TypeScript 5.8
- pnpm
- ESLint
- Zod
- Elastic APM
- Pino
- Day.js
- Ky
- ES Toolkit

### 프론트엔드 (apps/web)
- React 18
- Vite
- React Router 7
- React Query
- Zustand
- Sass

### 백엔드 (apps/server)
- NestJS
- Swagger
- Valkey

## 프로젝트 구조

```
apps
├── web/                    # 프론트엔드 (React + Vite)
│   ├── Onboarding/        # 온보딩 페이지
│   ├── Classroom/         # 교실 페이지
│   └── shared/           # 공통 컴포넌트/훅/유틸
└── server/               # 백엔드 (NestJS)
    ├── domain/           # 도메인별 모듈
    ├── shared/           # 공통 모듈
    ├── libs/             # 외부 라이브러리
    └── configs/          # 설정 파일
packages
└── database/             # 데이터베이스 패키지
```

## 시작하기

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 개발 서버 실행

```bash
# 모든 앱 동시 실행
pnpm dev

# 개별 앱 실행
pnpm --filter @new-edu/web dev
pnpm --filter @new-edu/server dev
```

### 3. 빌드

```bash
# 모든 앱 빌드
pnpm build

# 개별 앱 빌드
pnpm --filter @new-edu/web build
pnpm --filter @new-edu/server build
```

## 개발 가이드

### 프론트엔드
- 포트: 3000
- 접속: http://localhost:3000

### 백엔드
- 포트: 3001
- API 문서: http://localhost:3001/api/docs

## 스크립트

- `pnpm dev`: 개발 서버 실행
- `pnpm build`: 프로덕션 빌드
- `pnpm lint`: 린트 검사
- `pnpm lint:fix`: 린트 자동 수정
- `pnpm type-check`: 타입 검사
- `pnpm test`: 테스트 실행 