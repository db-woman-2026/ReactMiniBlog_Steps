# Chapter 7. props로 데이터 전달

## 확인할 내용

- 부모 컴포넌트가 자식 컴포넌트에 값을 전달하는 흐름을 이해합니다.
- props 객체와 구조 분해 문법을 읽습니다.
- 문자열, 숫자, 객체, 함수, 자식 JSX를 props로 전달합니다.

## 1. 같은 컴포넌트에 다른 데이터 보여 주기

~~~jsx
function PostCard() {
  return (
    <article>
      <h2>React 시작하기</h2>
      <p>첫 번째 게시글입니다.</p>
    </article>
  )
}
~~~

이 컴포넌트는 언제 사용해도 같은 글만 보여 줍니다. 제목과 내용을 밖에서 전달받으면 여러 게시글에 재사용할 수 있습니다.

~~~jsx
function PostCard(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      <p>{props.content}</p>
    </article>
  )
}

function PostsPage() {
  return (
    <main>
      <PostCard title="React 시작하기" content="첫 번째 글입니다." />
      <PostCard title="Props 배우기" content="두 번째 글입니다." />
    </main>
  )
}
~~~

`PostsPage`가 부모이고 `PostCard`가 자식입니다. 부모가 JSX 속성 모양으로 전달한 값이 자식의 `props` 객체에 들어갑니다.

## 2. props 객체의 모양

다음 사용 코드를 봅니다.

~~~jsx
<PostCard title="React 시작하기" author="Mina" viewCount={12} />
~~~

`PostCard`가 받는 props는 개념적으로 다음 객체와 비슷합니다.

~~~js
{
  title: 'React 시작하기',
  author: 'Mina',
  viewCount: 12,
}
~~~

문자열은 따옴표로, 숫자와 JavaScript 값은 중괄호로 전달합니다.

## 3. 구조 분해로 props 받기

~~~jsx
function PostCard(props) {
  return <h2>{props.title}</h2>
}
~~~

객체 구조 분해를 사용하면 더 짧게 적을 수 있습니다.

~~~jsx
function PostCard({ title, author, viewCount }) {
  return (
    <article>
      <h2>{title}</h2>
      <p>작성자: {author}</p>
      <p>조회수: {viewCount}</p>
    </article>
  )
}
~~~

두 코드는 같은 종류의 값을 받습니다. 이 프로젝트에서는 두 번째 형태를 자주 사용합니다.

## 4. 변수를 props로 전달하기

~~~jsx
function PostsPage() {
  const post = {
    title: '컴포넌트와 props',
    author: 'Joon',
    viewCount: 20,
  }

  return (
    <PostCard
      title={post.title}
      author={post.author}
      viewCount={post.viewCount}
    />
  )
}
~~~

`title={post.title}`에서 왼쪽 `title`은 자식이 받을 props 이름이고, 오른쪽 `post.title`은 부모가 전달할 값입니다.

## 5. 객체 하나를 전달하기

프로퍼티를 각각 전달하는 대신 객체 하나를 전달할 수도 있습니다.

~~~jsx
function PostCard({ post }) {
  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.author}</p>
    </article>
  )
}

function PostsPage() {
  const post = {
    id: '1',
    title: '객체 props',
    author: 'Mina',
  }

  return <PostCard post={post} />
}
~~~

어떤 방식이 항상 정답인 것은 아닙니다. 작은 컴포넌트는 필요한 값만 각각 받으면 역할이 잘 보이고, 관련 값이 많으면 객체 하나가 편할 수 있습니다.

## 6. 불리언 props

~~~jsx
function StatusBadge({ isPublished }) {
  return <span>{isPublished ? '공개' : '비공개'}</span>
}

function App() {
  return (
    <>
      <StatusBadge isPublished={true} />
      <StatusBadge isPublished={false} />
    </>
  )
}
~~~

값 없이 이름만 적은 불리언 props는 `true`를 뜻합니다.

~~~jsx
<StatusBadge isPublished />
~~~

의미를 분명히 확인하려면 `{true}`와 `{false}`를 직접 적습니다.

## 7. 함수를 props로 전달하기

부모가 가진 동작을 자식의 버튼에서 실행해야 할 때 함수를 전달합니다.

~~~jsx
function DeleteButton({ onDelete }) {
  return <button onClick={onDelete}>삭제</button>
}

function PostPage() {
  function handleDelete() {
    console.log('게시글을 삭제합니다.')
  }

  return <DeleteButton onDelete={handleDelete} />
}
~~~

`onDelete`는 특별한 React 예약어가 아니라 우리가 정한 props 이름입니다. 동작을 전달하는 props는 보통 `on`으로 시작하는 이름을 사용합니다.

## 8. `children`: 태그 사이의 내용 받기

~~~jsx
function Notice({ children }) {
  return <aside>{children}</aside>
}

function App() {
  return (
    <Notice>
      <strong>알림</strong>
      <p>제목을 입력해 주세요.</p>
    </Notice>
  )
}
~~~

`<Notice>`와 `</Notice>` 사이의 JSX가 `children` props로 전달됩니다.

## 9. 기본값 정하기

~~~jsx
function Profile({ name, role = '일반 사용자' }) {
  return (
    <p>
      {name} / {role}
    </p>
  )
}

<Profile name="Mina" />
<Profile name="Joon" role="관리자" />
~~~

첫 번째 컴포넌트는 `role`을 전달하지 않아 기본값인 `'일반 사용자'`를 사용합니다.

## 10. props는 자식이 직접 바꾸지 않기

~~~jsx
function BadTitle({ title }) {
  title = '강제로 바꾼 제목'
  return <h2>{title}</h2>
}
~~~

props는 부모가 자식에게 전달한 읽기 전용 입력으로 생각합니다. 값을 바꿔야 한다면 부모의 state를 변경하는 함수를 전달하거나, 자식이 자기 state를 가져야 합니다.

## 데이터가 흐르는 방향

~~~text
부모가 값 준비
  -> JSX 속성으로 전달
      -> 자식이 props로 받음
          -> JSX에서 사용
~~~

React의 기본 데이터 흐름은 부모에서 자식으로 내려갑니다.

## 코드 읽기 연습

~~~jsx
function UserCard({ user, onSelect }) {
  return (
    <article>
      <h2>{user.name}</h2>
      <button onClick={() => onSelect(user.id)}>선택</button>
    </article>
  )
}

const user = { id: '7', name: 'Mina' }

<UserCard user={user} onSelect={handleSelect} />
~~~

- `UserCard`가 받는 props는 몇 개인가요?
- 제목에 표시되는 값은 어디에서 왔나요?
- 버튼을 클릭하면 어떤 값을 `onSelect`에 전달하나요?

## 흔한 실수

- 부모가 전달한 이름과 자식이 받는 이름이 다릅니다.
- JavaScript 변수를 문자열처럼 따옴표로 전달합니다. `title="post.title"`은 글자 그대로 전달됩니다.
- 함수를 전달할 때 `onDelete={handleDelete()}`처럼 즉시 실행합니다.
- 자식에서 props를 직접 수정합니다.
- props를 받지 않았는데 JSX에서 해당 변수를 사용합니다.

## 확인 문제

1. props는 기본적으로 어느 방향으로 흐르나요?
2. 문자열이 아닌 `viewCount` 변수를 전달할 때 따옴표와 중괄호 중 무엇을 사용하나요?
3. 컴포넌트 태그 사이의 내용을 받는 특별한 props 이름은 무엇인가요?

### 정답 확인

1. 부모 컴포넌트에서 자식 컴포넌트 방향으로 흐릅니다.
2. `<PostCard viewCount={viewCount} />`처럼 중괄호를 사용합니다.
3. `children`입니다.
