import { Link, useParams } from 'react-router-dom'
import { posts } from '../data/posts'

function PostDetailPage() {
  const { postId } = useParams()
  const post = posts.find((item) => item.id === postId)

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
      <Link to="/posts">Back to posts</Link>
    </main>
  )
}

export default PostDetailPage
