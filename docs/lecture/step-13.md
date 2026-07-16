# Step 13. 게시글 검색

## 이번 단계에서 할 일

- 게시글 목록에 검색 입력창을 추가합니다.
- keyword state로 입력값을 관리합니다.
- `filter`로 제목과 내용에 검색어가 포함된 글만 보여줍니다.

## 작업 1. keyword로 게시글 검색하기

검색어 입력값을 state로 관리하고, 제목 또는 내용에 검색어가 들어간 게시글만 화면에 보여줍니다.

### 수정할 파일

- 수정: [src/pages/PostsPage.jsx](../../src/pages/PostsPage.jsx)

### 코드 변경

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/pages/PostsPage.jsx b/src/pages/PostsPage.jsx
index faa7f21..a977def 100644
--- a/src/pages/PostsPage.jsx
+++ b/src/pages/PostsPage.jsx
@@ -1,18 +1,41 @@
+import { useState } from 'react'
 import PostCard from '../components/PostCard'
 
 function PostsPage({ posts }) {
+  const [keyword, setKeyword] = useState('')
+  const normalizedKeyword = keyword.trim().toLowerCase()
+  const filteredPosts = posts.filter((post) => {
+    const title = post.title.toLowerCase()
+    const content = post.content.toLowerCase()
+
+    return title.includes(normalizedKeyword) || content.includes(normalizedKeyword)
+  })
+
   return (
     <main>
       <h1>Posts</h1>
-      {posts.map((post) => (
-        <PostCard
-          key={post.id}
-          id={post.id}
-          title={post.title}
-          excerpt={post.excerpt}
-          author={post.author}
-        />
-      ))}
+
+      <label htmlFor="keyword">Search posts</label>
+      <input
+        id="keyword"
+        value={keyword}
+        onChange={(event) => setKeyword(event.target.value)}
+        placeholder="Type a keyword"
+      />
+
+      {filteredPosts.length === 0 ? (
+        <p>No posts found.</p>
+      ) : (
+        filteredPosts.map((post) => (
+          <PostCard
+            key={post.id}
+            id={post.id}
+            title={post.title}
+            excerpt={post.excerpt}
+            author={post.author}
+          />
+        ))
+      )}
     </main>
   )
 }
~~~

### 설명과 확인

- 검색어는 `keyword` state에 저장됩니다.
- `toLowerCase()`를 사용해 대소문자 차이를 줄입니다.
- 검색 결과가 없을 때는 별도 안내 문구를 보여줍니다.

## 실행 확인

~~~bash
npm run dev
~~~

브라우저에서 이번 단계의 화면을 직접 눌러 확인합니다. 문제가 없으면 다음 step으로 넘어갑니다.
