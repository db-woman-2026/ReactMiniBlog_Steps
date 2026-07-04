import PostCard from '../components/PostCard'
import { featuredPost } from '../data/posts'

function PostsPage() {
  return (
    <main>
      <h1>Posts</h1>
      <PostCard
        title={featuredPost.title}
        excerpt={featuredPost.excerpt}
        author={featuredPost.author}
      />
    </main>
  )
}

export default PostsPage
