# Step 15. mock fetch와 Next.js 연결

## 완료 결과

`public/posts.json`에서 초기 데이터를 가져오며, React 선행 프로젝트와 Next.js 블로그 프로젝트의 연결 지점을 정리합니다.

## 변경 내용

- `public/posts.json`을 추가합니다.
- 저장된 `localStorage` 데이터가 없을 때만 mock 데이터를 fetch합니다.
- 로딩 중 문구를 표시합니다.

## 동작 원리

- `fetch`는 외부 데이터를 가져올 때 사용하는 기본 API입니다.
- 이 프로젝트에서는 서버 대신 정적 JSON 파일을 사용합니다.
- 저장 데이터와 fetch 응답이 게시글 형식의 배열이 아니면 fallback 데이터를 사용합니다.
- Next.js에서는 같은 데이터 흐름이 API Route와 MongoDB로 확장됩니다.

```js
const starterPosts = await response.json()

if (!isPostArray(starterPosts)) {
  throw new Error('Starter posts must contain valid posts.')
}
```

HTTP 성공과 JSON 파싱 성공만으로 게시글 목록 형식을 보장할 수 없습니다. 배열과 각 게시글의 필드를 확인한 뒤 state에 넣습니다.

## 결과 확인

처음 실행했을 때 mock 게시글이 로딩되고, 이후 작성한 글은 `localStorage`에 유지되면 됩니다.
