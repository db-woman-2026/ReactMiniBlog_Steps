# Chapter 1. React와 프로젝트 구조

## 배울 내용

- 브라우저, HTML, JavaScript, React의 역할을 구분합니다.
- Vite 프로젝트의 주요 파일을 알아봅니다.
- `main.jsx`에서 `App.jsx`까지 이어지는 흐름을 읽습니다.

## 먼저 알아둘 용어

| 용어 | 쉬운 뜻 |
| --- | --- |
| 브라우저 | Chrome처럼 웹 페이지를 보여 주고 JavaScript를 실행하는 프로그램 |
| HTML | 제목, 문단, 버튼처럼 화면의 구조를 적는 언어 |
| DOM | 브라우저가 HTML을 읽어 만든 화면 요소의 구조 |
| JavaScript | 값을 계산하고 클릭 같은 동작을 처리하는 언어 |
| React | 데이터로 화면을 만들고 다시 그리기 쉽게 도와주는 라이브러리 |
| Vite | React 프로젝트를 실행하고 빌드하는 개발 도구 |
| 컴포넌트 | 화면 일부를 표현하는 JavaScript 함수 |
| 렌더링 | React가 컴포넌트의 결과를 화면에 표시하는 과정 |

## 1. HTML만 사용한 화면

HTML은 화면에 무엇이 있는지 직접 적습니다.

~~~html
<main>
  <h1>Mini Blog</h1>
  <p>첫 번째 게시글입니다.</p>
  <button>좋아요</button>
</main>
~~~

제목 하나, 문단 하나, 버튼 하나가 순서대로 보입니다. 내용이 항상 같다면 이것만으로도 충분합니다.

## 2. React로 표현한 같은 화면

React에서는 화면을 반환하는 함수를 만듭니다. 이런 함수를 **컴포넌트**라고 부릅니다.

~~~jsx
function App() {
  return (
    <main>
      <h1>Mini Blog</h1>
      <p>첫 번째 게시글입니다.</p>
      <button>좋아요</button>
    </main>
  )
}
~~~

HTML처럼 보이는 부분은 `JSX`입니다. 지금은 "컴포넌트 함수가 화면 모양을 반환한다"고 이해하면 충분합니다.

## 3. 프로젝트의 주요 파일

Vite React 프로젝트는 다음과 같은 구조로 시작합니다.

~~~text
ReactMiniBlog_Steps/
├── index.html
├── package.json
├── public/
└── src/
    ├── main.jsx
    ├── App.jsx
    └── index.css
~~~

- `index.html`: 브라우저가 처음 여는 HTML 문서입니다.
- `package.json`: 프로젝트 이름, 설치한 패키지, 실행 명령을 기록합니다.
- `public/`: JSON이나 이미지처럼 주소로 바로 읽을 정적 파일을 둡니다.
- `src/`: 우리가 작성하는 React 코드를 둡니다.
- `main.jsx`: React 앱의 시작점입니다.
- `App.jsx`: 가장 위에서 화면을 조립하는 컴포넌트입니다.
- `index.css`: 전체 화면에 적용할 최소한의 스타일입니다.

## 4. `index.html`의 root

브라우저가 처음 읽는 `index.html`에는 React가 들어갈 빈 요소가 있습니다.

~~~html
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
~~~

`id="root"`는 이 요소의 이름표입니다. 아래의 `<script>`가 `main.jsx`를 실행합니다.

## 5. `main.jsx`가 App을 화면에 붙이는 과정

~~~jsx
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const rootElement = document.getElementById('root')

createRoot(rootElement).render(<App />)
~~~

코드를 위에서 아래로 읽어 봅니다.

1. React 화면을 브라우저에 붙이는 `createRoot`를 가져옵니다.
2. 다른 파일에서 `App` 컴포넌트를 가져옵니다.
3. HTML의 `root` 요소를 찾습니다.
4. `<App />`이 만든 화면을 `root` 안에 렌더링합니다.

실제 프로젝트에는 개발 중 실수를 더 잘 찾기 위한 `StrictMode`도 있습니다.

~~~jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
~~~

`StrictMode`는 화면에 보이는 태그가 아니라 개발을 돕는 React 도구입니다.

## 6. 파일이 연결되는 방향

~~~text
index.html
  -> src/main.jsx
      -> src/App.jsx
          -> 여러 페이지와 컴포넌트
~~~

문제가 생겼을 때 이 방향으로 파일을 따라가면 화면이 어디서 시작되는지 찾기 쉽습니다.

## 7. 개발 명령의 의미

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. 이 강의의 터미널 명령은 PowerShell 기준이며, npm은 실행 정책과 관계없이 동작하는 `npm.cmd`를 사용합니다.

~~~powershell
npm.cmd ci
npm.cmd run dev
npm.cmd run build
~~~

- `npm.cmd ci`: `package-lock.json`에 기록된 버전 그대로 패키지를 설치합니다.
- `npm.cmd run dev`: 개발 서버를 실행합니다. 파일을 저장하면 브라우저가 빠르게 갱신됩니다.
- `npm.cmd run build`: 배포할 수 있는 결과물을 만들 수 있는지 확인합니다.

## 코드 읽기 연습

~~~jsx
function Welcome() {
  return <h1>Welcome to React</h1>
}

function App() {
  return (
    <main>
      <Welcome />
      <p>프로젝트 구조를 확인합니다.</p>
    </main>
  )
}
~~~

- `Welcome`은 어떤 화면을 반환하나요?
- `App` 안에서 `Welcome`은 어떤 모양으로 사용되나요?
- 브라우저에는 제목과 문단 중 무엇이 먼저 보이나요?

## 흔한 실수

- `App.jsx`를 만들기만 하고 `main.jsx`에서 가져오지 않습니다.
- `document.getElementById('root')`의 이름과 HTML의 `id`가 다릅니다.
- 컴포넌트 이름을 소문자로 시작합니다. React 컴포넌트 이름은 대문자로 시작합니다.
- 개발 서버가 실행 중이지 않은데 파일만 저장하고 화면 변화를 기다립니다.

## 확인 문제

1. React 앱의 시작점 역할을 하는 파일은 무엇인가요?
2. 컴포넌트는 아주 쉽게 말하면 무엇인가요?
3. `render(<App />)`는 어떤 일을 하나요?

### 정답 확인

1. 이 프로젝트에서는 `src/main.jsx`입니다.
2. 화면 일부를 반환하는 JavaScript 함수입니다.
3. `App` 컴포넌트가 만든 화면을 브라우저의 `root` 요소 안에 표시합니다.
