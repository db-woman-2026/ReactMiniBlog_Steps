import { useState } from 'react'

function NewPostPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  return (
    <main>
      <h1>New Post</h1>
      <form>
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
