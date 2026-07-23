# Chapter 9. 조건부 화면과 목록

## 확인할 내용

- 조건에 따라 다른 JSX를 보여 줍니다.
- 배열을 `map`으로 컴포넌트 목록으로 바꿉니다.
- 목록의 `key`가 어떤 역할을 하는지 이해합니다.

## 1. 변수에서 조건에 맞는 값 고르기

~~~jsx
function LoginStatus({ isLoggedIn }) {
  const message = isLoggedIn ? '로그인 중입니다.' : '로그인이 필요합니다.'

  return <p>{message}</p>
}
~~~

조건을 JSX 밖에서 계산해 이름을 붙이면 읽기 쉽습니다.

## 2. 삼항 연산자로 두 화면 중 하나 고르기

~~~jsx
function LoginButton({ isLoggedIn }) {
  return (
    <button>
      {isLoggedIn ? '로그아웃' : '로그인'}
    </button>
  )
}
~~~

JSX 안에서 간단한 두 경우를 고를 때 삼항 연산자를 사용합니다.

요소 전체를 바꿀 수도 있습니다.

~~~jsx
function UserArea({ user }) {
  return (
    <section>
      {user ? <p>{user.name}님</p> : <button>로그인</button>}
    </section>
  )
}
~~~

## 3. `&&`로 있을 때만 보여 주기

~~~jsx
function FormMessage({ error }) {
  return (
    <section>
      <h2>새 글 작성</h2>
      {error && <p>{error}</p>}
    </section>
  )
}
~~~

`error`가 빈 문자열이면 문단이 보이지 않고, 오류 문자열이 있으면 문단이 보입니다.

`&&`는 "조건이 참일 때 오른쪽 JSX를 보여 준다"는 패턴으로 자주 사용합니다.

## 4. 일찍 반환하기

경우가 분명히 나뉘면 컴포넌트 위쪽에서 먼저 반환할 수 있습니다.

~~~jsx
function PostDetail({ post, isLoading }) {
  if (isLoading) {
    return <p>불러오는 중...</p>
  }

  if (!post) {
    return <p>게시글을 찾을 수 없습니다.</p>
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
~~~

로딩 중이 아니고 게시글도 있을 때만 마지막 JSX까지 내려갑니다.

## 5. 배열을 JSX 목록으로 바꾸기

~~~jsx
function CategoryList() {
  const categories = ['React', 'JavaScript', 'Next.js']

  return (
    <ul>
      {categories.map((category) => (
        <li key={category}>{category}</li>
      ))}
    </ul>
  )
}
~~~

`map`은 각 문자열을 `<li>` 요소로 바꾸고, React는 만들어진 요소 배열을 화면에 표시합니다.

## 6. 객체 배열로 컴포넌트 반복하기

~~~jsx
function PostCard({ title, author }) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{author}</p>
    </article>
  )
}

function PostsPage() {
  const posts = [
    { id: '1', title: 'JSX', author: 'Mina' },
    { id: '2', title: 'Props', author: 'Joon' },
  ]

  return (
    <main>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          author={post.author}
        />
      ))}
    </main>
  )
}
~~~

데이터 객체 하나가 `PostCard` 하나로 바뀝니다.

## 7. `key`는 항목의 이름표

React는 목록이 바뀔 때 어떤 항목이 추가, 삭제, 이동되었는지 알아야 합니다. `key`는 같은 목록 안에서 각 항목을 구분하는 안정적인 값입니다.

~~~jsx
posts.map((post) => (
  <PostCard key={post.id} post={post} />
))
~~~

데이터에 고유한 `id`가 있다면 `key`로 사용합니다.

~~~jsx
// 항목 순서가 바뀌거나 삭제될 수 있는 목록에서는 피하기
posts.map((post, index) => (
  <PostCard key={index} post={post} />
))
~~~

배열 위치인 `index`는 항목이 삭제되거나 순서가 바뀌면 같은 항목을 계속 가리키지 못합니다.

`key`는 React가 내부에서 사용하는 값이라 자식 props로 자동 전달되지 않습니다.

~~~jsx
<PostCard key={post.id} postId={post.id} />
~~~

자식이 id를 사용해야 하면 별도 props로 전달합니다.

## 8. 빈 목록 처리하기

~~~jsx
function PostsPage({ posts }) {
  if (posts.length === 0) {
    return (
      <main>
        <h1>Posts</h1>
        <p>아직 게시글이 없습니다.</p>
      </main>
    )
  }

  return (
    <main>
      <h1>Posts</h1>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  )
}
~~~

배열이 비어 있으면 `map`의 결과도 비어 있어 아무것도 보이지 않습니다. 사용자에게 현재 상태를 알려 주는 문구를 따로 보여 주는 것이 좋습니다.

## 9. 먼저 거른 뒤 목록 만들기

~~~jsx
function PublishedPosts({ posts }) {
  const publishedPosts = posts.filter((post) => post.published)

  return (
    <ul>
      {publishedPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
~~~

`filter`로 필요한 데이터만 남기고 `map`으로 JSX를 만듭니다. 검색 기능도 같은 흐름을 사용합니다.

~~~jsx
const visiblePosts = posts.filter((post) =>
  post.title.toLowerCase().includes(keyword.toLowerCase()),
)
~~~

## 10. 조건이 복잡하면 이름 붙이기

~~~jsx
function PostActions({ post, currentUser }) {
  const canEdit = currentUser && currentUser.id === post.authorId

  return (
    <div>
      <button>목록</button>
      {canEdit && <button>수정</button>}
    </div>
  )
}
~~~

긴 조건을 JSX 안에 모두 적기보다 `canEdit`, `isEmpty`, `isLoading`처럼 뜻이 드러나는 변수로 만듭니다.

## 코드 읽기 연습

~~~jsx
function SearchResult({ posts, keyword }) {
  const results = posts.filter((post) => post.title.includes(keyword))

  if (results.length === 0) {
    return <p>검색 결과가 없습니다.</p>
  }

  return (
    <ul>
      {results.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
~~~

- 어떤 게시글이 `results`에 남나요?
- 검색 결과가 없으면 무엇을 반환하나요?
- 목록 항목을 구분하는 값은 무엇인가요?

## 흔한 실수

- `map` 콜백에서 JSX를 반환하지 않습니다.
- 목록에 `key`를 빠뜨리거나 모든 항목에 같은 key를 사용합니다.
- 고유 id가 있는데도 배열 index를 key로 사용합니다.
- `key`가 자식 컴포넌트의 일반 props로 전달된다고 생각합니다.
- 조건식이 너무 길어 JSX의 구조를 알아보기 어렵게 만듭니다.

## 확인 문제

1. 두 화면 중 하나를 고를 때 사용할 수 있는 연산자는 무엇인가요?
2. 조건이 참일 때만 요소를 보이게 하는 간단한 패턴은 무엇인가요?
3. 배열의 각 게시글을 컴포넌트로 바꿀 때 어떤 메서드를 사용하나요?
4. 목록의 가장 좋은 key 후보는 무엇인가요?

### 정답 확인

1. 삼항 연산자 `조건 ? 참일 때 : 거짓일 때`를 사용할 수 있습니다.
2. `조건 && <요소 />` 패턴입니다.
3. `map`을 사용합니다.
4. 데이터가 가진 고유하고 안정적인 `id`입니다.
