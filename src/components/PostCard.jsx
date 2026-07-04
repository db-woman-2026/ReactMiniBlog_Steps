function PostCard({ title, excerpt, author }) {
  return (
    <article className="post-card">
      <h2>{title}</h2>
      <p>{excerpt}</p>
      <p>Written by {author}</p>
    </article>
  )
}

export default PostCard
