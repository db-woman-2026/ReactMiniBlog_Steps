# Step 12. 게시글 수정

## 이번 단계에서 할 일

- 기존 게시글을 수정하는 edit 화면을 추가합니다.
- 기존 값을 form 초기값으로 넣습니다.
- `map`으로 해당 게시글만 새 값으로 교체합니다.

## 작업 1. 수정 함수와 edit 라우트 추가하기

게시글 수정은 배열 안의 특정 게시글만 새 값으로 바꾸는 흐름입니다. App에 `updatePost` 함수를 만들고 edit 화면 라우트를 등록합니다.

### 수정할 파일

- 수정: [src/App.jsx](../../src/App.jsx)

### 코드 변경

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/App.jsx b/src/App.jsx
index bbbe0d5..69eefc3 100644
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -4,6 +4,7 @@ import Footer from './components/Footer'
 import Header from './components/Header'
 import { initialPosts } from './data/posts'
 import AboutPage from './pages/AboutPage'
+import EditPostPage from './pages/EditPostPage'
 import HomePage from './pages/HomePage'
 import NewPostPage from './pages/NewPostPage'
 import PostDetailPage from './pages/PostDetailPage'
@@ -29,6 +30,21 @@ function App() {
     setPosts(posts.filter((post) => post.id !== id))
   }
 
+  function updatePost(id, postInput) {
+    setPosts(
+      posts.map((post) =>
+        post.id === id
+          ? {
+              ...post,
+              title: postInput.title,
+              excerpt: postInput.content.slice(0, 80),
+              content: postInput.content,
+            }
+          : post,
+      ),
+    )
+  }
+
   return (
     <BrowserRouter>
       <Header />
@@ -44,6 +60,10 @@ function App() {
           path="/posts/:postId"
           element={<PostDetailPage posts={posts} onDelete={deletePost} />}
         />
+        <Route
+          path="/posts/:postId/edit"
+          element={<EditPostPage posts={posts} onUpdate={updatePost} />}
+        />
       </Routes>
       <Footer />
     </BrowserRouter>
~~~

### 설명과 확인

- `map`은 모든 게시글을 돌면서 수정 대상만 새 객체로 바꿉니다.
- `...post`는 기존 게시글의 나머지 값을 유지할 때 사용합니다.

## 작업 2. EditPostPage 만들기

수정 화면은 기존 게시글의 제목과 내용을 form 초기값으로 사용합니다. 저장하면 부모의 `onUpdate` 함수를 호출하고 상세 화면으로 돌아갑니다.

### 수정할 파일

- 새 파일: [src/pages/EditPostPage.jsx](../../src/pages/EditPostPage.jsx)
- 수정: [src/pages/PostDetailPage.jsx](../../src/pages/PostDetailPage.jsx)

### 코드 변경

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/pages/EditPostPage.jsx b/src/pages/EditPostPage.jsx
new file mode 100644
index 0000000..d1ece64
--- /dev/null
+++ b/src/pages/EditPostPage.jsx
@@ -0,0 +1,73 @@
+import { useState } from 'react'
+import { Link, useNavigate, useParams } from 'react-router-dom'
+
+function EditPostPage({ posts, onUpdate }) {
+  const { postId } = useParams()
+  const navigate = useNavigate()
+  const post = posts.find((item) => item.id === postId)
+  const [title, setTitle] = useState(post?.title ?? '')
+  const [content, setContent] = useState(post?.content ?? '')
+  const [error, setError] = useState('')
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
+  function handleSubmit(event) {
+    event.preventDefault()
+
+    const trimmedTitle = title.trim()
+    const trimmedContent = content.trim()
+
+    if (!trimmedTitle || !trimmedContent) {
+      setError('Please enter both a title and content.')
+      return
+    }
+
+    onUpdate(post.id, {
+      title: trimmedTitle,
+      content: trimmedContent,
+    })
+
+    navigate(`/posts/${post.id}`)
+  }
+
+  return (
+    <main>
+      <h1>Edit Post</h1>
+      <form onSubmit={handleSubmit}>
+        {error && <p className="error-message">{error}</p>}
+
+        <label htmlFor="title">Title</label>
+        <input
+          id="title"
+          value={title}
+          onChange={(event) => {
+            setTitle(event.target.value)
+            setError('')
+          }}
+        />
+
+        <label htmlFor="content">Content</label>
+        <textarea
+          id="content"
+          value={content}
+          onChange={(event) => {
+            setContent(event.target.value)
+            setError('')
+          }}
+        />
+
+        <button type="submit">Save Post</button>
+      </form>
+    </main>
+  )
+}
+
+export default EditPostPage
diff --git a/src/pages/PostDetailPage.jsx b/src/pages/PostDetailPage.jsx
index 1b954a2..35c8dc5 100644
--- a/src/pages/PostDetailPage.jsx
+++ b/src/pages/PostDetailPage.jsx
@@ -34,6 +34,7 @@ function PostDetailPage({ posts, onDelete }) {
       >
         Delete
       </button>
+      <Link to={`/posts/${post.id}/edit`}>Edit</Link>
       <Link to="/posts">Back to posts</Link>
     </main>
   )
~~~

### 설명과 확인

- 작성 form과 비슷하지만, 처음 state 값이 기존 게시글 값입니다.
- 없는 게시글 id로 들어오면 Post not found 화면을 보여줍니다.
- 상세 화면에는 Edit 링크를 추가합니다.

## 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. `git`, `node`, `npm` 명령은 PowerShell에서도 같습니다. `npm.ps1` 오류가 나면 `npm.cmd`를 사용합니다.

~~~bash
npm run dev
~~~

브라우저에서 이번 단계의 화면을 직접 눌러 확인합니다. 문제가 없으면 다음 step으로 넘어갑니다.
