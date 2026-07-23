# Step 11. 게시글 삭제

## 완료 결과

상세 화면에서 게시글을 삭제하고 목록 화면으로 이동합니다.

## 변경 내용

- `App.jsx`에 `deletePost` 함수를 추가합니다.
- `PostDetailPage`에 Delete 버튼을 추가합니다.
- 삭제 후 `/posts`로 이동합니다.

## 동작 원리

- 삭제는 배열에서 특정 id가 아닌 항목만 남기는 일입니다.
- `filter`는 삭제 흐름을 설명하기 좋은 배열 메서드입니다.
- Next.js에서는 같은 요청을 `DELETE /api/post/[id]`로 처리합니다.

```js
setPosts((currentPosts) =>
  currentPosts.filter((post) => post.id !== id),
)
```

삭제도 최신 state에 의존하므로 함수형 updater를 사용합니다.

## 결과 확인

상세 화면에서 Delete를 누르면 목록으로 이동하고 해당 글이 사라지면 됩니다.
