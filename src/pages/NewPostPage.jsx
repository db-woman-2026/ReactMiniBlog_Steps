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
