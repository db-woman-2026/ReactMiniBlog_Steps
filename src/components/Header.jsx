import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <strong>React Mini Blog</strong>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/posts">Posts</Link>
      </nav>
    </header>
  )
}

export default Header
