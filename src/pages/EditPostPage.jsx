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
