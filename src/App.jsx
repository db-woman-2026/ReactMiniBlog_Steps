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

function loadSavedPosts() {
  const savedPosts = localStorage.getItem(STORAGE_KEY)

  if (!savedPosts) {
    return null
  }

  try {
    const parsedPosts = JSON.parse(savedPosts)
    return Array.isArray(parsedPosts) ? parsedPosts : null
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

        if (!Array.isArray(starterPosts)) {
          throw new Error('Starter posts must be an array.')
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
