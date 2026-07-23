# Chapter 12. Effect와 브라우저 데이터

## 확인할 내용

- 렌더링, 이벤트, Effect의 역할을 구분합니다.
- `useEffect`의 기본 모양과 의존성 배열을 읽습니다.
- `localStorage`, JSON, `fetch`가 데이터와 연결되는 흐름을 설명합니다.

## 1. 렌더링, 이벤트, Effect

| 종류 | 언제 실행되는가 | 예 |
| --- | --- | --- |
| 렌더링 계산 | 화면을 그릴 때 | props 읽기, 목록 `filter`, JSX 반환 |
| 이벤트 처리 | 사용자가 동작할 때 | 클릭, 입력, submit 처리 |
| Effect | 렌더링 결과를 외부와 맞출 때 | 문서 제목, 저장소, 네트워크 |

렌더링 중에는 화면에 필요한 값을 계산합니다.

~~~jsx
function PostCount({ posts }) {
  const count = posts.length
  return <p>게시글 {count}개</p>
}
~~~

클릭으로 생긴 일은 이벤트에서 처리합니다.

~~~jsx
function SaveButton() {
  function handleClick() {
    console.log('저장 버튼 클릭')
  }

  return <button onClick={handleClick}>저장</button>
}
~~~

## 2. `useEffect` 기본 모양

~~~jsx
import { useEffect } from 'react'

function Page({ title }) {
  useEffect(() => {
    document.title = title
  }, [title])

  return <h1>{title}</h1>
}
~~~

컴포넌트가 화면에 반영된 뒤 Effect가 실행되어 브라우저 탭 제목을 바꿉니다. `title`이 달라지면 Effect가 다시 실행됩니다.

## 3. 의존성 배열 읽기

~~~jsx
useEffect(() => {
  console.log('렌더링 뒤마다 실행')
})

useEffect(() => {
  console.log('처음 나타난 뒤 실행')
}, [])

useEffect(() => {
  console.log('keyword가 달라진 뒤 실행')
}, [keyword])
~~~

Effect 안에서 사용하는 props와 state는 보통 의존성 배열에도 포함합니다.

단순 계산에는 Effect가 필요하지 않습니다.

~~~jsx
// 불필요하게 복잡함
const [postCount, setPostCount] = useState(0)
useEffect(() => setPostCount(posts.length), [posts])

// 렌더링 중 바로 계산
const postCount = posts.length
~~~

## 4. 정리 함수

~~~jsx
useEffect(() => {
  const timerId = setInterval(() => {
    console.log('1초가 지났습니다.')
  }, 1000)

  return () => {
    clearInterval(timerId)
  }
}, [])
~~~

Effect가 반환하는 함수는 타이머나 이벤트 구독처럼 Effect가 만든 외부 연결을 해제합니다.

## 5. localStorage

`localStorage`는 같은 브라우저에 작은 문자열 데이터를 저장하는 API입니다.

~~~js
localStorage.setItem('blog-name', 'Mini Blog')
const savedName = localStorage.getItem('blog-name')
localStorage.removeItem('blog-name')
~~~

객체와 배열은 JSON 문자열로 바꾸어 저장합니다.

~~~js
const posts = [{ id: '1', title: 'React 시작하기' }]

localStorage.setItem('posts', JSON.stringify(posts))

const savedText = localStorage.getItem('posts')
const savedPosts = JSON.parse(savedText)
~~~

잘못된 JSON에 대비할 수 있습니다.

~~~js
function loadPosts() {
  const savedText = localStorage.getItem('posts')

  if (!savedText) {
    return []
  }

  try {
    const parsedPosts = JSON.parse(savedText)
    return Array.isArray(parsedPosts) ? parsedPosts : []
  } catch {
    return []
  }
}
~~~

JSON 문법이 맞아도 결과가 객체 하나라면 게시글 목록으로 사용할 수 없습니다. 실습의 `isPostArray`는 배열 안의 각 게시글 필드도 문자열인지 검사합니다.

## 6. state가 바뀔 때 저장하기

~~~jsx
const [posts, setPosts] = useState(loadPosts)

useEffect(() => {
  localStorage.setItem('posts', JSON.stringify(posts))
}, [posts])
~~~

`posts`가 바뀐 렌더링 뒤에 새 배열을 저장합니다. `useState(loadPosts)`처럼 함수 자체를 전달하면 첫 state를 정할 때 함수를 사용합니다.

## 7. `fetch`로 데이터 요청하기

~~~js
async function loadPosts() {
  const response = await fetch('/posts.json')
  const posts = await response.json()
  return posts
}
~~~

- `async`: 이 함수 안에서 `await`를 사용한다는 선언입니다.
- `await`: 비동기 작업의 결과를 기다립니다.
- `response.json()`: JSON 응답을 JavaScript 값으로 읽습니다.

요청은 실패할 수 있으므로 응답과 오류도 확인합니다.

~~~js
async function loadPosts() {
  try {
    const response = await fetch('/posts.json')

    if (!response.ok) {
      throw new Error('게시글을 불러오지 못했습니다.')
    }

    const posts = await response.json()

    if (!Array.isArray(posts)) {
      throw new Error('게시글 응답이 배열이 아닙니다.')
    }

    return posts
  } catch (error) {
    console.error(error)
    return []
  }
}
~~~

## 8. 로딩 상태와 데이터 흐름

~~~jsx
function PostsPage() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    async function load() {
      const data = await loadPosts()

      if (!ignore) {
        setPosts(data)
        setIsLoading(false)
      }
    }

    load()

    return () => {
      ignore = true
    }
  }, [])

  if (isLoading) {
    return <p>불러오는 중...</p>
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
~~~

~~~text
처음: posts = [], isLoading = true
  -> 로딩 문구 표시
  -> Effect에서 fetch 실행
  -> 응답을 posts에 저장
  -> isLoading을 false로 변경
  -> 게시글 목록 표시
~~~

## 9. 개발 환경의 StrictMode

프로젝트가 `StrictMode`를 사용하면 개발 중 Effect 문제를 찾기 위해 실행과 정리 과정이 한 번 더 보일 수 있습니다. 배포된 화면에서도 무조건 두 번 실행된다는 뜻은 아닙니다. 먼저 의존성 배열과 정리 함수의 동작을 확인합니다.

## 10. 라우팅 개념

라우팅은 브라우저 주소와 보여 줄 페이지 컴포넌트를 연결하는 일입니다.

~~~text
/             -> HomePage
/posts        -> PostsPage
/posts/3      -> PostDetailPage
/posts/new    -> NewPostPage
~~~

미니 블로그 실습은 `react-router-dom`을 사용하고 Next.js는 파일과 폴더 기반 App Router를 사용합니다. 방식은 다르지만 주소에 맞는 화면을 보여 준다는 목적은 같습니다.

## 실습과 연결하기

| 기초 챕터 | 이어지는 실습 |
| --- | --- |
| Chapter 1, 5, 6 | step 1~2: JSX 화면과 컴포넌트 분리 |
| Chapter 12의 라우팅 개념 | step 3, 6: 목록·상세 주소 연결 |
| Chapter 7 | step 4: `PostCard` props |
| Chapter 3, 9 | step 5: 배열과 목록 렌더링 |
| Chapter 8 | step 7: 좋아요 state |
| Chapter 10 | step 8~10: 작성 폼과 검증 |
| Chapter 11 | step 9, 11~13: 추가·삭제·수정·검색 |
| Chapter 12 | step 14~15: 저장소와 mock fetch |

개인 저장소의 `main`에서 코드를 작성하다 문법이 낯설면 해당 기초 챕터의 짧은 예제를 다시 확인합니다.

## 코드 읽기 연습

~~~jsx
function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function load() {
      const response = await fetch('/posts.json')
      const data = await response.json()
      setPosts(data)
    }

    load()
  }, [])

  return <p>게시글 수: {posts.length}</p>
}
~~~

- 처음 렌더링에서 게시글 수는 몇 개인가요?
- 외부 데이터를 요청하는 코드는 어느 부분인가요?
- 응답을 React 화면의 데이터로 만드는 코드는 무엇인가요?

## 흔한 실수

- 렌더링할 때마다 `setState`를 실행합니다.
- 단순 계산도 Effect와 별도 state로 만듭니다.
- 객체를 `localStorage`에 그대로 저장할 수 있다고 생각합니다.
- `fetch`가 항상 성공한다고 가정하고 로딩과 실패 상태를 생각하지 않습니다.

## 확인 문제

1. React 밖의 기능과 화면을 맞출 때 사용할 수 있는 Hook은 무엇인가요?
2. 배열을 `localStorage`에 저장하기 전에 어떤 변환이 필요한가요?
3. JSON 문자열을 JavaScript 값으로 바꾸는 함수는 무엇인가요?
4. React Router와 Next.js App Router의 공통 목적은 무엇인가요?

### 정답 확인

1. `useEffect`입니다.
2. `JSON.stringify`로 문자열로 변환합니다.
3. `JSON.parse`입니다.
4. 브라우저 주소와 보여 줄 화면을 연결하는 것입니다.
