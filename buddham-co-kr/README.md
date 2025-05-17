# buddham.co.kr

## Development server

To start a local development server, run:

```bash
ng serve
```

```text

src/
├── app/                ← 라우팅 기반 컴포넌트/모듈
│   ├── home/
│   ├── nav-bar/
│   └── ...
├── assets/             ← 정적 리소스
├── styles.css          ← 글로벌 스타일
├── main.ts             ← 부트스트랩
├── main.server.ts
├── index.html
├── server.ts
├── types/              ← 공통 타입 정의 (interfaces, enums 등)
│   └── user.interface.ts
├── constants/          ← 전역 상수
│   └── app.constants.ts
├── utils/              ← 헬퍼 함수들
│   └── date.utils.ts
├── models/             ← 데이터 모델 (DTO 등)
│   └── post.model.ts
└── config/             ← 환경, API config 등
    └── app.config.ts

```

## Code scaffolding

```bash
ng generate component component-name
```

```bash
ng generate --help
```

## Building

```bash
ng build
```

## Running unit tests

```bash
ng test
```

## Running end-to-end tests

```bash
ng e2e
```

## Additional Resources

