# Step 15. mock fetch와 Next.js 연결

## 이 단계의 목표

`public/posts.json`에서 초기 데이터를 가져오며, React 선행 프로젝트와 Next.js 블로그 프로젝트의 연결 지점을 정리합니다.

## 주요 변경

- `public/posts.json`을 추가합니다.
- 저장된 `localStorage` 데이터가 없을 때만 mock 데이터를 fetch합니다.
- 로딩 중 문구를 표시합니다.

## 학습 포인트

- `fetch`는 외부 데이터를 가져올 때 사용하는 기본 API입니다.
- 이 프로젝트에서는 서버 대신 정적 JSON 파일을 사용합니다.
- Next.js에서는 같은 데이터 흐름이 API Route와 MongoDB로 확장됩니다.

## 확인 방법

처음 실행했을 때 mock 게시글이 로딩되고, 이후 작성한 글은 `localStorage`에 유지되면 됩니다.
