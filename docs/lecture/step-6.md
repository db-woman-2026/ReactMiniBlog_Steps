# Step 6. 동적 라우트와 상세 페이지

## 이번 단계에서 할 일

- 게시글 목록에서 상세 페이지로 이동합니다.
- `/posts/:postId` 동적 라우트를 추가합니다.
- URL의 id로 게시글 하나를 찾아 보여줍니다.

## 시작 전 확인

권장 시간은 60분입니다. 개인 저장소의 `main`에 Step 5 결과를 commit하고 GitHub에 push한 상태로 시작합니다.

Windows Terminal의 PowerShell에서 개인 프로젝트 폴더로 이동하고 현재 상태를 확인합니다.

~~~powershell
Set-Location "$HOME\dongbu\react-mini-blog"
git status
~~~

`main`에 있고 아직 저장하지 않은 변경 파일이 없어야 합니다. 각 코드 블록 위의 파일 경로를 확인한 뒤 해당 파일의 전체 내용을 직접 입력합니다.

## 작업 1. 상세 페이지 라우트 추가하기

게시글마다 다른 상세 화면을 보여주기 위해 `/posts/:postId` 라우트를 추가합니다. `:postId`는 주소에서 바뀌는 값을 뜻합니다.

### 수정할 파일

- 수정: `src/App.jsx`
- 새 파일: `src/pages/PostDetailPage.jsx`

### 입력할 코드

#### `src/App.jsx`

`src/App.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
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
        <Route path="/posts/:postId" element={<PostDetailPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
~~~

#### `src/pages/PostDetailPage.jsx`

`src/pages/PostDetailPage.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
import { Link, useParams } from 'react-router-dom'
import { posts } from '../data/posts'

function PostDetailPage() {
  const { postId } = useParams()
  const post = posts.find((item) => item.id === postId)

  if (!post) {
    return (
      <main>
        <h1>Post not found</h1>
        <p>No post matches this address.</p>
        <Link to="/posts">Back to posts</Link>
      </main>
    )
  }

  return (
    <main>
      <h1>{post.title}</h1>
      <p>Written by {post.author}</p>
      <p>{post.content}</p>
      <Link to="/posts">Back to posts</Link>
    </main>
  )
}

export default PostDetailPage
~~~

### 설명과 확인

- `useParams`는 현재 주소에 들어 있는 동적 값을 읽습니다.
- `posts.find(...)`는 배열에서 조건에 맞는 게시글 하나를 찾습니다.
- 없는 id로 접근하면 간단한 안내 화면을 보여줍니다.

## 작업 2. 목록 카드에서 상세 페이지로 이동하기

게시글 제목을 클릭하면 해당 게시글 상세 주소로 이동하도록 `PostCard`에 링크를 추가합니다.

### 수정할 파일

- 수정: `src/components/PostCard.jsx`
- 수정: `src/pages/PostsPage.jsx`

### 입력할 코드

#### `src/components/PostCard.jsx`

`src/components/PostCard.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
import { Link } from 'react-router-dom'

function PostCard({ id, title, excerpt, author }) {
  return (
    <article className="post-card">
      <h2>
        <Link to={`/posts/${id}`}>{title}</Link>
      </h2>
      <p>{excerpt}</p>
      <p>Written by {author}</p>
    </article>
  )
}

export default PostCard
~~~

#### `src/pages/PostsPage.jsx`

`src/pages/PostsPage.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
import PostCard from '../components/PostCard'
import { posts } from '../data/posts'

function PostsPage() {
  return (
    <main>
      <h1>Posts</h1>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          excerpt={post.excerpt}
          author={post.author}
        />
      ))}
    </main>
  )
}

export default PostsPage
~~~

### 설명과 확인

- 카드는 `id` props를 받아 `/posts/게시글id` 주소를 만듭니다.
- 목록 화면은 각 게시글의 `id`도 `PostCard`에 넘겨야 합니다.

## 완료 결과 및 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. npm 명령은 `npm.cmd`로 실행합니다.

~~~powershell
npm.cmd run lint
npm.cmd run build
~~~

첫 카드 제목을 누르면 `/posts/1` 상세 화면이 열리는지 확인합니다. `/posts/999`에는 Post not found 안내가 보여야 합니다.

## 독립 확인

존재하지 않는 `postId` 주소에서 not-found 안내를 확인합니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험을 위해 바꾼 값은 다음 단계 전에 복구합니다.

## GitHub에 저장하기

독립 확인에서 잠시 바꾼 코드를 원래대로 돌린 뒤 현재 파일 상태를 확인합니다. 검사와 화면 확인이 끝났다면 이번 단계의 결과를 하나의 commit으로 저장합니다.

```powershell
git status
git add .
git commit -m "Step 6: Add post detail routes"
git push
git status
```

마지막 `git status`에서 저장하지 않은 변경 파일이 없어야 합니다. GitHub의 개인 저장소를 열어 `main`에 이번 Step의 commit이 보이는지도 확인합니다.
