# Step 9. State 배열에 게시글 작성

## 완료 결과

form submit으로 새 게시글을 state 배열에 추가합니다.

## 변경 내용

- `App.jsx`에서 게시글 배열을 `useState`로 관리합니다.
- `createPost` 함수를 추가합니다.
- `NewPostPage`가 submit 시 새 게시글 객체를 만들어 부모로 전달합니다.
- 작성 후 상세 페이지로 이동합니다.

## 동작 원리

- React state는 직접 수정하지 않고 함수형 updater에서 새 배열을 만들어 교체합니다.
- 새 글 작성은 배열에 객체를 하나 추가하는 일로 먼저 이해할 수 있습니다.
- Next.js에서는 같은 요청을 `POST /api/post`로 처리합니다.

```js
setPosts((currentPosts) => [newPost, ...currentPosts])
```

`currentPosts`는 React가 전달한 최신 state입니다. 바깥 scope의 `posts`를 직접 사용하지 않으므로 연속 갱신에서 이전 변경을 잃지 않습니다.

## 결과 확인

새 글을 작성하면 상세 화면으로 이동하고, Posts 목록에도 새 글이 보이면 됩니다.
