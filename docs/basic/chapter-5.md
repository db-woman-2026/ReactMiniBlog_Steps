# Chapter 5. JSX 읽고 쓰기

## 배울 내용

- JSX가 JavaScript 안에서 화면 구조를 표현하는 문법임을 이해합니다.
- JSX의 기본 규칙을 지킵니다.
- 중괄호로 문자열, 숫자, 표현식을 화면에 넣습니다.

## 1. JSX는 HTML과 닮은 JavaScript 문법

~~~jsx
const element = <h1>React Mini Blog</h1>
~~~

브라우저가 JSX를 그대로 이해하는 것은 아닙니다. Vite가 JSX를 브라우저가 실행할 수 있는 JavaScript로 변환합니다.

JSX는 HTML과 닮았지만 완전히 같지는 않습니다.

## 2. JSX는 하나의 부모로 감싸기

다음 코드는 형제 요소가 나란히 있어 오류가 납니다.

~~~jsx
function App() {
  return (
    <h1>Mini Blog</h1>
    <p>게시글 목록입니다.</p>
  )
}
~~~

하나의 부모 요소로 감쌉니다.

~~~jsx
function App() {
  return (
    <main>
      <h1>Mini Blog</h1>
      <p>게시글 목록입니다.</p>
    </main>
  )
}
~~~

화면에 불필요한 HTML 요소를 만들고 싶지 않으면 Fragment를 사용합니다.

~~~jsx
function App() {
  return (
    <>
      <Header />
      <main>본문</main>
      <Footer />
    </>
  )
}
~~~

`<>...</>`가 Fragment의 짧은 문법입니다.

## 3. 모든 태그 닫기

내용이 있는 태그는 여는 태그와 닫는 태그를 모두 적습니다.

~~~jsx
<p>React를 공부합니다.</p>
~~~

자식 내용이 없는 태그는 `/>`로 닫습니다.

~~~jsx
<img src="/profile.png" alt="작성자 프로필" />
<input type="text" />
<PostCard />
~~~

## 4. `className`과 `htmlFor`

JSX에서는 HTML의 `class` 대신 `className`을 사용합니다.

~~~jsx
<article className="post-card">게시글</article>
~~~

`label`이 어떤 입력 칸을 설명하는지는 `htmlFor`로 연결합니다.

~~~jsx
<label htmlFor="title">제목</label>
<input id="title" />
~~~

`htmlFor` 값과 `id` 값이 같아야 합니다.

## 5. 중괄호로 JavaScript 값 넣기

~~~jsx
function Post() {
  const title = 'JSX 기초'
  const viewCount = 10

  return (
    <article>
      <h2>{title}</h2>
      <p>조회수: {viewCount}</p>
      <p>다음 조회수: {viewCount + 1}</p>
    </article>
  )
}
~~~

중괄호 안에는 하나의 값이 되는 JavaScript 표현식을 넣습니다.

~~~jsx
<p>{title.toUpperCase()}</p>
<p>{isPublished ? '공개' : '비공개'}</p>
<p>{post.author}</p>
~~~

`if`, `for`, 변수 선언은 그 자체로 하나의 값이 아니므로 중괄호 안에 바로 넣지 않습니다.

~~~jsx
// 잘못된 예
<p>{if (isPublished) '공개'}</p>
~~~

## 6. 문자열 속성과 JavaScript 속성

문자열을 그대로 전달할 때는 따옴표를 사용합니다.

~~~jsx
<input type="text" placeholder="제목을 입력하세요" />
~~~

JavaScript 값을 전달할 때는 중괄호를 사용합니다.

~~~jsx
const imageUrl = '/profile.png'
const imageWidth = 80

<img src={imageUrl} width={imageWidth} alt="프로필" />
~~~

숫자를 따옴표로 감싸면 문자열이 됩니다. 숫자 props는 `{imageWidth}`처럼 숫자 표현식으로 전달합니다.

## 7. JSX 안에 컴포넌트 넣기

~~~jsx
function Header() {
  return <header>Mini Blog</header>
}

function App() {
  return (
    <>
      <Header />
      <main>본문</main>
    </>
  )
}
~~~

소문자로 시작하는 `<header>`는 HTML 요소이고, 대문자로 시작하는 `<Header />`는 우리가 만든 React 컴포넌트입니다.

## 8. JSX 주석

JSX 안의 주석은 중괄호 안에 적습니다.

~~~jsx
function App() {
  return (
    <main>
      {/* 페이지에서 가장 큰 제목 */}
      <h1>Mini Blog</h1>
    </main>
  )
}
~~~

주석을 많이 쓰기보다 이름만으로 뜻이 드러나는 컴포넌트와 변수를 만드는 것이 좋습니다.

## 9. JSX 밖에서 먼저 계산하기

복잡한 계산은 `return` 위에서 이름을 붙인 뒤 JSX에서 사용하면 읽기 쉽습니다.

~~~jsx
function PostStatus({ isPublished, viewCount }) {
  const statusText = isPublished ? '공개 글' : '비공개 글'
  const viewText = `조회수 ${viewCount}`

  return (
    <p>
      {statusText} / {viewText}
    </p>
  )
}
~~~

## 코드 읽기 연습

~~~jsx
function Profile() {
  const user = {
    name: 'Mina',
    isAdmin: false,
  }

  return (
    <section>
      <h2>{user.name}</h2>
      <p>{user.isAdmin ? '관리자' : '일반 사용자'}</p>
    </section>
  )
}
~~~

- 화면의 제목에는 무엇이 보이나요?
- 문단에는 무엇이 보이나요?
- HTML 요소와 컴포넌트를 구분할 수 있나요?

## 흔한 실수

- 여러 JSX 요소를 하나의 부모로 감싸지 않습니다.
- `<input>`이나 컴포넌트 태그를 닫지 않습니다.
- `class`와 `for`를 그대로 사용합니다.
- JavaScript 변수를 `{}` 없이 글자처럼 적습니다.
- 컴포넌트 이름을 소문자로 시작해 HTML 태그로 해석되게 합니다.

## 확인 문제

1. JSX에서 JavaScript 값을 넣을 때 어떤 기호를 사용하나요?
2. 화면에 요소를 추가하지 않고 형제 요소를 묶는 문법은 무엇인가요?
3. `<PostCard />`와 `<article>`의 가장 눈에 띄는 이름 차이는 무엇인가요?

### 정답 확인

1. 중괄호 `{}`를 사용합니다.
2. Fragment의 짧은 문법인 `<>...</>`를 사용할 수 있습니다.
3. React 컴포넌트인 `PostCard`는 대문자로 시작하고 HTML 요소인 `article`은 소문자로 시작합니다.
