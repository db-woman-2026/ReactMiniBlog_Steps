# Chapter 10. 폼과 사용자 입력

## 배울 내용

- React state와 입력 요소의 값을 연결합니다.
- 입력 변경 이벤트에서 사용자가 입력한 값을 읽습니다.
- 폼 제출을 JavaScript 함수로 처리하고 빈 값을 검증합니다.

## 1. controlled input

~~~jsx
import { useState } from 'react'

function TitleInput() {
  const [title, setTitle] = useState('')

  function handleChange(event) {
    setTitle(event.target.value)
  }

  return (
    <section>
      <label htmlFor="title">제목</label>
      <input id="title" value={title} onChange={handleChange} />
      <p>입력한 제목: {title}</p>
    </section>
  )
}
~~~

입력 요소의 `value`가 React state와 연결된 형태를 **controlled input**이라고 합니다.

1. 처음 `title`은 빈 문자열입니다.
2. 사용자가 입력하면 `onChange`가 실행됩니다.
3. `event.target.value`에서 현재 문자열을 읽습니다.
4. `setTitle`이 state를 변경합니다.
5. 새 `title`이 input과 문단에 표시됩니다.

간단한 핸들러는 바로 적을 수도 있습니다.

~~~jsx
<input
  value={title}
  onChange={(event) => setTitle(event.target.value)}
/>
~~~

## 2. textarea와 select

~~~jsx
function ContentInput() {
  const [content, setContent] = useState('')

  return (
    <>
      <label htmlFor="content">내용</label>
      <textarea
        id="content"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
    </>
  )
}
~~~

React의 `textarea`도 `input`처럼 `value`와 `onChange`를 사용합니다.

~~~jsx
function CategorySelect() {
  const [category, setCategory] = useState('react')

  return (
    <select
      value={category}
      onChange={(event) => setCategory(event.target.value)}
    >
      <option value="react">React</option>
      <option value="javascript">JavaScript</option>
      <option value="nextjs">Next.js</option>
    </select>
  )
}
~~~

선택된 option의 `value`가 문자열 state에 저장됩니다.

## 3. 폼 제출 처리하기

~~~jsx
function NewPostForm() {
  const [title, setTitle] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    console.log(`작성할 제목: ${title}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">제목</label>
      <input
        id="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <button type="submit">작성</button>
    </form>
  )
}
~~~

`event.preventDefault()`는 브라우저의 기본 submit 동작인 페이지 이동 또는 새로고침을 막습니다.

제출 처리는 버튼의 `onClick`보다 form의 `onSubmit`에 연결합니다. 그러면 버튼 클릭뿐 아니라 입력 중 Enter를 눌러도 같은 함수가 실행됩니다.

## 4. 여러 입력값 관리하기

~~~jsx
function NewPostForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const postInput = {
      title,
      content,
    }

    console.log(postInput)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <button type="submit">작성</button>
    </form>
  )
}
~~~

초급 단계에서는 각 입력값을 별도 state로 두면 흐름이 분명합니다.

## 5. 공백을 제거하고 검증하기

~~~jsx
function handleSubmit(event) {
  event.preventDefault()

  const trimmedTitle = title.trim()
  const trimmedContent = content.trim()

  if (!trimmedTitle || !trimmedContent) {
    console.log('제목과 내용을 모두 입력해 주세요.')
    return
  }

  console.log({ title: trimmedTitle, content: trimmedContent })
}
~~~

`trim()`은 문자열 앞뒤 공백을 제거합니다. 공백만 입력한 경우도 빈 값으로 처리할 수 있습니다.

## 6. 오류 메시지를 화면에 표시하기

~~~jsx
function NewPostForm() {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!title.trim()) {
      setError('제목을 입력해 주세요.')
      return
    }

    setError('')
    console.log(title.trim())
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <input
        value={title}
        onChange={(event) => {
          setTitle(event.target.value)
          setError('')
        }}
      />
      <button type="submit">작성</button>
    </form>
  )
}
~~~

오류가 있을 때만 메시지를 보여 주고, 사용자가 다시 입력하면 오류를 비웁니다.

## 7. 제출 후 입력값 비우기

~~~js
function handleSubmit(event) {
  event.preventDefault()

  if (!title.trim()) {
    return
  }

  onCreate({ title: title.trim() })
  setTitle('')
}
~~~

state를 빈 문자열로 바꾸면 연결된 input의 `value`도 비워집니다.

## 코드 읽기 연습

~~~jsx
function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onSearch(keyword.trim())
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />
      <button type="submit">검색</button>
    </form>
  )
}
~~~

- 사용자가 입력한 문자열은 어느 state에 저장되나요?
- 페이지 새로고침을 막는 코드는 무엇인가요?
- 부모에게 검색어를 전달하는 코드는 무엇인가요?

## 흔한 실수

- `value`만 지정하고 `onChange`를 빠뜨려 입력할 수 없게 만듭니다.
- `event.target.value` 대신 존재하지 않는 값을 읽습니다.
- `event.preventDefault()`를 빠뜨려 제출할 때 페이지가 새로고침됩니다.
- submit 처리를 form이 아닌 버튼 클릭에만 연결합니다.
- 숫자 input의 값도 기본적으로 문자열이라는 점을 놓칩니다.

## 확인 문제

1. controlled input을 만들 때 주로 사용하는 두 props는 무엇인가요?
2. 입력 요소의 현재 문자열은 이벤트 객체의 어디에 있나요?
3. form의 기본 제출 동작을 막는 코드는 무엇인가요?
4. 문자열 앞뒤 공백을 제거하는 메서드는 무엇인가요?

### 정답 확인

1. `value`와 `onChange`입니다.
2. `event.target.value`에 있습니다.
3. `event.preventDefault()`입니다.
4. `trim()`입니다.
