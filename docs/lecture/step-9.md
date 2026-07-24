# Step 9. State 배열에 게시글 작성

## 변경 내용

- 게시글 배열을 App의 state로 관리합니다.
- 작성 form submit으로 새 게시글을 추가합니다.
- 작성 후 새 게시글 상세 화면으로 이동합니다.

## 시작 전 확인

개인 저장소의 `main`에 Step 8 결과를 commit하고 GitHub에 push한 상태로 시작합니다.

Windows Terminal의 PowerShell에서 개인 프로젝트 폴더로 이동하고 현재 상태를 확인합니다.

~~~powershell
Set-Location "$HOME\dongbu\react-mini-blog"
git status
~~~

`main`에 있고 아직 저장하지 않은 변경 파일이 없어야 합니다. 각 코드 블록 위의 파일 경로를 확인한 뒤 해당 파일의 전체 내용을 직접 입력합니다.

## 작업 1. 게시글 배열을 App state로 올리기

게시글을 작성하려면 목록 데이터가 바뀔 수 있어야 합니다. 고정 배열을 `App.jsx`의 state로 옮기고, 목록/상세/작성 화면에 필요한 값을 props로 전달합니다.

새 배열은 함수형 updater로 만듭니다. React가 전달한 최신 배열을 사용하면 연속된 추가가 오래된 `posts` 값을 참조하지 않습니다.

### 수정할 파일

- 수정: `src/App.jsx`
- 수정: `src/data/posts.js`
- 수정: `src/pages/PostsPage.jsx`
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
          element={<PostDetailPage posts={posts} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
~~~

#### `src/data/posts.js`

`src/data/posts.js`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~js
export const initialPosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    excerpt: 'React lets us build a screen by combining small components.',
    content:
      'React components are JavaScript functions that return JSX. A page can be built by combining small components together.',
    author: 'Mini Blog Team',
  },
  {
    id: '2',
    title: 'Why Props Matter',
    excerpt: 'Props let a parent component pass data to a child component.',
    content:
      'Props are useful because the same component can show different data. This keeps our UI reusable and easier to read.',
    author: 'Mini Blog Team',
  },
  {
    id: '3',
    title: 'Rendering Lists',
    excerpt: 'The map method turns an array of data into an array of elements.',
    content:
      'Most apps show lists: posts, products, messages, or comments. React uses arrays and map to render those lists.',
    author: 'Mini Blog Team',
  },
]
~~~

#### `src/pages/PostDetailPage.jsx`

`src/pages/PostDetailPage.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function PostDetailPage({ posts }) {
  const { postId } = useParams()
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
      <Link to="/posts">Back to posts</Link>
    </main>
  )
}

export default PostDetailPage
~~~

#### `src/pages/PostsPage.jsx`

`src/pages/PostsPage.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
import PostCard from '../components/PostCard'

function PostsPage({ posts }) {
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

- 게시글 배열은 작성할 때 바뀌므로 `App`의 state로 관리합니다.
- `createPost`는 새 게시글 객체를 만들고 배열 앞에 추가합니다.
- 자식 화면들은 props로 posts나 함수를 전달받습니다.

## 작업 2. form submit으로 새 글 추가하기

New Post 화면에서 form을 제출하면 부모가 받은 `onCreate` 함수를 호출합니다. 새 게시글이 만들어지면 그 상세 화면으로 이동합니다.

### 수정할 파일

- 수정: `src/pages/NewPostPage.jsx`

### 입력할 코드

#### `src/pages/NewPostPage.jsx`

`src/pages/NewPostPage.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NewPostPage({ onCreate }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    const newPost = onCreate({
      title,
      content,
    })

    navigate(`/posts/${newPost.id}`)
  }

  return (
    <main>
      <h1>New Post</h1>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Create Post</button>
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

- `event.preventDefault()`는 form 제출로 페이지가 새로고침되는 것을 막습니다.
- `useNavigate`는 코드로 다른 주소로 이동할 때 사용합니다.
- 글 작성은 서버 저장이 아니라 state 배열에 객체를 추가하는 흐름입니다.

## 완료 결과 및 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md) <span class="print-reference" data-print-reference="true">(React · Windows 11 x64 개발 환경 준비 · 1. Windows Terminal 설치)</span>를 먼저 확인합니다.

~~~powershell
npm run lint
npm run build
~~~

새 글을 작성하면 해당 상세 주소로 이동하고, 기존 글과 새 글이 Posts 목록에 함께 보이는지 확인합니다.

## 독립 확인

새 글을 두 개 연속 추가하고 기존 글이 사라지지 않는지 확인합니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험값은 검사를 마치면 원래대로 복구합니다.

## GitHub에 저장하기

독립 확인에서 잠시 바꾼 코드를 원래대로 돌린 뒤 현재 파일 상태를 확인합니다. 검사와 화면 확인이 끝나면 현재 변경을 하나의 commit으로 저장합니다.

```powershell
git status
git add .
git commit -m "Step 9: Create posts in state"
git push
git status
```

마지막 `git status`에서 저장하지 않은 변경 파일이 없어야 합니다. GitHub의 개인 저장소를 열어 `main`에 이번 Step의 commit이 보이는지도 확인합니다.
