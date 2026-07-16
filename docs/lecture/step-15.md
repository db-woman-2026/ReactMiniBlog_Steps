# Step 15. mock fetch와 Next.js 연결

## 이번 단계에서 할 일

- 정적 JSON 파일에서 초기 게시글을 가져옵니다.
- 저장된 localStorage 데이터가 없을 때만 mock 데이터를 불러옵니다.
- 이 흐름이 Next.js API와 DB로 어떻게 이어지는지 확인합니다.

## 시작 전 확인

권장 시간은 70분입니다. 이 문서의 diff는 `step-14` 완료 코드에 적용합니다. `step-15` branch는 아래 변경이 이미 반영된 완성본입니다.

수정 전에 `git status --short`의 출력이 없는지 확인합니다. 변경이 남아 있다면 원인을 확인하고 시작 상태를 정리합니다.

## 작업 1. mock 게시글 JSON 추가하기

서버 없이도 외부 데이터처럼 불러오는 연습을 하기 위해 `public/posts.json` 파일을 만듭니다. 이 파일은 브라우저에서 `/posts.json` 주소로 요청할 수 있습니다.

### 수정할 파일

- 새 파일: [public/posts.json](../../public/posts.json)

### 코드 변경

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/public/posts.json b/public/posts.json
new file mode 100644
index 0000000..8004dd2
--- /dev/null
+++ b/public/posts.json
@@ -0,0 +1,23 @@
+[
+  {
+    "id": "1",
+    "title": "Getting Started with React",
+    "excerpt": "React lets us build a screen by combining small components.",
+    "content": "React components are JavaScript functions that return JSX. A page can be built by combining small components together.",
+    "author": "Mini Blog Team"
+  },
+  {
+    "id": "2",
+    "title": "Why Props Matter",
+    "excerpt": "Props let a parent component pass data to a child component.",
+    "content": "Props are useful because the same component can show different data. This keeps our UI reusable and easier to read.",
+    "author": "Mini Blog Team"
+  },
+  {
+    "id": "3",
+    "title": "Rendering Lists",
+    "excerpt": "The map method turns an array of data into an array of elements.",
+    "content": "Most apps show lists: posts, products, messages, or comments. React uses arrays and map to render those lists.",
+    "author": "Mini Blog Team"
+  }
+]
~~~

### 설명과 확인

- JSON은 JavaScript 객체와 비슷하지만 문자열 key에 큰따옴표를 사용합니다.
- 정적 JSON 파일은 실제 서버 API로 넘어가기 전 연습용 데이터로 사용합니다.

## 작업 2. 저장된 데이터가 없을 때 mock 데이터 불러오기

이미 localStorage에 글이 있으면 그 데이터를 사용하고, 저장된 데이터가 없을 때만 `/posts.json`을 fetch합니다. 로딩 중에는 간단한 안내 화면을 보여줍니다.

### 수정할 파일

- 수정: [src/App.jsx](../../src/App.jsx)

### 코드 변경

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/App.jsx b/src/App.jsx
index 8fece1a..0c602dd 100644
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -12,27 +12,73 @@ import PostsPage from './pages/PostsPage'
 
 const STORAGE_KEY = 'react-mini-blog-posts'
 
-function loadInitialPosts() {
+function loadSavedPosts() {
   const savedPosts = localStorage.getItem(STORAGE_KEY)
 
   if (!savedPosts) {
-    return initialPosts
+    return null
   }
 
   try {
     const parsedPosts = JSON.parse(savedPosts)
-    return Array.isArray(parsedPosts) ? parsedPosts : initialPosts
+    return Array.isArray(parsedPosts) ? parsedPosts : null
   } catch {
-    return initialPosts
+    return null
   }
 }
 
 function App() {
-  const [posts, setPosts] = useState(loadInitialPosts)
+  const [savedPosts] = useState(loadSavedPosts)
+  const [posts, setPosts] = useState(savedPosts ?? [])
+  const [isLoading, setIsLoading] = useState(savedPosts === null)
 
   useEffect(() => {
+    if (savedPosts !== null) {
+      return
+    }
+
+    let ignore = false
+
+    async function loadStarterPosts() {
+      try {
+        const response = await fetch('/posts.json')
+
+        if (!response.ok) {
+          throw new Error('Failed to load starter posts.')
+        }
+
+        const starterPosts = await response.json()
+
+        if (!Array.isArray(starterPosts)) {
+          throw new Error('Starter posts must be an array.')
+        }
+
+        if (!ignore) {
+          setPosts(starterPosts)
+          setIsLoading(false)
+        }
+      } catch {
+        if (!ignore) {
+          setPosts(initialPosts)
+          setIsLoading(false)
+        }
+      }
+    }
+
+    loadStarterPosts()
+
+    return () => {
+      ignore = true
+    }
+  }, [savedPosts])
+
+  useEffect(() => {
+    if (isLoading) {
+      return
+    }
+
     localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
-  }, [posts])
+  }, [isLoading, posts])
 
   function createPost(postInput) {
     const newPost = {
@@ -71,23 +117,30 @@ function App() {
   return (
     <BrowserRouter>
       <Header />
-      <Routes>
-        <Route path="/" element={<HomePage />} />
-        <Route path="/about" element={<AboutPage />} />
-        <Route path="/posts" element={<PostsPage posts={posts} />} />
-        <Route
-          path="/posts/new"
-          element={<NewPostPage onCreate={createPost} />}
-        />
-        <Route
-          path="/posts/:postId"
-          element={<PostDetailPage posts={posts} onDelete={deletePost} />}
-        />
-        <Route
-          path="/posts/:postId/edit"
-          element={<EditPostPage posts={posts} onUpdate={updatePost} />}
-        />
-      </Routes>
+      {isLoading ? (
+        <main>
+          <h1>Loading posts...</h1>
+          <p>Loading starter data from public/posts.json.</p>
+        </main>
+      ) : (
+        <Routes>
+          <Route path="/" element={<HomePage />} />
+          <Route path="/about" element={<AboutPage />} />
+          <Route path="/posts" element={<PostsPage posts={posts} />} />
+          <Route
+            path="/posts/new"
+            element={<NewPostPage onCreate={createPost} />}
+          />
+          <Route
+            path="/posts/:postId"
+            element={<PostDetailPage posts={posts} onDelete={deletePost} />}
+          />
+          <Route
+            path="/posts/:postId/edit"
+            element={<EditPostPage posts={posts} onUpdate={updatePost} />}
+          />
+        </Routes>
+      )}
       <Footer />
     </BrowserRouter>
   )
~~~

### 설명과 확인

- `fetch`는 주소로 데이터를 요청할 때 사용하는 기본 함수입니다.
- 저장 데이터와 fetch 응답은 JSON 문법뿐 아니라 배열 형식도 확인합니다.
- 이 프로젝트에서는 정적 JSON을 가져오지만, Next.js에서는 API Route와 DB 요청으로 확장됩니다.
- 로딩 중에는 목록 라우트 대신 로딩 화면을 보여줍니다.

## 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. `git`, `node`, `npm` 명령은 PowerShell에서도 같습니다. `npm.ps1` 오류가 나면 `npm.cmd`를 사용합니다.

~~~bash
npm run dev
~~~

브라우저에서 이번 단계의 화면을 직접 눌러 확인합니다. 문제가 없으면 다음 step으로 넘어갑니다.

## 독립 확인

localStorage를 비운 뒤 mock fetch 성공을 확인합니다. `posts.json`을 잠시 `{}`로 바꿔 fallback 목록도 확인하고, 결과를 기록한 뒤 파일을 복구합니다.
