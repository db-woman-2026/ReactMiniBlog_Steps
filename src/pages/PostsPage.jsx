import { useState } from 'react'
import PostCard from '../components/PostCard'

function PostsPage({ posts }) {
  const [keyword, setKeyword] = useState('')
  const normalizedKeyword = keyword.trim().toLowerCase()
  const filteredPosts = posts.filter((post) => {
    const title = post.title.toLowerCase()
    const content = post.content.toLowerCase()

    return title.includes(normalizedKeyword) || content.includes(normalizedKeyword)
  })

  return (
    <main>
      <h1>Posts</h1>

      <label htmlFor="keyword">Search posts</label>
      <input
        id="keyword"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="Type a keyword"
      />

      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            excerpt={post.excerpt}
            author={post.author}
          />
        ))
      )}
    </main>
  )
}

export default PostsPage
