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

    setPosts([newPost, ...posts])
    return newPost
  }

  function deletePost(id) {
    setPosts(posts.filter((post) => post.id !== id))
  }

  function updatePost(id, postInput) {
    setPosts(
      posts.map((post) =>
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
