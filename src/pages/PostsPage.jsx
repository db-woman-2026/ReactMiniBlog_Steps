import PostCard from '../components/PostCard'
import { posts } from '../data/posts'

function PostsPage() {
  return (
    <main>
      <h1>Posts</h1>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          excerpt={post.excerpt}
          author={post.author}
        />
      ))}
    </main>
  )
}

export default PostsPage
