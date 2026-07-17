# Step 7. 이벤트와 State

## 이번 단계에서 할 일

- 상세 화면에 좋아요 버튼을 추가합니다.
- 버튼 클릭 이벤트를 처리합니다.
- `useState`로 화면의 숫자가 바뀌는 흐름을 확인합니다.

## 시작 전 확인

권장 시간은 40분입니다. 이 문서의 diff는 `step-6` 완료 코드에 적용합니다. `step-7` branch는 아래 변경이 이미 반영된 완성본입니다.

Windows Terminal의 PowerShell에서 시작 branch와 변경 상태를 확인합니다.

~~~powershell
Set-Location "$HOME\dongbu\ReactMiniBlog_Steps"
git switch step-6
git status --short
~~~

`git status --short`의 출력이 없어야 합니다. 변경이 남아 있다면 원인을 확인하고 시작 상태를 정리합니다.

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
index 41946b8..1c8b97b 100644
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
@@ -20,6 +22,12 @@ function PostDetailPage() {
       <h1>{post.title}</h1>
       <p>Written by {post.author}</p>
       <p>{post.content}</p>
+      <button
+        type="button"
+        onClick={() => setLikes((currentLikes) => currentLikes + 1)}
+      >
+        Like {likes}
+      </button>
       <Link to="/posts">Back to posts</Link>
     </main>
   )
~~~

### 설명과 확인

- `useState(0)`은 처음 값을 0으로 둔 state를 만듭니다.
- `onClick`은 버튼 클릭 이벤트를 처리합니다.
- 다음 값이 이전 좋아요 수에 의존하므로 함수형 updater의 `currentLikes`를 사용합니다.
- state가 바뀌면 React가 화면을 다시 그립니다.

## 완료 결과 및 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. npm 명령은 `npm.cmd`로 실행합니다.

~~~powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
~~~

Like 버튼을 연속으로 눌렀을 때 표시 숫자가 누른 횟수만큼 증가하는지 확인합니다.

## 독립 확인

좋아요 버튼을 여러 번 눌러 이전 state를 기준으로 값이 바뀌는지 확인합니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험을 위해 바꾼 값은 다음 단계 전에 복구합니다.
