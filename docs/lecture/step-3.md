# Step 3. React Router 기초

## 변경 내용

- React Router를 설치하고 URL과 화면을 연결합니다.
- `/`, `/about`, `/posts` 주소를 만듭니다.
- Link를 사용해 페이지 사이를 이동합니다.

## 시작 전 확인

개인 저장소의 `main`에 Step 2 결과를 commit하고 GitHub에 push한 상태로 시작합니다.

Windows Terminal의 PowerShell에서 개인 프로젝트 폴더로 이동하고 현재 상태를 확인합니다.

~~~powershell
Set-Location "$HOME\dongbu\react-mini-blog"
git status
~~~

`main`에 있고 아직 저장하지 않은 변경 파일이 없어야 합니다. 각 코드 블록 위의 파일 경로를 확인한 뒤 해당 파일의 전체 내용을 직접 입력합니다.

## 작업 1. React Router 설치

Vite는 React 앱을 실행해주는 도구이고, 라우팅은 직접 추가해야 합니다. React Router를 설치해 URL과 화면을 연결할 준비를 합니다.

### 수정할 파일

- 명령으로 처리: `react-router-dom 설치`

### 먼저 실행

> Windows 11에서는 [환경 준비](../windows-11.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: React · 장 「Windows 11 x64 개발 환경 준비」 · 절 「1. Windows Terminal 설치」)</span>를 먼저 확인합니다. npm 명령은 `npm.cmd`로 실행합니다.

~~~powershell
npm.cmd install 'react-router-dom@^7.18.1'
~~~

### 설명과 확인

- 설치 명령은 필요한 의존성을 자동으로 반영합니다.
- 수동으로 자동 생성 파일을 타이핑하지 않습니다.

## 작업 2. 주소와 페이지 연결하기

`BrowserRouter`로 앱을 감싸고, `Routes` 안에 주소별 화면을 등록합니다. Header의 메뉴는 일반 `a` 태그 대신 React Router의 `Link`를 사용합니다.

### 수정할 파일

- 수정: `src/App.jsx`
- 수정: `src/components/Header.jsx`
- 새 파일: `src/pages/AboutPage.jsx`
- 새 파일: `src/pages/PostsPage.jsx`

### 입력할 코드

#### `src/App.jsx`

`src/App.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import PostsPage from './pages/PostsPage'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/posts" element={<PostsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
~~~

#### `src/components/Header.jsx`

`src/components/Header.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <strong>React Mini Blog</strong>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/posts">Posts</Link>
      </nav>
    </header>
  )
}

export default Header
~~~

#### `src/pages/AboutPage.jsx`

`src/pages/AboutPage.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
function AboutPage() {
  return (
    <main>
      <h1>About</h1>
      <p>
        This mini blog is a small React practice project before learning the
        Next.js blog project.
      </p>
    </main>
  )
}

export default AboutPage
~~~

#### `src/pages/PostsPage.jsx`

`src/pages/PostsPage.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
function PostsPage() {
  return (
    <main>
      <h1>Posts</h1>
      <p>Posts will be displayed here in the next steps.</p>
    </main>
  )
}

export default PostsPage
~~~

### 설명과 확인

- `path="/about"`은 `/about` 주소에서 보여줄 화면을 뜻합니다.
- `Link to="/posts"`는 Posts 화면으로 이동하는 링크입니다.
- Next.js와 달리 React Router는 파일 위치가 아니라 코드로 라우트를 등록합니다.

## 완료 결과 및 실행 확인

~~~powershell
npm.cmd run lint
npm.cmd run build
~~~

Header의 Home, About, Posts 링크를 차례로 눌러 주소와 화면이 함께 바뀌는지 확인합니다.

## 독립 확인

임시 `/help` route를 추가해 주소와 component 연결을 확인한 뒤 복구합니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험값은 검사를 마치면 원래대로 복구합니다.

## GitHub에 저장하기

독립 확인에서 잠시 바꾼 코드를 원래대로 돌린 뒤 현재 파일 상태를 확인합니다. 검사와 화면 확인이 끝나면 현재 변경을 하나의 commit으로 저장합니다.

```powershell
git status
git add .
git commit -m "Step 3: Add React Router"
git push
git status
```

마지막 `git status`에서 저장하지 않은 변경 파일이 없어야 합니다. GitHub의 개인 저장소를 열어 `main`에 이번 Step의 commit이 보이는지도 확인합니다.
