# Step 1. 파일 구조와 첫 JSX 화면

## 이번 단계에서 할 일

- 기본 Vite 예제 화면을 미니 블로그 첫 화면으로 바꿉니다.
- 복잡한 기본 스타일과 예제 자산을 제거합니다.
- JSX가 화면에 어떻게 보이는지 확인합니다.

## 시작 전 확인

권장 시간은 60분입니다. 개인 실습 저장소의 `main`에서 직전 단계까지 마친 상태로 시작합니다. 코드 블록은 복사해 붙이지 않고 직접 입력합니다.

Windows Terminal의 PowerShell에서 프로젝트 폴더로 이동한 뒤 시작 branch와 변경 상태를 확인합니다.

~~~powershell
Set-Location "$HOME\dongbu\ReactMiniBlog_Steps"
git switch main
git status --short
~~~

`git branch --show-current`에는 `main`이 표시되고 `git status --short`의 출력은 없어야 합니다.

처음 프로젝트를 받은 뒤에는 의존성을 설치합니다. 이 명령이 끝나야 개발 서버와 빌드 명령을 실행할 수 있습니다.

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. npm 명령은 PowerShell 실행 정책과 관계없이 동작하는 `npm.cmd`로 실행합니다.

~~~powershell
npm.cmd ci
~~~

## 작업 1. 기본 예제 화면 정리

Vite가 만든 예제 화면은 로고, 버튼, 외부 링크가 많습니다. 첫 실습에서는 화면을 읽기 쉬운 미니 블로그 소개 화면으로 단순화합니다.

### 수정할 파일

- 수정: `src/App.jsx`
- 수정: `src/index.css`
- 삭제: `src/App.css`
- 삭제: `src/assets/`
- 삭제: `public/icons.svg`

### 먼저 실행

~~~powershell
Remove-Item src/App.css -Force
Remove-Item src/assets -Recurse -Force
Remove-Item public/icons.svg -Force
~~~

### 코드 변경

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/App.jsx b/src/App.jsx
index 4f03aa1..b0cfd96 100644
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -1,121 +1,16 @@
-import { useState } from 'react'
-import reactLogo from './assets/react.svg'
-import viteLogo from './assets/vite.svg'
-import heroImg from './assets/hero.png'
-import './App.css'
-
 function App() {
-  const [count, setCount] = useState(0)
-
   return (
-    <>
-      <section id="center">
-        <div className="hero">
-          <img src={heroImg} className="base" width="170" height="179" alt="" />
-          <img src={reactLogo} className="framework" alt="React logo" />
-          <img src={viteLogo} className="vite" alt="Vite logo" />
-        </div>
-        <div>
-          <h1>Get started</h1>
-          <p>
-            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
-          </p>
-        </div>
-        <button
-          type="button"
-          className="counter"
-          onClick={() => setCount((count) => count + 1)}
-        >
-          Count is {count}
-        </button>
-      </section>
-
-      <div className="ticks"></div>
-
-      <section id="next-steps">
-        <div id="docs">
-          <svg className="icon" role="presentation" aria-hidden="true">
-            <use href="/icons.svg#documentation-icon"></use>
-          </svg>
-          <h2>Documentation</h2>
-          <p>Your questions, answered</p>
-          <ul>
-            <li>
-              <a href="https://vite.dev/" target="_blank">
-                <img className="logo" src={viteLogo} alt="" />
-                Explore Vite
-              </a>
-            </li>
-            <li>
-              <a href="https://react.dev/" target="_blank">
-                <img className="button-icon" src={reactLogo} alt="" />
-                Learn more
-              </a>
-            </li>
-          </ul>
-        </div>
-        <div id="social">
-          <svg className="icon" role="presentation" aria-hidden="true">
-            <use href="/icons.svg#social-icon"></use>
-          </svg>
-          <h2>Connect with us</h2>
-          <p>Join the Vite community</p>
-          <ul>
-            <li>
-              <a href="https://github.com/vitejs/vite" target="_blank">
-                <svg
-                  className="button-icon"
-                  role="presentation"
-                  aria-hidden="true"
-                >
-                  <use href="/icons.svg#github-icon"></use>
-                </svg>
-                GitHub
-              </a>
-            </li>
-            <li>
-              <a href="https://chat.vite.dev/" target="_blank">
-                <svg
-                  className="button-icon"
-                  role="presentation"
-                  aria-hidden="true"
-                >
-                  <use href="/icons.svg#discord-icon"></use>
-                </svg>
-                Discord
-              </a>
-            </li>
-            <li>
-              <a href="https://x.com/vite_js" target="_blank">
-                <svg
-                  className="button-icon"
-                  role="presentation"
-                  aria-hidden="true"
-                >
-                  <use href="/icons.svg#x-icon"></use>
-                </svg>
-                X.com
-              </a>
-            </li>
-            <li>
-              <a href="https://bsky.app/profile/vite.dev" target="_blank">
-                <svg
-                  className="button-icon"
-                  role="presentation"
-                  aria-hidden="true"
-                >
-                  <use href="/icons.svg#bluesky-icon"></use>
-                </svg>
-                Bluesky
-              </a>
-            </li>
-          </ul>
-        </div>
-      </section>
-
-      <div className="ticks"></div>
-      <section id="spacer"></section>
-    </>
+    <main>
+      <h1>React Mini Blog</h1>
+      <p>
+        This project practices React fundamentals before moving to the Next.js
+        blog project.
+      </p>
+      <p>
+        In the first step, focus on reading JSX and changing text on the
+        screen.
+      </p>
+    </main>
   )
 }
 
diff --git a/src/index.css b/src/index.css
index 2c84af0..0d5d564 100644
--- a/src/index.css
+++ b/src/index.css
@@ -1,111 +1,22 @@
-:root {
-  --text: #6b6375;
-  --text-h: #08060d;
-  --bg: #fff;
-  --border: #e5e4e7;
-  --code-bg: #f4f3ec;
-  --accent: #aa3bff;
-  --accent-bg: rgba(170, 59, 255, 0.1);
-  --accent-border: rgba(170, 59, 255, 0.5);
-  --social-bg: rgba(244, 243, 236, 0.5);
-  --shadow:
-    rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;
-
-  --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
-  --heading: system-ui, 'Segoe UI', Roboto, sans-serif;
-  --mono: ui-monospace, Consolas, monospace;
-
-  font: 18px/145% var(--sans);
-  letter-spacing: 0.18px;
-  color-scheme: light dark;
-  color: var(--text);
-  background: var(--bg);
-  font-synthesis: none;
-  text-rendering: optimizeLegibility;
-  -webkit-font-smoothing: antialiased;
-  -moz-osx-font-smoothing: grayscale;
-
-  @media (max-width: 1024px) {
-    font-size: 16px;
-  }
-}
-
-@media (prefers-color-scheme: dark) {
-  :root {
-    --text: #9ca3af;
-    --text-h: #f3f4f6;
-    --bg: #16171d;
-    --border: #2e303a;
-    --code-bg: #1f2028;
-    --accent: #c084fc;
-    --accent-bg: rgba(192, 132, 252, 0.15);
-    --accent-border: rgba(192, 132, 252, 0.5);
-    --social-bg: rgba(47, 48, 58, 0.5);
-    --shadow:
-      rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px;
-  }
-
-  #social .button-icon {
-    filter: invert(1) brightness(2);
-  }
-}
-
 body {
-  margin: 0;
-}
-
-#root {
-  width: 1126px;
-  max-width: 100%;
+  max-width: 720px;
   margin: 0 auto;
-  text-align: center;
-  border-inline: 1px solid var(--border);
-  min-height: 100svh;
-  display: flex;
-  flex-direction: column;
-  box-sizing: border-box;
+  padding: 24px;
+  color: #222;
+  font-family: Arial, sans-serif;
+  line-height: 1.6;
 }
 
-h1,
-h2 {
-  font-family: var(--heading);
-  font-weight: 500;
-  color: var(--text-h);
-}
-
-h1 {
-  font-size: 56px;
-  letter-spacing: -1.68px;
-  margin: 32px 0;
-  @media (max-width: 1024px) {
-    font-size: 36px;
-    margin: 20px 0;
-  }
-}
-h2 {
-  font-size: 24px;
-  line-height: 118%;
-  letter-spacing: -0.24px;
-  margin: 0 0 8px;
-  @media (max-width: 1024px) {
-    font-size: 20px;
-  }
-}
-p {
-  margin: 0;
+a {
+  color: #1f5fbf;
 }
 
-code,
-.counter {
-  font-family: var(--mono);
-  display: inline-flex;
-  border-radius: 4px;
-  color: var(--text-h);
+button,
+input,
+textarea {
+  font: inherit;
 }
 
-code {
-  font-size: 15px;
-  line-height: 135%;
-  padding: 4px 8px;
-  background: var(--code-bg);
+button {
+  cursor: pointer;
 }
~~~

### 설명과 확인

- `App.jsx`는 화면에 보일 JSX를 반환합니다.
- `index.css`는 전체 화면에 적용되는 최소 스타일만 남깁니다.
- 삭제하는 파일과 폴더는 기본 예제 화면에서만 쓰던 자산입니다.

## 완료 결과 및 실행 확인

~~~powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
~~~

lint와 build가 통과해야 합니다. 브라우저에는 `React Mini Blog` 제목과 두 설명 문단이 보여야 하며, Vite 로고와 counter는 더 이상 보이지 않아야 합니다. Vite가 5173이 아닌 다른 포트를 표시하면 터미널의 실제 `Local` 주소를 엽니다.

## 독립 확인

홈 설명 문장 하나를 본인 학습 목표로 바꾸고 복구합니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험을 위해 바꾼 값은 다음 단계 전에 복구합니다.

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
git commit -m "Complete React step 1"
git push origin main
git status --short --branch
```

현재 브랜치는 `main`이어야 합니다. 마지막 상태에서 `main...origin/main` 뒤에 `ahead`가 없고 작업 파일 목록도 비어 있어야 합니다.
