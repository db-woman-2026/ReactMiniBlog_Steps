# Chapter 6. 컴포넌트와 화면 조립

## 확인할 내용

- 컴포넌트를 정의하는 코드와 사용하는 코드를 구분합니다.
- 큰 화면을 의미 있는 작은 컴포넌트로 나눕니다.
- 여러 컴포넌트를 부모 컴포넌트에서 조립합니다.

## 1. 가장 작은 컴포넌트

~~~jsx
function Logo() {
  return <strong>Mini Blog</strong>
}
~~~

컴포넌트는 다음 특징을 가집니다.

- JavaScript 함수입니다.
- 이름이 대문자로 시작합니다.
- 화면에 표시할 JSX를 반환합니다.

## 2. 정의와 사용은 다르다

~~~jsx
function Logo() {
  return <strong>Mini Blog</strong>
}

function Header() {
  return (
    <header>
      <Logo />
    </header>
  )
}
~~~

`function Logo() { ... }`는 컴포넌트를 **정의**합니다. `<Logo />`는 정의한 컴포넌트를 **사용**합니다.

함수를 일반 함수처럼 `Logo()`로 실행하지 않고 JSX 태그 모양으로 사용합니다.

## 3. 작은 컴포넌트로 화면 조립하기

~~~jsx
function Header() {
  return <header>Mini Blog</header>
}

function MainContent() {
  return (
    <main>
      <h1>최근 게시글</h1>
      <p>아직 작성된 글이 없습니다.</p>
    </main>
  )
}

function Footer() {
  return <footer>React Mini Blog</footer>
}

function App() {
  return (
    <>
      <Header />
      <MainContent />
      <Footer />
    </>
  )
}
~~~

`App`은 전체 배치를 결정하고, 각 컴포넌트는 자기 영역을 표현합니다.

## 4. 컴포넌트를 나누는 기준

다음과 같은 경우 컴포넌트 분리를 생각할 수 있습니다.

- 같은 화면 조각을 여러 번 사용합니다.
- 한 부분에 분명한 이름과 역할이 있습니다.
- 파일이 너무 길어져 특정 영역을 찾기 어렵습니다.
- 한 부분만 따로 이해하거나 수정하고 싶습니다.

반대로 한 줄짜리 요소를 전부 컴포넌트로 만들 필요는 없습니다.

~~~jsx
// 꼭 이렇게까지 나눌 필요는 없음
function Paragraph() {
  return <p>설명입니다.</p>
}
~~~

`Header`, `Footer`, `PostCard`, `HomePage`처럼 역할이 분명한 단위로 나눕니다.

## 5. 반복되는 화면을 컴포넌트로 만들기

컴포넌트를 사용하지 않으면 같은 구조를 여러 번 적게 됩니다.

~~~jsx
function PostsPage() {
  return (
    <main>
      <article>
        <h2>첫 글</h2>
        <p>첫 번째 내용</p>
      </article>
      <article>
        <h2>두 번째 글</h2>
        <p>두 번째 내용</p>
      </article>
    </main>
  )
}
~~~

공통 구조를 `PostCard`로 만들 수 있습니다.

~~~jsx
function PostCard({ title, content }) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{content}</p>
    </article>
  )
}

function PostsPage() {
  return (
    <main>
      <PostCard title="첫 글" content="첫 번째 내용" />
      <PostCard title="두 번째 글" content="두 번째 내용" />
    </main>
  )
}
~~~

컴포넌트는 같지만 전달하는 데이터가 달라 서로 다른 글이 보입니다. 데이터는 props로 전달합니다.

## 6. 컴포넌트를 파일로 분리하기

~~~jsx
// src/components/Header.jsx
function Header() {
  return <header>Mini Blog</header>
}

export default Header
~~~

~~~jsx
// src/App.jsx
import Header from './components/Header.jsx'

function App() {
  return (
    <>
      <Header />
      <main>본문</main>
    </>
  )
}

export default App
~~~

파일을 나누어도 컴포넌트의 동작은 같습니다. `export`하고 `import`하는 연결이 추가될 뿐입니다.

## 7. 페이지도 컴포넌트

~~~jsx
function HomePage() {
  return (
    <main>
      <h1>Home</h1>
      <p>미니 블로그 홈입니다.</p>
    </main>
  )
}
~~~

React에서 페이지 역시 컴포넌트입니다. 이 프로젝트에서는 화면 전체에 가까운 컴포넌트는 `pages/`, 여러 화면에서 사용할 작은 조각은 `components/`에 둡니다.

~~~text
src/
├── components/
│   ├── Header.jsx
│   └── PostCard.jsx
├── pages/
│   ├── HomePage.jsx
│   └── PostsPage.jsx
├── App.jsx
└── main.jsx
~~~

폴더 이름은 React의 강제 규칙이 아니라 프로젝트를 읽기 쉽게 만들기 위한 약속입니다.

## 8. 컴포넌트는 같은 입력에 같은 화면을 반환하기

컴포넌트가 렌더링되는 중에는 외부 값을 직접 바꾸지 않는 것이 기본입니다.

~~~jsx
let count = 0

function BadCounter() {
  count = count + 1
  return <p>{count}</p>
}
~~~

위 코드는 컴포넌트를 읽는 것만으로 외부 `count`를 바꿉니다. 화면을 예측하기 어렵게 만듭니다. 화면을 바꿔야 할 때는 뒤에서 배울 state와 이벤트를 사용합니다.

## 코드 읽기 연습

~~~jsx
function PageTitle() {
  return <h1>About</h1>
}

function AboutPage() {
  return (
    <main>
      <PageTitle />
      <p>React를 연습하는 블로그입니다.</p>
    </main>
  )
}
~~~

- `PageTitle`을 정의한 곳과 사용한 곳은 어디인가요?
- 화면에는 어떤 순서로 내용이 보이나요?
- `AboutPage`는 HTML 요소인가요, React 컴포넌트인가요?

## 흔한 실수

- 컴포넌트 이름을 소문자로 시작합니다.
- JSX를 반환하지 않습니다.
- 파일로 나눈 컴포넌트를 export 또는 import하지 않습니다.
- 컴포넌트를 너무 작게 많이 나누어 오히려 흐름을 찾기 어렵게 만듭니다.
- 컴포넌트 함수 안에서 렌더링과 관계없는 외부 값을 직접 바꿉니다.

## 확인 문제

1. React 컴포넌트 이름은 어떤 문자로 시작해야 하나요?
2. 컴포넌트를 정의하는 것과 사용하는 것은 코드 모양이 어떻게 다른가요?
3. 이 프로젝트에서 `pages/`와 `components/`는 각각 어떤 파일을 두나요?

### 정답 확인

1. 대문자로 시작해야 합니다.
2. 정의할 때는 함수로 만들고, 사용할 때는 `<Header />` 같은 JSX 태그 모양으로 적습니다.
3. `pages/`에는 화면 전체에 가까운 페이지 컴포넌트, `components/`에는 재사용할 작은 화면 조각을 둡니다.
