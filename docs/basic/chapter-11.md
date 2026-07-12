# Chapter 11. state로 추가·삭제·수정

## 학습 목표

- 배열과 객체 state를 기존 값 그대로 수정하지 않습니다.
- 전개 문법, `filter`, `map`으로 추가·삭제·수정을 처리합니다.
- state를 부모로 올리고 함수를 자식에게 전달하는 흐름을 이해합니다.

## 1. React state는 새 값으로 교체하기

~~~jsx
const [posts, setPosts] = useState([
  { id: '1', title: '첫 글' },
])
~~~

배열 state를 변경할 때 기존 배열을 직접 수정하지 않고 새 배열을 만들어 setter에 전달합니다.

~~~js
// 피해야 할 방식
posts.push(newPost)
setPosts(posts)

// 새 배열을 만드는 방식
setPosts([...posts, newPost])
~~~

새 배열을 전달하면 React가 값이 바뀌었다는 사실을 판단하기 쉽고 이전 state도 훼손하지 않습니다.

## 2. 게시글 추가하기

~~~jsx
function App() {
  const [posts, setPosts] = useState([])

  function createPost(postInput) {
    const newPost = {
      id: String(Date.now()),
      title: postInput.title,
      content: postInput.content,
    }

    setPosts((previousPosts) => [newPost, ...previousPosts])
  }

  return <NewPostForm onCreate={createPost} />
}
~~~

자식 폼이 `onCreate(postInput)`을 실행하면 부모의 `createPost`가 새 객체와 새 배열을 만듭니다. 서버가 없으므로 이 state는 새로고침 전까지만 유지됩니다.

## 3. 게시글 삭제하기

~~~jsx
function deletePost(id) {
  setPosts((previousPosts) =>
    previousPosts.filter((post) => post.id !== id),
  )
}
~~~

삭제할 항목을 직접 꺼내 없애는 대신, 삭제할 id와 다른 게시글만 남긴 새 배열을 만듭니다.

~~~jsx
function PostCard({ post, onDelete }) {
  return (
    <article>
      <h2>{post.title}</h2>
      <button onClick={() => onDelete(post.id)}>삭제</button>
    </article>
  )
}
~~~

자식은 삭제할 id를 부모 함수에 전달합니다.

## 4. 게시글 수정하기

~~~jsx
function updatePost(id, postInput) {
  setPosts((previousPosts) =>
    previousPosts.map((post) =>
      post.id === id
        ? {
            ...post,
            title: postInput.title,
            content: postInput.content,
          }
        : post,
    ),
  )
}
~~~

- id가 같으면 기존 객체를 펼치고 제목과 내용을 덮어씁니다.
- id가 다르면 기존 객체를 그대로 반환합니다.
- `map` 결과로 새 배열을 만듭니다.

## 5. 객체 state 수정하기

~~~jsx
function ProfileForm() {
  const [profile, setProfile] = useState({
    name: 'Mina',
    bio: 'React learner',
  })

  function changeName(newName) {
    setProfile((previousProfile) => ({
      ...previousProfile,
      name: newName,
    }))
  }

  // ...
}
~~~

`bio`는 유지하고 `name`만 바꾼 새 객체를 만듭니다. `profile.name = newName`처럼 기존 객체를 직접 변경하지 않습니다.

## 6. state를 어디에 둘지 정하기

게시글 목록과 작성 폼이 같은 데이터를 사용한다면 둘의 공통 부모가 state를 가집니다.

~~~jsx
function App() {
  const [posts, setPosts] = useState([])

  function createPost(postInput) {
    // posts state 변경
  }

  return (
    <>
      <PostsPage posts={posts} />
      <NewPostPage onCreate={createPost} />
    </>
  )
}
~~~

- `App`이 state를 소유합니다.
- `PostsPage`는 표시할 데이터를 받습니다.
- `NewPostPage`는 state를 변경할 함수를 받습니다.

여러 자식이 함께 사용해야 하는 state를 공통 부모로 옮기는 것을 **state 끌어올리기**라고 합니다.

## 7. 계산할 수 있는 값은 바로 계산하기

~~~jsx
function PostsPage({ posts, keyword }) {
  const visiblePosts = posts.filter((post) =>
    post.title.toLowerCase().includes(keyword.toLowerCase()),
  )

  return (
    <main>
      <p>검색 결과: {visiblePosts.length}개</p>
      {visiblePosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  )
}
~~~

검색 결과와 개수는 `posts`와 `keyword`로 계산할 수 있으므로 별도 state가 필요하지 않습니다.

## 8. 데이터와 동작의 흐름

~~~jsx
function App() {
  function deletePost(id) {
    // state 변경
  }

  return <PostsPage posts={posts} onDelete={deletePost} />
}

function PostsPage({ posts, onDelete }) {
  return posts.map((post) => (
    <PostCard key={post.id} post={post} onDelete={onDelete} />
  ))
}

function PostCard({ post, onDelete }) {
  return <button onClick={() => onDelete(post.id)}>삭제</button>
}
~~~

~~~text
데이터와 함수: App -> PostsPage -> PostCard
사용자 동작:   PostCard -> onDelete(id) -> App의 state 변경
새 화면:       변경된 posts -> 다시 자식에게 전달
~~~

## 9. CRUD 용어 연결

| 용어 | 뜻 | state 배열에서 사용하는 방법 |
| --- | --- | --- |
| Create | 새 데이터 만들기 | 새 객체와 전개 문법 |
| Read | 데이터 읽기 | `map`, `find` |
| Update | 기존 데이터 수정 | `map`과 객체 전개 문법 |
| Delete | 데이터 삭제 | `filter` |

미니 블로그 실습에서는 이 작업을 브라우저의 state로 처리합니다. Next.js 프로젝트에서는 같은 목적의 코드를 서버 API와 데이터베이스로 옮깁니다.

## 코드 읽기 연습

~~~js
const todos = [
  { id: '1', text: 'JSX 읽기', done: false },
  { id: '2', text: 'props 연습', done: false },
]

const nextTodos = todos.map((todo) =>
  todo.id === '2' ? { ...todo, done: true } : todo,
)
~~~

- 어떤 항목이 새 객체로 바뀌나요?
- `text` 값은 유지되나요?
- 원래 `todos` 배열은 직접 변경되나요?

## 흔한 실수

- `push`, `splice`나 프로퍼티 대입으로 기존 state를 직접 변경합니다.
- `map`에서 수정하지 않을 항목을 반환하지 않습니다.
- 삭제 조건을 반대로 적어 삭제할 글만 남깁니다.
- 자식마다 같은 게시글 목록 state를 따로 만듭니다.
- 기존 state에서 계산할 수 있는 결과를 또 state로 저장합니다.

## 확인 문제

1. 배열 state에 새 항목을 추가할 때 기존 배열을 직접 바꿔도 되나요?
2. 삭제에는 주로 어떤 배열 메서드를 사용하나요?
3. 수정에는 주로 어떤 배열 메서드와 객체 문법을 함께 사용하나요?
4. 여러 자식이 같은 state를 사용하면 state를 어디에 두나요?

### 정답 확인

1. 직접 바꾸지 않고 전개 문법으로 새 배열을 만듭니다.
2. `filter`를 사용합니다.
3. `map`과 객체 전개 문법을 사용합니다.
4. 자식들의 공통 부모 컴포넌트에 둡니다.
