# Step 12. 게시글 수정

## 배울 내용

기존 게시글을 수정하는 edit 화면을 추가합니다.

## 주요 변경

- `/posts/:postId/edit` 라우트를 추가합니다.
- `src/pages/EditPostPage.jsx`를 추가합니다.
- 기존 제목과 내용을 form 초기값으로 넣습니다.
- 저장 시 state 배열의 해당 게시글만 교체합니다.

## 학습 포인트

- 수정은 배열 안의 특정 객체를 새 객체로 바꾸는 일입니다.
- `map`은 특정 항목만 교체할 때 사용할 수 있습니다.
- 나중에 Next.js에서는 이 흐름이 `PUT /api/post/[id]`로 이어집니다.

```js
setPosts((currentPosts) =>
  currentPosts.map((post) => (post.id === id ? updatedPost : post)),
)
```

수정도 최신 state에 의존하므로 함수형 updater를 사용합니다.

## 확인 방법

상세 화면에서 Edit로 이동해 제목이나 내용을 바꾸고 저장하면 상세 화면에 반영되면 됩니다.
