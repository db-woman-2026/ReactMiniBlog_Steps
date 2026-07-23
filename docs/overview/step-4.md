# Step 4. Props

## 완료 결과

`PostCard` 컴포넌트에 게시글 정보를 props로 전달합니다.

## 변경 내용

- `src/components/PostCard.jsx`를 추가합니다.
- `src/data/posts.js`에 샘플 게시글 데이터를 둡니다.
- `PostsPage`에서 `PostCard`에 제목, 요약, 작성자를 전달합니다.

## 동작 원리

- props는 부모 컴포넌트가 자식 컴포넌트에 넘기는 값입니다.
- 같은 컴포넌트도 props가 다르면 다른 내용을 보여줄 수 있습니다.
- UI를 재사용하려면 컴포넌트와 데이터를 분리하는 편이 좋습니다.

## 결과 확인

Posts 화면에 샘플 게시글 카드가 보이면 됩니다.
