# Step 13. 게시글 검색

## 이번 단계에서 할 일

- 게시글 목록에 검색 입력창을 추가합니다.
- keyword state로 입력값을 관리합니다.
- `filter`로 제목과 내용에 검색어가 포함된 글만 보여줍니다.

## 시작 전 확인

권장 시간은 40분입니다. 개인 실습 저장소의 `main`에서 직전 단계까지 마친 상태로 시작합니다. 코드 블록은 복사해 붙이지 않고 직접 입력합니다.

Windows Terminal의 PowerShell에서 개인 저장소의 `main`과 변경 상태를 확인합니다.

~~~powershell
Set-Location "$HOME\dongbu\ReactMiniBlog_Steps"
git branch --show-current
git status --short
~~~

`git branch --show-current`에는 `main`이 표시되고 `git status --short`의 출력은 없어야 합니다. 변경이 남아 있다면 원인을 확인하고 시작 상태를 정리합니다.

## 작업 1. keyword로 게시글 검색하기

검색어 입력값을 state로 관리하고, 제목 또는 내용에 검색어가 들어간 게시글만 화면에 보여줍니다.

### 수정할 파일

- 수정: `src/pages/PostsPage.jsx`

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

## 완료 결과 및 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. npm 명령은 `npm.cmd`로 실행합니다.

~~~powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
~~~

`React`와 `react`의 결과가 같은지 확인합니다. 없는 검색어에는 No posts found가 보이고 입력을 지우면 전체 목록이 돌아와야 합니다.

## 독립 확인

대문자와 소문자 검색어가 같은 결과를 내는지 확인합니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험을 위해 바꾼 값은 다음 단계 전에 복구합니다.

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
git commit -m "Complete React step 13"
git push origin main
git status --short --branch
```

현재 브랜치는 `main`이어야 합니다. 마지막 상태에서 `main...origin/main` 뒤에 `ahead`가 없고 작업 파일 목록도 비어 있어야 합니다.
