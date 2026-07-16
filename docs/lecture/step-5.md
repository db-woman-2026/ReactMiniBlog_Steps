# Step 5. 배열과 목록 렌더링

## 이번 단계에서 할 일

- 게시글 배열을 만들고 `map`으로 목록을 렌더링합니다.
- 여러 게시글을 같은 PostCard 모양으로 출력합니다.
- 목록 렌더링에서 key가 필요한 이유를 확인합니다.

## 시작 전 확인

권장 시간은 45분입니다. 이 문서의 diff는 `step-4` 완료 코드에 적용합니다. `step-5` branch는 아래 변경이 이미 반영된 완성본입니다.

수정 전에 `git status --short`의 출력이 없는지 확인합니다. 변경이 남아 있다면 원인을 확인하고 시작 상태를 정리합니다.

## 작업 1. 게시글 데이터를 배열로 바꾸기

게시글 하나만 있던 데이터를 여러 게시글이 들어 있는 배열로 바꿉니다. 각 게시글에는 나중에 상세 페이지에서 사용할 `id`와 `content`도 함께 둡니다.

### 수정할 파일

- 수정: [src/data/posts.js](../../src/data/posts.js)

### 코드 변경

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/data/posts.js b/src/data/posts.js
index 32c6f1a..830bfd2 100644
--- a/src/data/posts.js
+++ b/src/data/posts.js
@@ -1,5 +1,26 @@
-export const featuredPost = {
-  title: 'Getting Started with React',
-  excerpt: 'React lets us build a screen by combining small components.',
-  author: 'Mini Blog Team',
-}
+export const posts = [
+  {
+    id: '1',
+    title: 'Getting Started with React',
+    excerpt: 'React lets us build a screen by combining small components.',
+    content:
+      'React components are JavaScript functions that return JSX. A page can be built by combining small components together.',
+    author: 'Mini Blog Team',
+  },
+  {
+    id: '2',
+    title: 'Why Props Matter',
+    excerpt: 'Props let a parent component pass data to a child component.',
+    content:
+      'Props are useful because the same component can show different data. This keeps our UI reusable and easier to read.',
+    author: 'Mini Blog Team',
+  },
+  {
+    id: '3',
+    title: 'Rendering Lists',
+    excerpt: 'The map method turns an array of data into an array of elements.',
+    content:
+      'Most apps show lists: posts, products, messages, or comments. React uses arrays and map to render those lists.',
+    author: 'Mini Blog Team',
+  },
+]
~~~

### 설명과 확인

- 배열은 여러 개의 비슷한 데이터를 한 곳에 모을 때 사용합니다.
- `id`는 목록에서 각 게시글을 구분하는 값입니다.

## 작업 2. map으로 목록 출력하기

`posts.map(...)`을 사용해 배열의 각 게시글을 `PostCard`로 바꿉니다. 같은 컴포넌트가 여러 데이터에 반복 적용됩니다.

### 수정할 파일

- 수정: [src/pages/PostsPage.jsx](../../src/pages/PostsPage.jsx)

### 코드 변경

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/pages/PostsPage.jsx b/src/pages/PostsPage.jsx
index bf69e47..c9f7962 100644
--- a/src/pages/PostsPage.jsx
+++ b/src/pages/PostsPage.jsx
@@ -1,15 +1,18 @@
 import PostCard from '../components/PostCard'
-import { featuredPost } from '../data/posts'
+import { posts } from '../data/posts'
 
 function PostsPage() {
   return (
     <main>
       <h1>Posts</h1>
-      <PostCard
-        title={featuredPost.title}
-        excerpt={featuredPost.excerpt}
-        author={featuredPost.author}
-      />
+      {posts.map((post) => (
+        <PostCard
+          key={post.id}
+          title={post.title}
+          excerpt={post.excerpt}
+          author={post.author}
+        />
+      ))}
     </main>
   )
 }
~~~

### 설명과 확인

- `map`은 배열의 각 항목을 다른 값으로 바꿔 새 배열을 만듭니다.
- React 목록에는 각 항목을 구분할 `key`가 필요합니다.

## 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. `git`, `node`, `npm` 명령은 PowerShell에서도 같습니다. `npm.ps1` 오류가 나면 `npm.cmd`를 사용합니다.

~~~bash
npm run dev
~~~

Posts 화면에 서로 다른 제목을 가진 카드 세 개가 배열 순서대로 보이는지 확인합니다.

## 독립 확인

게시글 객체 하나를 추가하고 `key`가 중복되지 않는지 확인합니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험을 위해 바꾼 값은 다음 단계 전에 복구합니다.
