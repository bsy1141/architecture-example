# typescript-config

new-edu 모노레포를 위한 TypeScript 설정 패키지입니다.

## 설치

```bash
pnpm add -D typescript-config
```

## 사용법

### 웹 애플리케이션 (React + Vite)

`apps/web/tsconfig.json`:
```json
{
  "extends": "typescript-config/web.json"
}
```

### 서버 애플리케이션 (NestJS)

`apps/server/tsconfig.json`:
```json
{
  "extends": "typescript-config/server.json"
}
```

### Node.js 환경 (Vite Config 등)

`apps/web/tsconfig.node.json`:
```json
{
  "extends": "typescript-config/node.json"
}
```

## 설정 파일 설명

- `base.json`: 웹과 서버에서 공통으로 사용하는 기본 설정
- `web.json`: React + Vite 웹 애플리케이션 전용 설정
- `server.json`: NestJS 서버 애플리케이션 전용 설정
- `node.json`: Node.js 환경 전용 설정 (Vite Config 등)

## 주요 특징

- **공통 설정**: `base.json`에서 공통 설정을 관리하여 일관성 유지
- **환경별 최적화**: 웹과 서버 환경에 맞는 최적화된 설정 제공
- **Path Mapping**: 프로젝트 구조에 맞는 경로 별칭 설정
- **Strict Mode**: 엄격한 타입 체크로 코드 품질 향상 