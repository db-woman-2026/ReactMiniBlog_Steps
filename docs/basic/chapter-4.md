# Chapter 4. 함수와 모듈

## 확인할 내용

- 함수를 정의하고 실행하는 모양을 구분합니다.
- 매개변수와 반환값의 역할을 이해합니다.
- 콜백 함수와 화살표 함수의 기본 모양을 읽습니다.
- 파일 사이에서 `import`와 `export`로 코드를 연결합니다.

## 1. 함수는 반복해서 사용할 코드 묶음

~~~js
function sayHello() {
  console.log('안녕하세요')
}

sayHello()
sayHello()
~~~

- `function sayHello() { ... }`: 함수를 정의합니다.
- `sayHello()`: 정의한 함수를 실행합니다.

정의만 하면 함수 안의 코드는 아직 실행되지 않습니다.

## 2. 매개변수로 값 받기

~~~js
function greet(name) {
  console.log(`${name}님, 안녕하세요`)
}

greet('Mina')
greet('Joon')
~~~

`name`은 함수가 값을 받는 자리인 **매개변수**입니다. `'Mina'`와 `'Joon'`은 함수를 실행하며 실제로 전달한 **인자**입니다.

매개변수는 여러 개일 수 있습니다.

~~~js
function printPost(title, author) {
  console.log(`${title} / 작성자: ${author}`)
}

printPost('React 기초', 'Mina')
~~~

## 3. `return`으로 결과 돌려주기

~~~js
function makePostLabel(title, author) {
  return `${title} - ${author}`
}

const label = makePostLabel('JSX 배우기', 'Joon')
console.log(label) // JSX 배우기 - Joon
~~~

`console.log`는 값을 콘솔에 보여 주고, `return`은 값을 함수 밖으로 돌려줍니다. 둘은 역할이 다릅니다.

`return`을 만나면 함수 실행은 그 자리에서 끝납니다.

~~~js
function getPostMessage(post) {
  if (!post) {
    return '게시글이 없습니다.'
  }

  return post.title
}
~~~

## 4. 화살표 함수

짧은 함수를 다음과 같이 적을 수 있습니다.

~~~js
function add(a, b) {
  return a + b
}

const addWithArrow = (a, b) => {
  return a + b
}
~~~

본문이 하나의 표현식이면 중괄호와 `return`을 함께 생략할 수 있습니다.

~~~js
const add = (a, b) => a + b
const getTitle = (post) => post.title
~~~

객체를 바로 반환할 때는 소괄호로 감쌉니다.

~~~js
const makePost = (title) => ({
  id: String(Date.now()),
  title,
})
~~~

소괄호가 없으면 `{}`를 함수 본문으로 해석하므로 객체가 반환되지 않습니다.

## 5. 콜백 함수

다른 함수에 전달하는 함수를 **콜백 함수**라고 합니다.

~~~js
const numbers = [1, 2, 3]

const doubled = numbers.map((number) => number * 2)
~~~

`map`에 전달한 `(number) => number * 2`가 콜백 함수입니다. `map`이 각 항목마다 이 함수를 실행합니다.

이벤트에서도 콜백을 사용합니다.

~~~js
function handleClick() {
  console.log('버튼을 클릭했습니다.')
}

button.addEventListener('click', handleClick)
~~~

`handleClick`을 지금 실행하는 것이 아니라, 클릭되었을 때 실행하도록 함수 자체를 전달합니다.

## 6. 컴포넌트도 함수

~~~jsx
function Greeting() {
  return <h1>안녕하세요</h1>
}
~~~

일반 함수와 마찬가지로 이름, 매개변수, 반환값이 있습니다. 다만 React 컴포넌트는 이름을 대문자로 시작하고 JSX를 반환합니다.

~~~jsx
function PostTitle({ title }) {
  return <h2>{title}</h2>
}
~~~

여기서는 `props` 객체를 매개변수로 받고 구조 분해해 `title`을 꺼냅니다.

## 7. 파일에서 내보내고 가져오기

코드를 파일로 나누면 필요한 값을 `export`하고 다른 파일에서 `import`합니다.

### 기본 내보내기

~~~jsx
// Header.jsx
function Header() {
  return <header>Mini Blog</header>
}

export default Header
~~~

~~~jsx
// App.jsx
import Header from './Header.jsx'

function App() {
  return <Header />
}
~~~

`export default`는 한 파일에서 대표 값 하나를 내보낼 때 사용합니다. 가져오는 쪽에서 중괄호를 쓰지 않습니다.

### 이름 있는 내보내기

~~~js
// posts.js
export const initialPosts = []

export function findPost(posts, id) {
  return posts.find((post) => post.id === id)
}
~~~

~~~js
// App.jsx
import { findPost, initialPosts } from './posts.js'
~~~

이름 있는 export는 중괄호 안에 같은 이름을 적어 가져옵니다.

## 8. 경로 읽기

~~~js
import Header from './components/Header.jsx'
import PostCard from '../components/PostCard.jsx'
~~~

- `./`: 현재 파일이 있는 폴더에서 시작합니다.
- `../`: 현재 폴더의 한 단계 위에서 시작합니다.

패키지 이름으로 시작하면 설치한 패키지에서 가져옵니다.

~~~js
import { useState } from 'react'
~~~

## 코드 읽기 연습

~~~js
export function createExcerpt(content, maxLength) {
  return content.slice(0, maxLength)
}

const excerpt = createExcerpt('React 함수 연습입니다.', 8)
~~~

- 함수의 매개변수는 몇 개인가요?
- 함수는 어떤 값을 반환하나요?
- `excerpt`에는 어떤 값이 들어가나요?

## 흔한 실수

- 함수를 전달해야 하는 곳에서 `handleClick()`처럼 바로 실행합니다.
- 함수에서 값을 만들었지만 `return`하지 않습니다.
- `export default` 값을 가져오면서 중괄호를 사용합니다.
- 이름 있는 export를 가져오면서 중괄호를 빠뜨립니다.
- `./`와 `../`를 반대로 사용합니다.

## 확인 문제

1. 함수가 계산한 값을 밖으로 돌려주는 키워드는 무엇인가요?
2. `posts.map((post) => post.title)`에서 콜백 함수는 어느 부분인가요?
3. `export const posts = []`를 다른 파일에서 가져오는 코드를 적어 보세요.

### 정답 확인

1. `return`입니다.
2. `(post) => post.title`입니다.
3. `import { posts } from './파일경로'`처럼 중괄호를 사용합니다.
