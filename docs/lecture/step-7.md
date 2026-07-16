# Step 7. 이벤트와 State

## 이번 단계에서 할 일

- 상세 화면에 좋아요 버튼을 추가합니다.
- 버튼 클릭 이벤트를 처리합니다.
- `useState`로 화면의 숫자가 바뀌는 흐름을 확인합니다.

## 작업 1. 좋아요 버튼으로 이벤트와 state 연습하기

상세 화면에 Like 버튼을 추가합니다. 버튼을 누르면 `likes` state가 증가하고 화면 숫자가 바뀝니다.

### 수정할 파일

- 수정: [src/pages/PostDetailPage.jsx](../../src/pages/PostDetailPage.jsx)
- 수정: [src/index.css](../../src/index.css)

### 코드 변경

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/index.css b/src/index.css
index d1b5caa..3ae4e1d 100644
--- a/src/index.css
+++ b/src/index.css
@@ -19,6 +19,7 @@ textarea {
 
 button {
   cursor: pointer;
+  margin-right: 8px;
 }
 
 header,
diff --git a/src/pages/PostDetailPage.jsx b/src/pages/PostDetailPage.jsx
index 41946b8..803c95a 100644
--- a/src/pages/PostDetailPage.jsx
+++ b/src/pages/PostDetailPage.jsx
@@ -1,9 +1,11 @@
+import { useState } from 'react'
 import { Link, useParams } from 'react-router-dom'
 import { posts } from '../data/posts'
 
 function PostDetailPage() {
   const { postId } = useParams()
   const post = posts.find((item) => item.id === postId)
+  const [likes, setLikes] = useState(0)
 
   if (!post) {
     return (
@@ -20,6 +22,9 @@ function PostDetailPage() {
       <h1>{post.title}</h1>
       <p>Written by {post.author}</p>
       <p>{post.content}</p>
+      <button type="button" onClick={() => setLikes(likes + 1)}>
+        Like {likes}
+      </button>
       <Link to="/posts">Back to posts</Link>
     </main>
   )
~~~

### 설명과 확인

- `useState(0)`은 처음 값을 0으로 둔 state를 만듭니다.
- `onClick`은 버튼 클릭 이벤트를 처리합니다.
- state가 바뀌면 React가 화면을 다시 그립니다.

## 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. `git`, `node`, `npm` 명령은 PowerShell에서도 같습니다. `npm.ps1` 오류가 나면 `npm.cmd`를 사용합니다.

~~~bash
npm run dev
~~~

브라우저에서 이번 단계의 화면을 직접 눌러 확인합니다. 문제가 없으면 다음 step으로 넘어갑니다.
