# Step 3. React Router 기초

## 이번 단계에서 할 일

- React Router를 설치하고 URL과 화면을 연결합니다.
- `/`, `/about`, `/posts` 주소를 만듭니다.
- Link를 사용해 페이지 사이를 이동합니다.

## 시작 전 확인

권장 시간은 60분입니다. 이 문서의 diff는 `step-2` 완료 코드에 적용합니다. `step-3` branch는 아래 변경이 이미 반영된 완성본입니다.

수정 전에 `git status --short`의 출력이 없는지 확인합니다. 변경이 남아 있다면 원인을 확인하고 시작 상태를 정리합니다.

## 작업 1. React Router 설치

Vite는 React 앱을 실행해주는 도구이고, 라우팅은 직접 추가해야 합니다. React Router를 설치해 URL과 화면을 연결할 준비를 합니다.

### 수정할 파일

- 명령으로 처리: `react-router-dom 설치`

### 먼저 실행

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. `git`, `node`, `npm` 명령은 PowerShell에서도 같습니다. `npm.ps1` 오류가 나면 `npm.cmd`를 사용합니다.

~~~bash
npm install react-router-dom
~~~

### 설명과 확인

- 설치 명령은 필요한 의존성을 자동으로 반영합니다.
- 수동으로 자동 생성 파일을 타이핑하지 않습니다.

## 작업 2. 주소와 페이지 연결하기

`BrowserRouter`로 앱을 감싸고, `Routes` 안에 주소별 화면을 등록합니다. Header의 메뉴는 일반 `a` 태그 대신 React Router의 `Link`를 사용합니다.

### 수정할 파일

- 수정: [src/App.jsx](../../src/App.jsx)
- 수정: [src/components/Header.jsx](../../src/components/Header.jsx)
- 새 파일: [src/pages/AboutPage.jsx](../../src/pages/AboutPage.jsx)
- 새 파일: [src/pages/PostsPage.jsx](../../src/pages/PostsPage.jsx)
- 수정: [src/index.css](../../src/index.css)

### 코드 변경

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/App.jsx b/src/App.jsx
index 5ac0d71..da358e1 100644
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -1,14 +1,21 @@
+import { BrowserRouter, Route, Routes } from 'react-router-dom'
 import Footer from './components/Footer'
 import Header from './components/Header'
+import AboutPage from './pages/AboutPage'
 import HomePage from './pages/HomePage'
+import PostsPage from './pages/PostsPage'
 
 function App() {
   return (
-    <>
+    <BrowserRouter>
       <Header />
-      <HomePage />
+      <Routes>
+        <Route path="/" element={<HomePage />} />
+        <Route path="/about" element={<AboutPage />} />
+        <Route path="/posts" element={<PostsPage />} />
+      </Routes>
       <Footer />
-    </>
+    </BrowserRouter>
   )
 }
 
diff --git a/src/components/Header.jsx b/src/components/Header.jsx
index 93c04b5..9da27a5 100644
--- a/src/components/Header.jsx
+++ b/src/components/Header.jsx
@@ -1,7 +1,14 @@
+import { Link } from 'react-router-dom'
+
 function Header() {
   return (
     <header>
       <strong>React Mini Blog</strong>
+      <nav>
+        <Link to="/">Home</Link>
+        <Link to="/about">About</Link>
+        <Link to="/posts">Posts</Link>
+      </nav>
     </header>
   )
 }
diff --git a/src/index.css b/src/index.css
index e0156c2..40af685 100644
--- a/src/index.css
+++ b/src/index.css
@@ -27,6 +27,10 @@ footer {
 }
 
 header {
+  display: flex;
+  flex-wrap: wrap;
+  gap: 12px;
+  justify-content: space-between;
   border-bottom: 1px solid #ddd;
 }
 
@@ -34,3 +38,8 @@ footer {
   border-top: 1px solid #ddd;
   color: #666;
 }
+
+nav {
+  display: flex;
+  gap: 12px;
+}
diff --git a/src/pages/AboutPage.jsx b/src/pages/AboutPage.jsx
new file mode 100644
index 0000000..cf9b01a
--- /dev/null
+++ b/src/pages/AboutPage.jsx
@@ -0,0 +1,13 @@
+function AboutPage() {
+  return (
+    <main>
+      <h1>About</h1>
+      <p>
+        This mini blog is a small React practice project before learning the
+        Next.js blog project.
+      </p>
+    </main>
+  )
+}
+
+export default AboutPage
diff --git a/src/pages/PostsPage.jsx b/src/pages/PostsPage.jsx
new file mode 100644
index 0000000..851d6b5
--- /dev/null
+++ b/src/pages/PostsPage.jsx
@@ -0,0 +1,10 @@
+function PostsPage() {
+  return (
+    <main>
+      <h1>Posts</h1>
+      <p>Posts will be displayed here in the next steps.</p>
+    </main>
+  )
+}
+
+export default PostsPage
~~~

### 설명과 확인

- `path="/about"`은 `/about` 주소에서 보여줄 화면을 뜻합니다.
- `Link to="/posts"`는 Posts 화면으로 이동하는 링크입니다.
- Next.js와 달리 React Router는 파일 위치가 아니라 코드로 라우트를 등록합니다.

## 실행 확인

~~~bash
npm run dev
~~~

브라우저에서 이번 단계의 화면을 직접 눌러 확인합니다. 문제가 없으면 다음 step으로 넘어갑니다.

## 독립 확인

임시 `/help` route를 추가해 주소와 component 연결을 확인한 뒤 복구합니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험을 위해 바꾼 값은 다음 단계 전에 복구합니다.
