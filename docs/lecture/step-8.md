# Step 8. Controlled Input

## 이번 단계에서 할 일

- 새 글 작성 화면을 추가합니다.
- 제목과 내용을 controlled input으로 관리합니다.
- 입력 중인 값을 preview로 바로 확인합니다.

## 작업 1. 새 글 작성 주소와 메뉴 추가하기

새 글 작성 화면으로 이동할 수 있도록 `/posts/new` 라우트와 Header 메뉴를 추가합니다.

### 수정할 파일

- 수정: [src/App.jsx](../../src/App.jsx)
- 수정: [src/components/Header.jsx](../../src/components/Header.jsx)

### 코드 변경

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/App.jsx b/src/App.jsx
index 139a728..42c542d 100644
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -3,6 +3,7 @@ import Footer from './components/Footer'
 import Header from './components/Header'
 import AboutPage from './pages/AboutPage'
 import HomePage from './pages/HomePage'
+import NewPostPage from './pages/NewPostPage'
 import PostDetailPage from './pages/PostDetailPage'
 import PostsPage from './pages/PostsPage'
 
@@ -14,6 +15,7 @@ function App() {
         <Route path="/" element={<HomePage />} />
         <Route path="/about" element={<AboutPage />} />
         <Route path="/posts" element={<PostsPage />} />
+        <Route path="/posts/new" element={<NewPostPage />} />
         <Route path="/posts/:postId" element={<PostDetailPage />} />
       </Routes>
       <Footer />
diff --git a/src/components/Header.jsx b/src/components/Header.jsx
index 9da27a5..ece04d9 100644
--- a/src/components/Header.jsx
+++ b/src/components/Header.jsx
@@ -8,6 +8,7 @@ function Header() {
         <Link to="/">Home</Link>
         <Link to="/about">About</Link>
         <Link to="/posts">Posts</Link>
+        <Link to="/posts/new">New Post</Link>
       </nav>
     </header>
   )
~~~

### 설명과 확인

- 정적인 주소인 `/posts/new`를 상세 주소보다 먼저 등록합니다.
- Header에 New Post 링크를 추가해 form 화면으로 이동할 수 있게 합니다.

## 작업 2. controlled input form 만들기

제목과 내용 입력값을 React state로 관리합니다. 아직 저장은 하지 않고, 입력 중인 값을 preview에 바로 보여줍니다.

### 수정할 파일

- 새 파일: [src/pages/NewPostPage.jsx](../../src/pages/NewPostPage.jsx)
- 수정: [src/index.css](../../src/index.css)

### 코드 변경

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/index.css b/src/index.css
index 3ae4e1d..c53f0c9 100644
--- a/src/index.css
+++ b/src/index.css
@@ -22,6 +22,19 @@ button {
   margin-right: 8px;
 }
 
+input,
+textarea {
+  display: block;
+  width: 100%;
+  margin: 4px 0 12px;
+  padding: 8px;
+  box-sizing: border-box;
+}
+
+textarea {
+  height: 140px;
+}
+
 header,
 footer {
   padding: 16px 0;
diff --git a/src/pages/NewPostPage.jsx b/src/pages/NewPostPage.jsx
new file mode 100644
index 0000000..aa144b8
--- /dev/null
+++ b/src/pages/NewPostPage.jsx
@@ -0,0 +1,35 @@
+import { useState } from 'react'
+
+function NewPostPage() {
+  const [title, setTitle] = useState('')
+  const [content, setContent] = useState('')
+
+  return (
+    <main>
+      <h1>New Post</h1>
+      <form>
+        <label htmlFor="title">Title</label>
+        <input
+          id="title"
+          value={title}
+          onChange={(event) => setTitle(event.target.value)}
+        />
+
+        <label htmlFor="content">Content</label>
+        <textarea
+          id="content"
+          value={content}
+          onChange={(event) => setContent(event.target.value)}
+        />
+      </form>
+
+      <section>
+        <h2>Preview</h2>
+        <h3>{title || 'Untitled post'}</h3>
+        <p>{content || 'Write something to preview the post content.'}</p>
+      </section>
+    </main>
+  )
+}
+
+export default NewPostPage
~~~

### 설명과 확인

- controlled input은 `value`와 `onChange`가 state와 연결된 입력창입니다.
- 입력값이 바뀔 때마다 state가 바뀌고 preview도 함께 바뀝니다.

## 실행 확인

~~~bash
npm run dev
~~~

브라우저에서 이번 단계의 화면을 직접 눌러 확인합니다. 문제가 없으면 다음 step으로 넘어갑니다.
