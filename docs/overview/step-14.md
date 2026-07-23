# Step 14. localStorage 저장

## 배울 내용

새로고침해도 작성, 수정, 삭제 결과가 유지되도록 `localStorage`를 사용합니다.

## 주요 변경

- `App.jsx`에서 초기 state를 `localStorage`에서 읽습니다.
- posts state가 바뀔 때 `useEffect`로 저장합니다.
- 브라우저 저장소가 비어 있으면 기본 샘플 데이터를 사용합니다.

## 학습 포인트

- state는 새로고침하면 사라집니다.
- `localStorage`는 브라우저에 문자열을 저장합니다.
- `useEffect`는 렌더링 이후에 필요한 부수 작업을 처리합니다.
- `JSON.parse()` 결과가 게시글 형식의 배열인지 확인하고, 형식이 다르면 초기 데이터로 복구합니다.

```js
const parsedPosts = JSON.parse(savedPosts)
return isPostArray(parsedPosts) ? parsedPosts : initialPosts
```

`{"title":"post"}`는 배열이 아니고, `[{"id":"1"}]`은 화면에 필요한 문자열 필드가 빠진 배열입니다. 두 값 모두 초기 데이터로 복구합니다.

## 확인 방법

새 글을 작성한 뒤 브라우저를 새로고침해도 글이 남아 있으면 됩니다.
