import { Link } from 'react-router-dom'

function PostCard({ id, title, excerpt, author }) {
  return (
    <article className="post-card">
      <h2>
        <Link to={`/posts/${id}`}>{title}</Link>
      </h2>
      <p>{excerpt}</p>
      <p>Written by {author}</p>
    </article>
  )
}

export default PostCard
