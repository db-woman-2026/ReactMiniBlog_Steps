# Step 14. localStorage 저장

## 이번 단계에서 할 일

- 작성, 수정, 삭제 결과를 localStorage에 저장합니다.
- 새로고침 후에도 게시글 목록을 유지합니다.
- `useEffect`로 state 변경 이후 저장 작업을 실행합니다.

## 시작 전 확인

권장 시간은 55분입니다. 개인 실습 저장소의 `main`에서 직전 단계까지 마친 상태로 시작합니다. 코드 블록은 복사해 붙이지 않고 직접 입력합니다.

Windows Terminal의 PowerShell에서 개인 저장소의 `main`과 변경 상태를 확인합니다.

~~~powershell
Set-Location "$HOME\dongbu\ReactMiniBlog_Steps"
git branch --show-current
git status --short
~~~

`git branch --show-current`에는 `main`이 표시되고 `git status --short`의 출력은 없어야 합니다. 변경이 남아 있다면 원인을 확인하고 시작 상태를 정리합니다.

## 작업 1. localStorage로 게시글 유지하기

state는 새로고침하면 사라집니다. 브라우저의 `localStorage`에 posts 배열을 문자열로 저장하고, 앱이 시작될 때 다시 읽습니다.

### 수정할 파일

- 수정: `src/App.jsx`

### 코드 변경

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/App.jsx b/src/App.jsx
index c856a63..1da5f65 100644
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -1,4 +1,4 @@
-import { useState } from 'react'
+import { useEffect, useState } from 'react'
 import { BrowserRouter, Route, Routes } from 'react-router-dom'
 import Footer from './components/Footer'
 import Header from './components/Header'
@@ -10,8 +10,45 @@ import NewPostPage from './pages/NewPostPage'
 import PostDetailPage from './pages/PostDetailPage'
 import PostsPage from './pages/PostsPage'
 
+const STORAGE_KEY = 'react-mini-blog-posts'
+
+function isPostArray(value) {
+  return (
+    Array.isArray(value) &&
+    value.every(
+      (post) =>
+        post !== null &&
+        typeof post === 'object' &&
+        typeof post.id === 'string' &&
+        typeof post.title === 'string' &&
+        typeof post.excerpt === 'string' &&
+        typeof post.content === 'string' &&
+        typeof post.author === 'string',
+    )
+  )
+}
+
+function loadInitialPosts() {
+  const savedPosts = localStorage.getItem(STORAGE_KEY)
+
+  if (!savedPosts) {
+    return initialPosts
+  }
+
+  try {
+    const parsedPosts = JSON.parse(savedPosts)
+    return isPostArray(parsedPosts) ? parsedPosts : initialPosts
+  } catch {
+    return initialPosts
+  }
+}
+
 function App() {
-  const [posts, setPosts] = useState(initialPosts)
+  const [posts, setPosts] = useState(loadInitialPosts)
+
+  useEffect(() => {
+    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
+  }, [posts])
 
   function createPost(postInput) {
     const newPost = {
~~~

### 설명과 확인

- `localStorage.getItem`은 저장된 문자열을 읽습니다.
- `JSON.parse`와 `JSON.stringify`로 배열과 문자열을 변환합니다.
- `isPostArray`는 배열 여부와 각 게시글의 `id`, `title`, `excerpt`, `content`, `author` 형식을 함께 검사합니다.
- `every`는 모든 게시글이 검사 조건을 통과할 때만 `true`를 반환합니다.
- `useEffect`는 posts state가 바뀐 뒤 저장 작업을 실행합니다.

## 완료 결과 및 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. npm 명령은 `npm.cmd`로 실행합니다.

~~~powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
~~~

글을 작성하거나 수정한 뒤 새로고침해도 결과가 남는지 확인합니다. 삭제한 글도 새로고침 뒤 다시 생기지 않아야 합니다.

## 독립 확인

개발자 도구에서 localStorage 값을 `{"title":"not an array"}`와 `[{"id":"1"}]`로 각각 바꾸고 새로고침합니다. 두 경우 모두 초기 데이터로 회복되는지 확인하고 결과를 한 문장으로 기록합니다. 실험값은 다음 단계 전에 삭제합니다.

## 저장소에 기록하기

실험용 변경을 모두 복구한 뒤 검사 결과와 코드 변경을 함께 확인합니다.

```powershell
git branch --show-current
git status --short
git diff
npm.cmd run lint
npm.cmd run build
git add .
git diff --staged
git commit -m "Complete React step 14"
git push origin main
git status --short --branch
```

현재 브랜치는 `main`이어야 합니다. 마지막 상태에서 `main...origin/main` 뒤에 `ahead`가 없고 작업 파일 목록도 비어 있어야 합니다.
