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
      <button type="button" onClick={() => setLikes(likes + 1)}>
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
