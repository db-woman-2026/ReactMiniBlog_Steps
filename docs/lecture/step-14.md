# Step 14. localStorage 저장

## 이번 스텝 주요 기능 Overview

- 작성, 수정, 삭제 결과를 localStorage에 저장합니다.
- 새로고침 후에도 게시글 목록을 유지합니다.
- `useEffect`로 state 변경 이후 저장 작업을 실행합니다.

## 작업 1. localStorage로 게시글 유지하기

state는 새로고침하면 사라집니다. 이번 단계에서는 브라우저의 `localStorage`에 posts 배열을 문자열로 저장하고, 앱이 시작될 때 다시 읽습니다.

### 직접 수정할 파일

- 수정: [src/App.jsx](../../src/App.jsx)

### 이전 단계와 달라지는 코드

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/App.jsx b/src/App.jsx
index 69eefc3..f4f3be3 100644
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -1,4 +1,4 @@
-import { useState } from 'react'
+import { useEffect, useState } from 'react'
 import { BrowserRouter, Route, Routes } from 'react-router-dom'
 import Footer from './components/Footer'
 import Header from './components/Header'
@@ -10,8 +10,28 @@ import NewPostPage from './pages/NewPostPage'
 import PostDetailPage from './pages/PostDetailPage'
 import PostsPage from './pages/PostsPage'
 
+const STORAGE_KEY = 'react-mini-blog-posts'
+
+function loadInitialPosts() {
+  const savedPosts = localStorage.getItem(STORAGE_KEY)
+
+  if (!savedPosts) {
+    return initialPosts
+  }
+
+  try {
+    return JSON.parse(savedPosts)
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

### 설명/확인 포인트

- `localStorage.getItem`은 저장된 문자열을 읽습니다.
- `JSON.parse`와 `JSON.stringify`로 배열과 문자열을 변환합니다.
- `useEffect`는 posts state가 바뀐 뒤 저장 작업을 실행합니다.

## 실행 확인

~~~bash
npm run dev
~~~

브라우저에서 이번 단계의 화면을 직접 눌러 확인합니다. 문제가 없으면 다음 step으로 넘어갑니다.
