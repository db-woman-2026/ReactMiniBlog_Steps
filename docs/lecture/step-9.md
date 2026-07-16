# Step 9. State 배열에 게시글 작성

## 이번 단계에서 할 일

- 게시글 배열을 App의 state로 관리합니다.
- 작성 form submit으로 새 게시글을 추가합니다.
- 작성 후 새 게시글 상세 화면으로 이동합니다.

## 시작 전 확인

권장 시간은 60분입니다. 이 문서의 diff는 `step-8` 완료 코드에 적용합니다. `step-9` branch는 아래 변경이 이미 반영된 완성본입니다.

수정 전에 `git status --short`의 출력이 없는지 확인합니다. 변경이 남아 있다면 원인을 확인하고 시작 상태를 정리합니다.

## 작업 1. 게시글 배열을 App state로 올리기

게시글을 작성하려면 목록 데이터가 바뀔 수 있어야 합니다. 고정 배열을 `App.jsx`의 state로 옮기고, 목록/상세/작성 화면에 필요한 값을 props로 전달합니다.

새 배열은 함수형 updater로 만듭니다. React가 전달한 최신 배열을 사용하면 연속된 추가가 오래된 `posts` 값을 참조하지 않습니다.

### 수정할 파일

- 수정: [src/App.jsx](../../src/App.jsx)
- 수정: [src/data/posts.js](../../src/data/posts.js)
- 수정: [src/pages/PostsPage.jsx](../../src/pages/PostsPage.jsx)
- 수정: [src/pages/PostDetailPage.jsx](../../src/pages/PostDetailPage.jsx)

### 코드 변경

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/App.jsx b/src/App.jsx
index 42c542d..6580aec 100644
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -1,6 +1,8 @@
+import { useState } from 'react'
 import { BrowserRouter, Route, Routes } from 'react-router-dom'
 import Footer from './components/Footer'
 import Header from './components/Header'
+import { initialPosts } from './data/posts'
 import AboutPage from './pages/AboutPage'
 import HomePage from './pages/HomePage'
 import NewPostPage from './pages/NewPostPage'
@@ -8,15 +10,36 @@ import PostDetailPage from './pages/PostDetailPage'
 import PostsPage from './pages/PostsPage'
 
 function App() {
+  const [posts, setPosts] = useState(initialPosts)
+
+  function createPost(postInput) {
+    const newPost = {
+      id: String(Date.now()),
+      title: postInput.title,
+      excerpt: postInput.content.slice(0, 80),
+      content: postInput.content,
+      author: 'Student',
+    }
+
+    setPosts((currentPosts) => [newPost, ...currentPosts])
+    return newPost
+  }
+
   return (
     <BrowserRouter>
       <Header />
       <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/about" element={<AboutPage />} />
-        <Route path="/posts" element={<PostsPage />} />
-        <Route path="/posts/new" element={<NewPostPage />} />
-        <Route path="/posts/:postId" element={<PostDetailPage />} />
+        <Route path="/posts" element={<PostsPage posts={posts} />} />
+        <Route
+          path="/posts/new"
+          element={<NewPostPage onCreate={createPost} />}
+        />
+        <Route
+          path="/posts/:postId"
+          element={<PostDetailPage posts={posts} />}
+        />
       </Routes>
       <Footer />
     </BrowserRouter>
diff --git a/src/data/posts.js b/src/data/posts.js
index 830bfd2..750cc2a 100644
--- a/src/data/posts.js
+++ b/src/data/posts.js
@@ -1,4 +1,4 @@
-export const posts = [
+export const initialPosts = [
   {
     id: '1',
     title: 'Getting Started with React',
diff --git a/src/pages/PostDetailPage.jsx b/src/pages/PostDetailPage.jsx
index 803c95a..0f0dfeb 100644
--- a/src/pages/PostDetailPage.jsx
+++ b/src/pages/PostDetailPage.jsx
@@ -1,8 +1,7 @@
 import { useState } from 'react'
 import { Link, useParams } from 'react-router-dom'
-import { posts } from '../data/posts'
 
-function PostDetailPage() {
+function PostDetailPage({ posts }) {
   const { postId } = useParams()
   const post = posts.find((item) => item.id === postId)
   const [likes, setLikes] = useState(0)
diff --git a/src/pages/PostsPage.jsx b/src/pages/PostsPage.jsx
index aef3c92..faa7f21 100644
--- a/src/pages/PostsPage.jsx
+++ b/src/pages/PostsPage.jsx
@@ -1,7 +1,6 @@
 import PostCard from '../components/PostCard'
-import { posts } from '../data/posts'
 
-function PostsPage() {
+function PostsPage({ posts }) {
   return (
     <main>
       <h1>Posts</h1>
~~~

### 설명과 확인

- 데이터를 바꿀 수 있게 하려면 state로 관리해야 합니다.
- `createPost`는 새 게시글 객체를 만들고 배열 앞에 추가합니다.
- 자식 화면들은 props로 posts나 함수를 전달받습니다.

## 작업 2. form submit으로 새 글 추가하기

New Post 화면에서 form을 제출하면 부모가 받은 `onCreate` 함수를 호출합니다. 새 게시글이 만들어지면 그 상세 화면으로 이동합니다.

### 수정할 파일

- 수정: [src/pages/NewPostPage.jsx](../../src/pages/NewPostPage.jsx)

### 코드 변경

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/pages/NewPostPage.jsx b/src/pages/NewPostPage.jsx
index aa144b8..9b53d8a 100644
--- a/src/pages/NewPostPage.jsx
+++ b/src/pages/NewPostPage.jsx
@@ -1,13 +1,26 @@
 import { useState } from 'react'
+import { useNavigate } from 'react-router-dom'
 
-function NewPostPage() {
+function NewPostPage({ onCreate }) {
   const [title, setTitle] = useState('')
   const [content, setContent] = useState('')
+  const navigate = useNavigate()
+
+  function handleSubmit(event) {
+    event.preventDefault()
+
+    const newPost = onCreate({
+      title,
+      content,
+    })
+
+    navigate(`/posts/${newPost.id}`)
+  }
 
   return (
     <main>
       <h1>New Post</h1>
-      <form>
+      <form onSubmit={handleSubmit}>
         <label htmlFor="title">Title</label>
         <input
           id="title"
@@ -21,6 +34,8 @@ function NewPostPage() {
           value={content}
           onChange={(event) => setContent(event.target.value)}
         />
+
+        <button type="submit">Create Post</button>
       </form>
 
       <section>
~~~

### 설명과 확인

- `event.preventDefault()`는 form 제출로 페이지가 새로고침되는 것을 막습니다.
- `useNavigate`는 코드로 다른 주소로 이동할 때 사용합니다.
- 이 단계의 작성은 서버 저장이 아니라 state 배열에 객체를 추가하는 흐름입니다.

## 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. `git`, `node`, `npm` 명령은 PowerShell에서도 같습니다. `npm.ps1` 오류가 나면 `npm.cmd`를 사용합니다.

~~~bash
npm run dev
~~~

브라우저에서 이번 단계의 화면을 직접 눌러 확인합니다. 문제가 없으면 다음 step으로 넘어갑니다.

## 독립 확인

새 글을 두 개 연속 추가하고 기존 글이 사라지지 않는지 확인합니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험을 위해 바꾼 값은 다음 단계 전에 복구합니다.
