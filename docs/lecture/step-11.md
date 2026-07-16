# Step 11. 게시글 삭제

## 이번 단계에서 할 일

- 상세 화면에서 게시글을 삭제합니다.
- `filter`로 삭제된 글을 제외한 새 배열을 만듭니다.
- 삭제 후 게시글 목록으로 이동합니다.

## 작업 1. 상세 화면에서 게시글 삭제하기

삭제는 배열에서 특정 id의 게시글을 제외한 새 배열을 만드는 일로 이해할 수 있습니다. 삭제 후에는 목록 화면으로 이동합니다.

### 수정할 파일

- 수정: [src/App.jsx](../../src/App.jsx)
- 수정: [src/pages/PostDetailPage.jsx](../../src/pages/PostDetailPage.jsx)

### 코드 변경

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/App.jsx b/src/App.jsx
index ecf4084..bbbe0d5 100644
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -25,6 +25,10 @@ function App() {
     return newPost
   }
 
+  function deletePost(id) {
+    setPosts(posts.filter((post) => post.id !== id))
+  }
+
   return (
     <BrowserRouter>
       <Header />
@@ -38,7 +42,7 @@ function App() {
         />
         <Route
           path="/posts/:postId"
-          element={<PostDetailPage posts={posts} />}
+          element={<PostDetailPage posts={posts} onDelete={deletePost} />}
         />
       </Routes>
       <Footer />
diff --git a/src/pages/PostDetailPage.jsx b/src/pages/PostDetailPage.jsx
index 0f0dfeb..1b954a2 100644
--- a/src/pages/PostDetailPage.jsx
+++ b/src/pages/PostDetailPage.jsx
@@ -1,8 +1,9 @@
 import { useState } from 'react'
-import { Link, useParams } from 'react-router-dom'
+import { Link, useNavigate, useParams } from 'react-router-dom'
 
-function PostDetailPage({ posts }) {
+function PostDetailPage({ posts, onDelete }) {
   const { postId } = useParams()
+  const navigate = useNavigate()
   const post = posts.find((item) => item.id === postId)
   const [likes, setLikes] = useState(0)
 
@@ -24,6 +25,15 @@ function PostDetailPage({ posts }) {
       <button type="button" onClick={() => setLikes(likes + 1)}>
         Like {likes}
       </button>
+      <button
+        type="button"
+        onClick={() => {
+          onDelete(post.id)
+          navigate('/posts')
+        }}
+      >
+        Delete
+      </button>
       <Link to="/posts">Back to posts</Link>
     </main>
   )
~~~

### 설명과 확인

- `filter`는 조건을 통과한 항목만 남긴 새 배열을 만듭니다.
- 부모의 `deletePost` 함수를 상세 페이지에 props로 전달합니다.
- 삭제 후 `navigate("/posts")`로 목록 화면으로 이동합니다.

## 실행 확인

~~~bash
npm run dev
~~~

브라우저에서 이번 단계의 화면을 직접 눌러 확인합니다. 문제가 없으면 다음 step으로 넘어갑니다.
