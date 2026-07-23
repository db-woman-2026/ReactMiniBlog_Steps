# Step 14. localStorage 저장

## 이번 단계에서 할 일

- 작성, 수정, 삭제 결과를 localStorage에 저장합니다.
- 새로고침 후에도 게시글 목록을 유지합니다.
- `useEffect`로 state 변경 이후 저장 작업을 실행합니다.

## 시작 전 확인

개인 저장소의 `main`에 Step 13 결과를 commit하고 GitHub에 push한 상태로 시작합니다.

Windows Terminal의 PowerShell에서 개인 프로젝트 폴더로 이동하고 현재 상태를 확인합니다.

~~~powershell
Set-Location "$HOME\dongbu\react-mini-blog"
git status
~~~

`main`에 있고 아직 저장하지 않은 변경 파일이 없어야 합니다. 각 코드 블록 위의 파일 경로를 확인한 뒤 해당 파일의 전체 내용을 직접 입력합니다.

## 작업 1. localStorage로 게시글 유지하기

state는 새로고침하면 사라집니다. 브라우저의 `localStorage`에 posts 배열을 문자열로 저장하고, 앱이 시작될 때 다시 읽습니다.

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

function loadInitialPosts() {
  const savedPosts = localStorage.getItem(STORAGE_KEY)

  if (!savedPosts) {
    return initialPosts
  }

  try {
    const parsedPosts = JSON.parse(savedPosts)
    return isPostArray(parsedPosts) ? parsedPosts : initialPosts
  } catch {
    return initialPosts
  }
}

function App() {
  const [posts, setPosts] = useState(loadInitialPosts)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  }, [posts])

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
      <Footer />
    </BrowserRouter>
  )
}

export default App
~~~

### 설명과 확인

- `localStorage.getItem`은 저장된 문자열을 읽습니다.
- `JSON.parse`와 `JSON.stringify`로 배열과 문자열을 변환합니다.
- `isPostArray`는 배열 여부와 각 게시글의 `id`, `title`, `excerpt`, `content`, `author` 형식을 함께 검사합니다.
- `every`는 모든 게시글이 검사 조건을 통과할 때만 `true`를 반환합니다.
- `useEffect`는 posts state가 바뀐 뒤 저장 작업을 실행합니다.

## 완료 결과 및 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. npm 명령은 `npm.cmd`로 실행합니다.

~~~powershell
npm.cmd run lint
npm.cmd run build
~~~

글을 작성하거나 수정한 뒤 새로고침해도 결과가 남는지 확인합니다. 삭제한 글도 새로고침 뒤 다시 생기지 않아야 합니다.

## 독립 확인

개발자 도구에서 localStorage 값을 `{"title":"not an array"}`와 `[{"id":"1"}]`로 각각 바꾸고 새로고침합니다. 두 경우 모두 초기 데이터로 회복되는지 확인하고 결과를 한 문장으로 기록합니다. 실험값은 다음 단계 전에 삭제합니다.

## GitHub에 저장하기

독립 확인에서 잠시 바꾼 코드를 원래대로 돌린 뒤 현재 파일 상태를 확인합니다. 검사와 화면 확인이 끝났다면 이번 단계의 결과를 하나의 commit으로 저장합니다.

```powershell
git status
git add .
git commit -m "Step 14: Save posts in localStorage"
git push
git status
```

마지막 `git status`에서 저장하지 않은 변경 파일이 없어야 합니다. GitHub의 개인 저장소를 열어 `main`에 이번 Step의 commit이 보이는지도 확인합니다.
