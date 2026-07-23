# Step 8. Controlled Input

## 변경 내용

- 새 글 작성 화면을 추가합니다.
- 제목과 내용을 controlled input으로 관리합니다.
- 입력 중인 값을 preview로 바로 확인합니다.

## 시작 전 확인

개인 저장소의 `main`에 Step 7 결과를 commit하고 GitHub에 push한 상태로 시작합니다.

Windows Terminal의 PowerShell에서 개인 프로젝트 폴더로 이동하고 현재 상태를 확인합니다.

~~~powershell
Set-Location "$HOME\dongbu\react-mini-blog"
git status
~~~

`main`에 있고 아직 저장하지 않은 변경 파일이 없어야 합니다. 각 코드 블록 위의 파일 경로를 확인한 뒤 해당 파일의 전체 내용을 직접 입력합니다.

## 작업 1. 새 글 작성 주소와 메뉴 추가하기

새 글 작성 화면으로 이동할 수 있도록 `/posts/new` 라우트와 Header 메뉴를 추가합니다.

### 수정할 파일

- 수정: `src/App.jsx`
- 수정: `src/components/Header.jsx`

### 입력할 코드

#### `src/App.jsx`

`src/App.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import NewPostPage from './pages/NewPostPage'
import PostDetailPage from './pages/PostDetailPage'
import PostsPage from './pages/PostsPage'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/new" element={<NewPostPage />} />
        <Route path="/posts/:postId" element={<PostDetailPage />} />
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
        <Link to="/posts/new">New Post</Link>
      </nav>
    </header>
  )
}

export default Header
~~~

### 설명과 확인

- `/posts/new`의 `new`는 고정 segment이고 `/posts/:postId`의 `:postId`는 동적 segment입니다.
- React Router는 더 구체적인 고정 주소를 우선 선택하므로 `new`를 게시글 id로 처리하지 않습니다.
- Header의 New Post 링크는 `/posts/new` form으로 이동합니다.

## 작업 2. controlled input form 만들기

제목과 내용 입력값을 React state로 관리합니다. 아직 저장은 하지 않고, 입력 중인 값을 preview에 바로 보여줍니다.

### 수정할 파일

- 새 파일: `src/pages/NewPostPage.jsx`
- 수정: `src/index.css`

### 입력할 코드

#### `src/index.css`

`src/index.css`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~css
textarea {
  height: 140px;
}
~~~

#### `src/pages/NewPostPage.jsx`

`src/pages/NewPostPage.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
import { useState } from 'react'

function NewPostPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  return (
    <main>
      <h1>New Post</h1>
      <form>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </form>

      <section>
        <h2>Preview</h2>
        <h3>{title || 'Untitled post'}</h3>
        <p>{content || 'Write something to preview the post content.'}</p>
      </section>
    </main>
  )
}

export default NewPostPage
~~~

### 설명과 확인

- controlled input은 `value`와 `onChange`가 state와 연결된 입력창입니다.
- 입력값이 바뀔 때마다 state가 바뀌고 preview도 함께 바뀝니다.

## 완료 결과 및 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: React · 장 「Windows 11 x64 개발 환경 준비」 · 절 「1. Windows Terminal 설치」)</span>를 먼저 확인합니다.

~~~powershell
npm run lint
npm run build
~~~

New Post 화면에서 제목과 내용을 입력할 때 Preview가 바로 바뀌는지 확인합니다.

## 독립 확인

각 input을 입력했을 때 state와 화면 값이 같은지 React DevTools 또는 화면으로 확인합니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험값은 검사를 마치면 원래대로 복구합니다.

## GitHub에 저장하기

독립 확인에서 잠시 바꾼 코드를 원래대로 돌린 뒤 현재 파일 상태를 확인합니다. 검사와 화면 확인이 끝나면 현재 변경을 하나의 commit으로 저장합니다.

```powershell
git status
git add .
git commit -m "Step 8: Build the new post form"
git push
git status
```

마지막 `git status`에서 저장하지 않은 변경 파일이 없어야 합니다. GitHub의 개인 저장소를 열어 `main`에 이번 Step의 commit이 보이는지도 확인합니다.
