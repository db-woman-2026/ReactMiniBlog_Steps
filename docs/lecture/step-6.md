# Step 6. 동적 라우트와 상세 페이지

## 이번 단계에서 할 일

- 게시글 목록에서 상세 페이지로 이동합니다.
- `/posts/:postId` 동적 라우트를 추가합니다.
- URL의 id로 게시글 하나를 찾아 보여줍니다.

## 작업 1. 상세 페이지 라우트 추가하기

게시글마다 다른 상세 화면을 보여주기 위해 `/posts/:postId` 라우트를 추가합니다. `:postId`는 주소에서 바뀌는 값을 뜻합니다.

### 수정할 파일

- 수정: [src/App.jsx](../../src/App.jsx)
- 새 파일: [src/pages/PostDetailPage.jsx](../../src/pages/PostDetailPage.jsx)

### 코드 변경

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/App.jsx b/src/App.jsx
index da358e1..139a728 100644
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -3,6 +3,7 @@ import Footer from './components/Footer'
 import Header from './components/Header'
 import AboutPage from './pages/AboutPage'
 import HomePage from './pages/HomePage'
+import PostDetailPage from './pages/PostDetailPage'
 import PostsPage from './pages/PostsPage'
 
 function App() {
@@ -13,6 +14,7 @@ function App() {
         <Route path="/" element={<HomePage />} />
         <Route path="/about" element={<AboutPage />} />
         <Route path="/posts" element={<PostsPage />} />
+        <Route path="/posts/:postId" element={<PostDetailPage />} />
       </Routes>
       <Footer />
     </BrowserRouter>
diff --git a/src/pages/PostDetailPage.jsx b/src/pages/PostDetailPage.jsx
new file mode 100644
index 0000000..41946b8
--- /dev/null
+++ b/src/pages/PostDetailPage.jsx
@@ -0,0 +1,28 @@
+import { Link, useParams } from 'react-router-dom'
+import { posts } from '../data/posts'
+
+function PostDetailPage() {
+  const { postId } = useParams()
+  const post = posts.find((item) => item.id === postId)
+
+  if (!post) {
+    return (
+      <main>
+        <h1>Post not found</h1>
+        <p>No post matches this address.</p>
+        <Link to="/posts">Back to posts</Link>
+      </main>
+    )
+  }
+
+  return (
+    <main>
+      <h1>{post.title}</h1>
+      <p>Written by {post.author}</p>
+      <p>{post.content}</p>
+      <Link to="/posts">Back to posts</Link>
+    </main>
+  )
+}
+
+export default PostDetailPage
~~~

### 설명과 확인

- `useParams`는 현재 주소에 들어 있는 동적 값을 읽습니다.
- `posts.find(...)`는 배열에서 조건에 맞는 게시글 하나를 찾습니다.
- 없는 id로 접근하면 간단한 안내 화면을 보여줍니다.

## 작업 2. 목록 카드에서 상세 페이지로 이동하기

게시글 제목을 클릭하면 해당 게시글 상세 주소로 이동하도록 `PostCard`에 링크를 추가합니다.

### 수정할 파일

- 수정: [src/components/PostCard.jsx](../../src/components/PostCard.jsx)
- 수정: [src/pages/PostsPage.jsx](../../src/pages/PostsPage.jsx)

### 코드 변경

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/components/PostCard.jsx b/src/components/PostCard.jsx
index 40b9e29..34e2bc6 100644
--- a/src/components/PostCard.jsx
+++ b/src/components/PostCard.jsx
@@ -1,7 +1,11 @@
-function PostCard({ title, excerpt, author }) {
+import { Link } from 'react-router-dom'
+
+function PostCard({ id, title, excerpt, author }) {
   return (
     <article className="post-card">
-      <h2>{title}</h2>
+      <h2>
+        <Link to={`/posts/${id}`}>{title}</Link>
+      </h2>
       <p>{excerpt}</p>
       <p>Written by {author}</p>
     </article>
diff --git a/src/pages/PostsPage.jsx b/src/pages/PostsPage.jsx
index c9f7962..aef3c92 100644
--- a/src/pages/PostsPage.jsx
+++ b/src/pages/PostsPage.jsx
@@ -8,6 +8,7 @@ function PostsPage() {
       {posts.map((post) => (
         <PostCard
           key={post.id}
+          id={post.id}
           title={post.title}
           excerpt={post.excerpt}
           author={post.author}
~~~

### 설명과 확인

- 카드는 `id` props를 받아 `/posts/게시글id` 주소를 만듭니다.
- 목록 화면은 각 게시글의 `id`도 `PostCard`에 넘겨야 합니다.

## 실행 확인

~~~bash
npm run dev
~~~

브라우저에서 이번 단계의 화면을 직접 눌러 확인합니다. 문제가 없으면 다음 step으로 넘어갑니다.
