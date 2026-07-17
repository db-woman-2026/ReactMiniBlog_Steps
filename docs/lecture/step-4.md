# Step 4. Props로 게시글 카드 만들기

## 이번 단계에서 할 일

- PostCard 컴포넌트에 게시글 데이터를 props로 전달합니다.
- 데이터와 화면 컴포넌트를 분리합니다.
- 같은 컴포넌트가 다른 데이터를 보여줄 준비를 합니다.

## 시작 전 확인

권장 시간은 40분입니다. 이 문서의 diff는 `step-3` 완료 코드에 적용합니다. `step-4` branch는 아래 변경이 이미 반영된 완성본입니다.

Windows Terminal의 PowerShell에서 시작 branch와 변경 상태를 확인합니다.

~~~powershell
Set-Location "$HOME\dongbu\ReactMiniBlog_Steps"
git switch step-3
git status --short
~~~

`git status --short`의 출력이 없어야 합니다. 변경이 남아 있다면 원인을 확인하고 시작 상태를 정리합니다.

## 작업 1. PostCard에 props 전달하기

게시글 카드 모양을 `PostCard` 컴포넌트로 만들고, 제목/요약/작성자 값을 props로 전달합니다. 아직 목록 반복은 하지 않고 게시글 하나만 보여줍니다.

### 수정할 파일

- 새 파일: [src/components/PostCard.jsx](../../src/components/PostCard.jsx)
- 새 파일: [src/data/posts.js](../../src/data/posts.js)
- 수정: [src/pages/PostsPage.jsx](../../src/pages/PostsPage.jsx)
- 수정: [src/index.css](../../src/index.css)

### 코드 변경

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/components/PostCard.jsx b/src/components/PostCard.jsx
new file mode 100644
index 0000000..40b9e29
--- /dev/null
+++ b/src/components/PostCard.jsx
@@ -0,0 +1,11 @@
+function PostCard({ title, excerpt, author }) {
+  return (
+    <article className="post-card">
+      <h2>{title}</h2>
+      <p>{excerpt}</p>
+      <p>Written by {author}</p>
+    </article>
+  )
+}
+
+export default PostCard
diff --git a/src/data/posts.js b/src/data/posts.js
new file mode 100644
index 0000000..32c6f1a
--- /dev/null
+++ b/src/data/posts.js
@@ -0,0 +1,5 @@
+export const featuredPost = {
+  title: 'Getting Started with React',
+  excerpt: 'React lets us build a screen by combining small components.',
+  author: 'Mini Blog Team',
+}
diff --git a/src/index.css b/src/index.css
index 40af685..d1b5caa 100644
--- a/src/index.css
+++ b/src/index.css
@@ -43,3 +43,9 @@ nav {
   display: flex;
   gap: 12px;
 }
+
+.post-card {
+  margin: 16px 0;
+  padding: 16px;
+  border: 1px solid #ddd;
+}
diff --git a/src/pages/PostsPage.jsx b/src/pages/PostsPage.jsx
index 851d6b5..bf69e47 100644
--- a/src/pages/PostsPage.jsx
+++ b/src/pages/PostsPage.jsx
@@ -1,8 +1,15 @@
+import PostCard from '../components/PostCard'
+import { featuredPost } from '../data/posts'
+
 function PostsPage() {
   return (
     <main>
       <h1>Posts</h1>
-      <p>Posts will be displayed here in the next steps.</p>
+      <PostCard
+        title={featuredPost.title}
+        excerpt={featuredPost.excerpt}
+        author={featuredPost.author}
+      />
     </main>
   )
 }
~~~

### 설명과 확인

- props는 부모가 자식 컴포넌트에 넘겨주는 값입니다.
- `PostCard`는 데이터를 직접 만들지 않고 받은 값을 화면에 보여줍니다.
- 데이터 파일을 따로 두면 화면 코드와 샘플 데이터를 구분해서 볼 수 있습니다.

## 완료 결과 및 실행 확인

> Windows 10/11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. npm 명령은 `npm.cmd`로 실행합니다.

~~~powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
~~~

Posts 화면에 제목, 요약, 작성자가 들어 있는 게시글 카드 하나가 보이는지 확인합니다.

## 독립 확인

서로 다른 author 값을 전달한 두 `PostCard`의 출력 차이를 확인합니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험을 위해 바꾼 값은 다음 단계 전에 복구합니다.
