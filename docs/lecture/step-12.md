# Step 12. 게시글 수정

## 변경 내용

- 기존 게시글을 수정하는 edit 화면을 추가합니다.
- 기존 값을 form 초기값으로 넣습니다.
- `map`으로 해당 게시글만 새 값으로 교체합니다.

## 시작 전 확인

개인 저장소의 `main`에 Step 11 결과를 commit하고 GitHub에 push한 상태로 시작합니다.

Windows Terminal의 PowerShell에서 개인 프로젝트 폴더로 이동하고 현재 상태를 확인합니다.

~~~powershell
Set-Location "$HOME\dongbu\react-mini-blog"
git status
~~~

`main`에 있고 아직 저장하지 않은 변경 파일이 없어야 합니다. 각 코드 블록 위의 파일 경로를 확인한 뒤 해당 파일의 전체 내용을 직접 입력합니다.

## 작업 1. 수정 함수와 edit 라우트 추가하기

게시글 수정은 배열 안의 특정 게시글만 새 값으로 바꾸는 흐름입니다. App에 `updatePost` 함수를 만들고 edit 화면 라우트를 등록합니다.

### 수정할 파일

- 수정: `src/App.jsx`

### 입력할 코드

#### `src/App.jsx`

`src/App.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
import { useState } from 'react'
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

function App() {
  const [posts, setPosts] = useState(initialPosts)

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

- `map`은 모든 게시글을 돌면서 수정 대상만 새 객체로 바꿉니다.
- 함수형 updater의 `currentPosts`는 수정 시점의 최신 배열입니다.
- `...post`는 기존 게시글의 나머지 값을 유지할 때 사용합니다.

## 작업 2. EditPostPage 만들기

수정 화면은 기존 게시글의 제목과 내용을 form 초기값으로 사용합니다. 저장하면 부모의 `onUpdate` 함수를 호출하고 상세 화면으로 돌아갑니다.

### 수정할 파일

- 새 파일: `src/pages/EditPostPage.jsx`
- 수정: `src/pages/PostDetailPage.jsx`

### 입력할 코드

#### `src/pages/EditPostPage.jsx`

`src/pages/EditPostPage.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function EditPostPage({ posts, onUpdate }) {
  const { postId } = useParams()
  const navigate = useNavigate()
  const post = posts.find((item) => item.id === postId)
  const [title, setTitle] = useState(post?.title ?? '')
  const [content, setContent] = useState(post?.content ?? '')
  const [error, setError] = useState('')

  if (!post) {
    return (
      <main>
        <h1>Post not found</h1>
        <p>No post matches this address.</p>
        <Link to="/posts">Back to posts</Link>
      </main>
    )
  }

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()

    if (!trimmedTitle || !trimmedContent) {
      setError('Please enter both a title and content.')
      return
    }

    onUpdate(post.id, {
      title: trimmedTitle,
      content: trimmedContent,
    })

    navigate(`/posts/${post.id}`)
  }

  return (
    <main>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
            setError('')
          }}
        />

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(event) => {
            setContent(event.target.value)
            setError('')
          }}
        />

        <button type="submit">Save Post</button>
      </form>
    </main>
  )
}

export default EditPostPage
~~~

#### `src/pages/PostDetailPage.jsx`

`src/pages/PostDetailPage.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function PostDetailPage({ posts, onDelete }) {
  const { postId } = useParams()
  const navigate = useNavigate()
  const post = posts.find((item) => item.id === postId)
  const [likes, setLikes] = useState(0)

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
      <button
        type="button"
        onClick={() => setLikes((currentLikes) => currentLikes + 1)}
      >
        Like {likes}
      </button>
      <button
        type="button"
        onClick={() => {
          onDelete(post.id)
          navigate('/posts')
        }}
      >
        Delete
      </button>
      <Link to={`/posts/${post.id}/edit`}>Edit</Link>
      <Link to="/posts">Back to posts</Link>
    </main>
  )
}

export default PostDetailPage
~~~

### 설명과 확인

- 작성 form과 비슷하지만, 처음 state 값이 기존 게시글 값입니다.
- 없는 게시글 id로 들어오면 Post not found 화면을 보여줍니다.
- 상세 화면에는 Edit 링크를 추가합니다.

## 완료 결과 및 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. npm 명령은 `npm.cmd`로 실행합니다.

~~~powershell
npm.cmd run lint
npm.cmd run build
~~~

Edit 화면에는 기존 값이 들어 있어야 합니다. 저장 후 같은 id의 상세 화면에서 제목과 내용만 바뀌었는지 확인합니다.

## 독립 확인

수정 전후 title, content, id가 어떻게 달라지는지 비교합니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험을 위해 바꾼 값은 다음 단계 전에 복구합니다.

## GitHub에 저장하기

독립 확인에서 잠시 바꾼 코드를 원래대로 돌린 뒤 현재 파일 상태를 확인합니다. 검사와 화면 확인이 끝났다면 이번 단계의 결과를 하나의 commit으로 저장합니다.

```powershell
git status
git add .
git commit -m "Step 12: Edit posts"
git push
git status
```

마지막 `git status`에서 저장하지 않은 변경 파일이 없어야 합니다. GitHub의 개인 저장소를 열어 `main`에 이번 Step의 commit이 보이는지도 확인합니다.
