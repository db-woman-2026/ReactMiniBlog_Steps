# Step 8. Controlled Input

## 이 단계의 목표

새 글 작성 form을 만들고, 입력값을 React state로 관리합니다.

## 주요 변경

- `/posts/new` 라우트를 추가합니다.
- `src/pages/NewPostPage.jsx`를 추가합니다.
- 제목과 내용 입력값을 `useState`로 관리합니다.
- 작성 전 preview 영역을 보여줍니다.

## 학습 포인트

- controlled input은 입력값을 state와 연결한 form입니다.
- `value`와 `onChange`를 함께 사용합니다.
- submit 저장 전에도 state를 화면에 보여줄 수 있습니다.

## 확인 방법

New Post 화면에서 입력한 제목과 내용이 preview에 바로 반영되면 됩니다.
