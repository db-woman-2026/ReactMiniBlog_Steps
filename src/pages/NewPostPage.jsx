import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NewPostPage({ onCreate }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()

    if (!trimmedTitle || !trimmedContent) {
      setError('Please enter both a title and content.')
      return
    }

    const newPost = onCreate({
      title: trimmedTitle,
      content: trimmedContent,
    })

    navigate(`/posts/${newPost.id}`)
  }

  return (
    <main>
      <h1>New Post</h1>
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
