# Naver News Search (React + Vite)

## 설정

1. 프로젝트 루트(`news-project`)에 `.env.local` 파일 생성 후 아래 키를 넣습니다.

```
NAVER_CLIENT_ID=여기에_클라이언트_ID
NAVER_CLIENT_SECRET=여기에_클라이언트_SECRET
```

2. 개발 서버 실행

```
npm run dev
```

## 사용법

- 상단 검색창에 키워드를 입력하고 검색을 누르면 네이버 뉴스 Open API를 통해 기사를 가져옵니다.
- API 호출은 클라이언트에서 직접 하지 않고 `/api/news` 프록시 경유로 이루어집니다.

## 참고

- 네이버 개발자 센터에서 애플리케이션을 생성해 `Client ID/Secret`을 발급받아야 합니다.
