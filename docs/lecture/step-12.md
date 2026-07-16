# Step 12. 게시글 수정

## 이번 단계에서 할 일

- 기존 게시글을 수정하는 edit 화면을 추가합니다.
- 기존 값을 form 초기값으로 넣습니다.
- `map`으로 해당 게시글만 새 값으로 교체합니다.

## 시작 전 확인

권장 시간은 70분입니다. 이 문서의 diff는 `step-11` 완료 코드에 적용합니다. `step-12` branch는 아래 변경이 이미 반영된 완성본입니다.

수정 전에 `git status --short`의 출력이 없는지 확인합니다. 변경이 남아 있다면 원인을 확인하고 시작 상태를 정리합니다.

## 작업 1. 수정 함수와 edit 라우트 추가하기

게시글 수정은 배열 안의 특정 게시글만 새 값으로 바꾸는 흐름입니다. App에 `updatePost` 함수를 만들고 edit 화면 라우트를 등록합니다.

### 수정할 파일

- 수정: [src/App.jsx](../../src/App.jsx)

### 코드 변경

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/App.jsx b/src/App.jsx
index d39fcc4..c856a63 100644
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
@@ -31,6 +32,21 @@ function App() {
     )
   }
 
+  function updatePost(id, postInput) {
+    setPosts((currentPosts) =>
+      currentPosts.map((post) =>
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
@@ -46,6 +62,10 @@ function App() {
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
- 함수형 updater의 `currentPosts`는 수정 시점의 최신 배열입니다.
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
index fe0c6ad..a370b0c 100644
--- a/src/pages/PostDetailPage.jsx
+++ b/src/pages/PostDetailPage.jsx
@@ -37,6 +37,7 @@ function PostDetailPage({ posts, onDelete }) {
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

Edit 화면에는 기존 값이 들어 있어야 합니다. 저장 후 같은 id의 상세 화면에서 제목과 내용만 바뀌었는지 확인합니다.

## 독립 확인

수정 전후 title, content, id가 어떻게 달라지는지 비교합니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험을 위해 바꾼 값은 다음 단계 전에 복구합니다.
