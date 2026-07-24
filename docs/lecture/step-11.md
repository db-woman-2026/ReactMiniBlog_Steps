# Step 11. 게시글 삭제

## 변경 내용

- 상세 화면에서 게시글을 삭제합니다.
- `filter`로 삭제된 글을 제외한 새 배열을 만듭니다.
- 삭제 후 게시글 목록으로 이동합니다.

## 시작 전 확인

개인 저장소의 `main`에 Step 10 결과를 commit하고 GitHub에 push한 상태로 시작합니다.

Windows Terminal의 PowerShell에서 개인 프로젝트 폴더로 이동하고 현재 상태를 확인합니다.

~~~powershell
Set-Location "$HOME\dongbu\react-mini-blog"
git status
~~~

`main`에 있고 아직 저장하지 않은 변경 파일이 없어야 합니다. 각 코드 블록 위의 파일 경로를 확인한 뒤 해당 파일의 전체 내용을 직접 입력합니다.

## 작업 1. 상세 화면에서 게시글 삭제하기

삭제는 배열에서 특정 id의 게시글을 제외한 새 배열을 만드는 일로 이해할 수 있습니다. 삭제 후에는 목록 화면으로 이동합니다.

### 수정할 파일

- 수정: `src/App.jsx`
- 수정: `src/pages/PostDetailPage.jsx`

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
      <Link to="/posts">Back to posts</Link>
    </main>
  )
}

export default PostDetailPage
~~~

### 설명과 확인

- `filter`는 조건을 통과한 항목만 남긴 새 배열을 만듭니다.
- 함수형 updater의 `currentPosts`는 삭제 시점의 최신 배열입니다.
- 부모의 `deletePost` 함수를 상세 페이지에 props로 전달합니다.
- 삭제 후 `navigate('/posts')`로 목록 화면으로 이동합니다.

## 완료 결과 및 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md) <span class="print-reference" data-print-reference="true">(React · Windows 11 x64 개발 환경 준비 · 1. Windows Terminal 설치)</span>를 먼저 확인합니다.

~~~powershell
npm run lint
npm run build
~~~

Delete를 누르면 Posts 화면으로 이동하고 해당 카드가 사라지는지 확인합니다. 삭제 전 상세 주소를 다시 열면 Post not found가 보여야 합니다.

## 독립 확인

글을 삭제한 뒤 목록과 상세 주소의 결과를 확인합니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험값은 검사를 마치면 원래대로 복구합니다.

## GitHub에 저장하기

독립 확인에서 잠시 바꾼 코드를 원래대로 돌린 뒤 현재 파일 상태를 확인합니다. 검사와 화면 확인이 끝나면 현재 변경을 하나의 commit으로 저장합니다.

```powershell
git status
git add .
git commit -m "Step 11: Delete posts"
git push
git status
```

마지막 `git status`에서 저장하지 않은 변경 파일이 없어야 합니다. GitHub의 개인 저장소를 열어 `main`에 이번 Step의 commit이 보이는지도 확인합니다.
