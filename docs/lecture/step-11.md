# Step 11. 게시글 삭제

## 이번 단계에서 할 일

- 상세 화면에서 게시글을 삭제합니다.
- `filter`로 삭제된 글을 제외한 새 배열을 만듭니다.
- 삭제 후 게시글 목록으로 이동합니다.

## 시작 전 확인

권장 시간은 45분입니다. 개인 실습 저장소의 `main`에서 직전 단계까지 마친 상태로 시작합니다. 코드 블록은 복사해 붙이지 않고 직접 입력합니다.

Windows Terminal의 PowerShell에서 개인 저장소의 `main`과 변경 상태를 확인합니다.

~~~powershell
Set-Location "$HOME\dongbu\ReactMiniBlog_Steps"
git branch --show-current
git status --short
~~~

`git branch --show-current`에는 `main`이 표시되고 `git status --short`의 출력은 없어야 합니다. 변경이 남아 있다면 원인을 확인하고 시작 상태를 정리합니다.

## 작업 1. 상세 화면에서 게시글 삭제하기

삭제는 배열에서 특정 id의 게시글을 제외한 새 배열을 만드는 일로 이해할 수 있습니다. 삭제 후에는 목록 화면으로 이동합니다.

### 수정할 파일

- 수정: `src/App.jsx`
- 수정: `src/pages/PostDetailPage.jsx`

### 코드 변경

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/App.jsx b/src/App.jsx
index 6580aec..d39fcc4 100644
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -25,6 +25,12 @@ function App() {
     return newPost
   }
 
+  function deletePost(id) {
+    setPosts((currentPosts) =>
+      currentPosts.filter((post) => post.id !== id),
+    )
+  }
+
   return (
     <BrowserRouter>
       <Header />
@@ -38,7 +44,7 @@ function App() {
         />
         <Route
           path="/posts/:postId"
-          element={<PostDetailPage posts={posts} />}
+          element={<PostDetailPage posts={posts} onDelete={deletePost} />}
         />
       </Routes>
       <Footer />
diff --git a/src/pages/PostDetailPage.jsx b/src/pages/PostDetailPage.jsx
index 257a7ee..fe0c6ad 100644
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
 
@@ -27,6 +28,15 @@ function PostDetailPage({ posts }) {
       >
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
- 함수형 updater의 `currentPosts`는 삭제 시점의 최신 배열입니다.
- 부모의 `deletePost` 함수를 상세 페이지에 props로 전달합니다.
- 삭제 후 `navigate('/posts')`로 목록 화면으로 이동합니다.

## 완료 결과 및 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. npm 명령은 `npm.cmd`로 실행합니다.

~~~powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
~~~

Delete를 누르면 Posts 화면으로 이동하고 해당 카드가 사라지는지 확인합니다. 삭제 전 상세 주소를 다시 열면 Post not found가 보여야 합니다.

## 독립 확인

글을 삭제한 뒤 목록과 상세 주소의 결과를 확인합니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험을 위해 바꾼 값은 다음 단계 전에 복구합니다.

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
git commit -m "Complete React step 11"
git push origin main
git status --short --branch
```

현재 브랜치는 `main`이어야 합니다. 마지막 상태에서 `main...origin/main` 뒤에 `ahead`가 없고 작업 파일 목록도 비어 있어야 합니다.
