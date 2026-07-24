# Step 15. mock fetch와 Next.js 연결

## 변경 내용

- 정적 JSON 파일에서 초기 게시글을 가져옵니다.
- 저장된 localStorage 데이터가 없을 때만 mock 데이터를 불러옵니다.
- 이 흐름이 Next.js API와 DB로 어떻게 이어지는지 확인합니다.

## 시작 전 확인

개인 저장소의 `main`에 Step 14 결과를 commit하고 GitHub에 push한 상태로 시작합니다.

Windows Terminal의 PowerShell에서 개인 프로젝트 폴더로 이동하고 현재 상태를 확인합니다.

~~~powershell
Set-Location "$HOME\dongbu\react-mini-blog"
git status
~~~

`main`에 있고 아직 저장하지 않은 변경 파일이 없어야 합니다. 각 코드 블록 위의 파일 경로를 확인한 뒤 해당 파일의 전체 내용을 직접 입력합니다.

## 작업 1. mock 게시글 JSON 추가하기

서버 없이도 외부 데이터처럼 불러오는 연습을 하기 위해 `public/posts.json` 파일을 만듭니다. 이 파일은 브라우저에서 `/posts.json` 주소로 요청할 수 있습니다.

### 수정할 파일

- 새 파일: `public/posts.json`

### 입력할 코드

#### `public/posts.json`

`public/posts.json`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~json
[
  {
    "id": "1",
    "title": "Getting Started with React",
    "excerpt": "React lets us build a screen by combining small components.",
    "content": "React components are JavaScript functions that return JSX. A page can be built by combining small components together.",
    "author": "Mini Blog Team"
  },
  {
    "id": "2",
    "title": "Why Props Matter",
    "excerpt": "Props let a parent component pass data to a child component.",
    "content": "Props are useful because the same component can show different data. This keeps our UI reusable and easier to read.",
    "author": "Mini Blog Team"
  },
  {
    "id": "3",
    "title": "Rendering Lists",
    "excerpt": "The map method turns an array of data into an array of elements.",
    "content": "Most apps show lists: posts, products, messages, or comments. React uses arrays and map to render those lists.",
    "author": "Mini Blog Team"
  }
]
~~~

### 설명과 확인

- JSON은 JavaScript 객체와 비슷하지만 문자열 key에 큰따옴표를 사용합니다.
- 정적 JSON 파일은 실제 서버 API로 넘어가기 전 연습용 데이터로 사용합니다.

## 작업 2. 저장된 데이터가 없을 때 mock 데이터 불러오기

이미 localStorage에 글이 있으면 그 데이터를 사용하고, 저장된 데이터가 없을 때만 `/posts.json`을 fetch합니다. 로딩 중에는 간단한 안내 화면을 보여줍니다.

### 수정할 파일

- 수정: `src/App.jsx`

### 입력할 코드

#### `src/App.jsx`

`src/App.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import { initialPosts } from './data/posts'
import AboutPage from './pages/AboutPage'
import EditPostPage from './pages/EditPostPage'
import HomePage from './pages/HomePage'
import NewPostPage from './pages/NewPostPage'
import PostDetailPage from './pages/PostDetailPage'
import PostsPage from './pages/PostsPage'

const STORAGE_KEY = 'react-mini-blog-posts'

function isPostArray(value) {
  return (
    Array.isArray(value) &&
    value.every(
      (post) =>
        post !== null &&
        typeof post === 'object' &&
        typeof post.id === 'string' &&
        typeof post.title === 'string' &&
        typeof post.excerpt === 'string' &&
        typeof post.content === 'string' &&
        typeof post.author === 'string',
    )
  )
}

function loadSavedPosts() {
  const savedPosts = localStorage.getItem(STORAGE_KEY)

  if (!savedPosts) {
    return null
  }

  try {
    const parsedPosts = JSON.parse(savedPosts)
    return isPostArray(parsedPosts) ? parsedPosts : null
  } catch {
    return null
  }
}

function App() {
  const [savedPosts] = useState(loadSavedPosts)
  const [posts, setPosts] = useState(savedPosts ?? [])
  const [isLoading, setIsLoading] = useState(savedPosts === null)

  useEffect(() => {
    if (savedPosts !== null) {
      return
    }

    let ignore = false

    async function loadStarterPosts() {
      try {
        const response = await fetch('/posts.json')

        if (!response.ok) {
          throw new Error('Failed to load starter posts.')
        }

        const starterPosts = await response.json()

        if (!isPostArray(starterPosts)) {
          throw new Error('Starter posts must contain valid posts.')
        }

        if (!ignore) {
          setPosts(starterPosts)
          setIsLoading(false)
        }
      } catch {
        if (!ignore) {
          setPosts(initialPosts)
          setIsLoading(false)
        }
      }
    }

    loadStarterPosts()

    return () => {
      ignore = true
    }
  }, [savedPosts])

  useEffect(() => {
    if (isLoading) {
      return
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  }, [isLoading, posts])

  function createPost(postInput) {
    const newPost = {
      id: String(Date.now()),
      title: postInput.title,
      excerpt: postInput.content.slice(0, 80),
      content: postInput.content,
      author: 'Student',
    }

    setPosts((currentPosts) => [newPost, ...currentPosts])
    return newPost
  }

  function deletePost(id) {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== id),
    )
  }

  function updatePost(id, postInput) {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              title: postInput.title,
              excerpt: postInput.content.slice(0, 80),
              content: postInput.content,
            }
          : post,
      ),
    )
  }

  return (
    <BrowserRouter>
      <Header />
      {isLoading ? (
        <main>
          <h1>Loading posts...</h1>
          <p>Loading starter data from public/posts.json.</p>
        </main>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/posts" element={<PostsPage posts={posts} />} />
          <Route
            path="/posts/new"
            element={<NewPostPage onCreate={createPost} />}
          />
          <Route
            path="/posts/:postId"
            element={<PostDetailPage posts={posts} onDelete={deletePost} />}
          />
          <Route
            path="/posts/:postId/edit"
            element={<EditPostPage posts={posts} onUpdate={updatePost} />}
          />
        </Routes>
      )}
      <Footer />
    </BrowserRouter>
  )
}

export default App
~~~

### 설명과 확인

- `fetch`는 주소로 데이터를 요청할 때 사용하는 기본 함수입니다.
- 저장 데이터와 fetch 응답은 `isPostArray`로 배열과 각 게시글 필드 형식을 함께 확인합니다.
- 이 프로젝트에서는 정적 JSON을 가져오지만, Next.js에서는 API Route와 DB 요청으로 확장됩니다.
- 로딩 중에는 목록 라우트 대신 로딩 화면을 보여줍니다.

## 완료 결과 및 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md) <span class="print-reference" data-print-reference="true">(React · Windows 11 x64 개발 환경 준비 · 1. Windows Terminal 설치)</span>를 먼저 확인합니다.

~~~powershell
npm run lint
npm run build
~~~

localStorage를 비운 뒤 새로고침하면 Loading 화면을 거쳐 mock 게시글 세 개가 보이는지 확인합니다.

## 독립 확인

localStorage를 비운 뒤 mock fetch 성공을 확인합니다. `posts.json`을 잠시 `{}`와 `[{"id":"1"}]`로 각각 바꿔 두 응답 모두 fallback 목록으로 복구되는지 확인합니다. 결과를 기록한 뒤 파일을 원래 JSON 배열로 복구합니다.

## GitHub에 저장하기

독립 확인에서 잠시 바꾼 코드를 원래대로 돌린 뒤 현재 파일 상태를 확인합니다. 검사와 화면 확인이 끝나면 현재 변경을 하나의 commit으로 저장합니다.

```powershell
git status
git add .
git commit -m "Step 15: Load starter posts"
git push
git status
```

마지막 `git status`에서 저장하지 않은 변경 파일이 없어야 합니다. GitHub의 개인 저장소를 열어 `main`에 이번 Step의 commit이 보이는지도 확인합니다.
