# Chapter 3. 객체와 배열

## 배울 내용

- 객체 하나로 게시글 하나를 표현합니다.
- 배열 하나로 여러 게시글을 표현합니다.
- 구조 분해, 전개 문법, 배열 메서드의 모양에 익숙해집니다.

## 1. 객체: 관련 있는 값을 한 묶음으로 만들기

게시글에는 제목, 내용, 작성자처럼 서로 관련 있는 값이 있습니다. 객체는 이 값을 이름과 함께 묶습니다.

~~~js
const post = {
  id: '1',
  title: 'React 시작하기',
  author: 'Mina',
  published: true,
}
~~~

객체 안의 `id`, `title`, `author`, `published`를 **프로퍼티**라고 합니다.

~~~js
console.log(post.title) // React 시작하기
console.log(post.author) // Mina
~~~

점 뒤에 프로퍼티 이름을 적어 값을 읽습니다.

## 2. 객체의 값 바꾸어 읽기

~~~js
const post = {
  title: '첫 제목',
  author: 'Mina',
}

post.title = '수정된 제목'
~~~

`post` 변수 자체를 다른 객체로 재대입한 것은 아니므로 `const`여도 내부 프로퍼티는 바뀔 수 있습니다. 다만 React의 state를 다룰 때는 기존 객체를 직접 바꾸지 않습니다. 새 객체를 만드는 방법은 잠시 뒤 살펴봅니다.

## 3. 구조 분해 할당

객체에서 자주 쓸 값을 같은 이름의 변수로 꺼낼 수 있습니다.

~~~js
const post = {
  title: 'Props 이해하기',
  author: 'Joon',
}

const { title, author } = post

console.log(title) // Props 이해하기
console.log(author) // Joon
~~~

React 컴포넌트에서 props를 받을 때 매우 자주 보는 문법입니다.

## 4. 전개 문법으로 새 객체 만들기

`...`은 기존 객체의 프로퍼티를 펼쳐 새 객체에 복사합니다.

~~~js
const oldPost = {
  id: '1',
  title: '이전 제목',
  author: 'Mina',
}

const updatedPost = {
  ...oldPost,
  title: '새 제목',
}
~~~

`updatedPost`는 `id`와 `author`를 유지하고 `title`만 새 값으로 덮어씁니다. `oldPost`는 바뀌지 않습니다.

## 5. 배열: 여러 값을 순서대로 모으기

~~~js
const categories = ['React', 'JavaScript', 'Next.js']

console.log(categories[0]) // React
console.log(categories[1]) // JavaScript
console.log(categories.length) // 3
~~~

배열의 위치 번호는 `0`부터 시작합니다.

게시글 목록은 객체가 들어 있는 배열로 표현할 수 있습니다.

~~~js
const posts = [
  { id: '1', title: 'JSX 시작하기' },
  { id: '2', title: '컴포넌트 나누기' },
  { id: '3', title: 'props 전달하기' },
]

console.log(posts[1].title) // 컴포넌트 나누기
~~~

## 6. `map`: 각 항목을 다른 값으로 바꾸기

~~~js
const numbers = [1, 2, 3]
const doubledNumbers = numbers.map((number) => number * 2)

console.log(doubledNumbers) // [2, 4, 6]
~~~

`map`은 원래 배열의 항목마다 함수를 실행하고, 그 결과를 모아 새 배열을 만듭니다.

~~~js
const posts = [
  { id: '1', title: '첫 글' },
  { id: '2', title: '두 번째 글' },
]

const titles = posts.map((post) => post.title)

console.log(titles) // ['첫 글', '두 번째 글']
~~~

React에서는 문자열 대신 JSX를 반환해 목록 화면을 만듭니다.

~~~jsx
const postElements = posts.map((post) => (
  <li key={post.id}>{post.title}</li>
))
~~~

## 7. `find`: 조건에 맞는 항목 하나 찾기

~~~js
const posts = [
  { id: '1', title: '첫 글' },
  { id: '2', title: '두 번째 글' },
]

const foundPost = posts.find((post) => post.id === '2')

console.log(foundPost.title) // 두 번째 글
~~~

조건에 맞는 항목이 없으면 `undefined`가 됩니다. 상세 페이지에서 주소의 id와 같은 게시글을 찾을 때 사용할 수 있습니다.

## 8. `filter`: 조건에 맞는 항목만 남기기

~~~js
const numbers = [1, 2, 3, 4]
const evenNumbers = numbers.filter((number) => number % 2 === 0)

console.log(evenNumbers) // [2, 4]
~~~

게시글을 삭제할 때는 삭제할 id와 다른 항목만 남깁니다.

~~~js
const remainingPosts = posts.filter((post) => post.id !== '2')
~~~

원래 `posts` 배열은 그대로이고 새 배열이 만들어집니다.

## 9. 배열 전개 문법

~~~js
const oldPosts = [{ id: '1', title: '첫 글' }]
const newPost = { id: '2', title: '새 글' }

const postsAtEnd = [...oldPosts, newPost]
const postsAtStart = [newPost, ...oldPosts]
~~~

새 글을 뒤에 넣을지 앞에 넣을지에 따라 순서가 달라집니다.

## 코드 읽기 연습

~~~js
const posts = [
  { id: '1', title: 'React', published: true },
  { id: '2', title: 'CSS', published: false },
  { id: '3', title: 'JavaScript', published: true },
]

const publishedPosts = posts.filter((post) => post.published)
const titles = publishedPosts.map((post) => post.title)
~~~

- `publishedPosts`에는 객체가 몇 개 있나요?
- `titles`의 결과는 무엇인가요?
- 원래 `posts` 배열은 바뀌나요?

## 흔한 실수

- 배열의 첫 위치를 `1`로 생각합니다. 첫 위치는 `0`입니다.
- `post.title` 대신 존재하지 않는 `post.name`을 읽습니다.
- `map`, `filter`, `find`가 모두 같은 결과를 만든다고 생각합니다.
- 전개 문법에서 나중에 적은 프로퍼티가 앞의 값을 덮어쓴다는 점을 놓칩니다.

## 확인 문제

1. 게시글 하나는 객체와 배열 중 무엇으로 표현하기 좋은가요?
2. 게시글 여러 개는 무엇으로 표현하기 좋은가요?
3. 삭제할 id를 제외한 새 배열을 만들 때 어떤 메서드를 사용하나요?
4. 조건에 맞는 항목 하나를 찾을 때 어떤 메서드를 사용하나요?

### 정답 확인

1. 객체입니다.
2. 객체들이 들어 있는 배열입니다.
3. `filter`입니다.
4. `find`입니다.
