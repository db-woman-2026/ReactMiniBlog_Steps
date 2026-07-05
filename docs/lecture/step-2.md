# Step 2. 컴포넌트 분리

## 이번 스텝 주요 기능 Overview

- 화면을 Header, Footer, HomePage 컴포넌트로 나눕니다.
- 파일을 나누고 import/export로 연결합니다.
- App 컴포넌트는 전체 조립 역할만 맡게 합니다.

## 작업 1. 화면을 작은 컴포넌트로 나누기

`App.jsx` 안에 있던 내용을 Header, HomePage, Footer로 나눕니다. 이 단계의 목표는 기능을 늘리는 것이 아니라 파일을 나누고 다시 연결하는 흐름을 익히는 것입니다.

### 직접 수정할 파일

- 수정: [src/App.jsx](../../src/App.jsx)
- 새 파일: [src/components/Header.jsx](../../src/components/Header.jsx)
- 새 파일: [src/components/Footer.jsx](../../src/components/Footer.jsx)
- 새 파일: [src/pages/HomePage.jsx](../../src/pages/HomePage.jsx)
- 수정: [src/index.css](../../src/index.css)

### 이전 단계와 달라지는 코드

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/App.jsx b/src/App.jsx
index b0cfd96..5ac0d71 100644
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -1,16 +1,14 @@
+import Footer from './components/Footer'
+import Header from './components/Header'
+import HomePage from './pages/HomePage'
+
 function App() {
   return (
-    <main>
-      <h1>React Mini Blog</h1>
-      <p>
-        This project practices React fundamentals before moving to the Next.js
-        blog project.
-      </p>
-      <p>
-        In the first step, focus on reading JSX and changing text on the
-        screen.
-      </p>
-    </main>
+    <>
+      <Header />
+      <HomePage />
+      <Footer />
+    </>
   )
 }
 
diff --git a/src/components/Footer.jsx b/src/components/Footer.jsx
new file mode 100644
index 0000000..3a1c86d
--- /dev/null
+++ b/src/components/Footer.jsx
@@ -0,0 +1,5 @@
+function Footer() {
+  return <footer>React fundamentals before Next.js</footer>
+}
+
+export default Footer
diff --git a/src/components/Header.jsx b/src/components/Header.jsx
new file mode 100644
index 0000000..93c04b5
--- /dev/null
+++ b/src/components/Header.jsx
@@ -0,0 +1,9 @@
+function Header() {
+  return (
+    <header>
+      <strong>React Mini Blog</strong>
+    </header>
+  )
+}
+
+export default Header
diff --git a/src/index.css b/src/index.css
index 0d5d564..e0156c2 100644
--- a/src/index.css
+++ b/src/index.css
@@ -20,3 +20,17 @@ textarea {
 button {
   cursor: pointer;
 }
+
+header,
+footer {
+  padding: 16px 0;
+}
+
+header {
+  border-bottom: 1px solid #ddd;
+}
+
+footer {
+  border-top: 1px solid #ddd;
+  color: #666;
+}
diff --git a/src/pages/HomePage.jsx b/src/pages/HomePage.jsx
new file mode 100644
index 0000000..5f3251c
--- /dev/null
+++ b/src/pages/HomePage.jsx
@@ -0,0 +1,16 @@
+function HomePage() {
+  return (
+    <main>
+      <h1>React Mini Blog</h1>
+      <p>
+        This project practices React fundamentals before moving to the Next.js
+        blog project.
+      </p>
+      <p>
+        In this step, focus on splitting one screen into smaller components.
+      </p>
+    </main>
+  )
+}
+
+export default HomePage
~~~

### 설명/확인 포인트

- `App.jsx`는 전체 배치를 조립합니다.
- `Header`, `Footer`, `HomePage`는 각각 독립된 화면 조각입니다.
- 다른 파일의 컴포넌트는 `import`로 가져옵니다.

## 실행 확인

~~~bash
npm run dev
~~~

브라우저에서 이번 단계의 화면을 직접 눌러 확인합니다. 문제가 없으면 다음 step으로 넘어갑니다.
