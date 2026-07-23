# Chapter 8. 이벤트와 state

## 확인할 내용

- 클릭과 입력 이벤트에 함수를 연결합니다.
- 일반 변수와 state의 차이를 이해합니다.
- `useState`로 화면에 기억할 값을 만들고 변경합니다.

## 1. 이벤트는 사용자가 일으킨 동작

버튼 클릭, 입력 칸 변경, 폼 제출은 모두 이벤트입니다.

~~~jsx
function LikeButton() {
  function handleClick() {
    console.log('좋아요 버튼을 클릭했습니다.')
  }

  return <button onClick={handleClick}>좋아요</button>
}
~~~

- `onClick`: 클릭 이벤트가 생겼을 때 실행할 함수를 받는 JSX 속성입니다.
- `handleClick`: 클릭을 처리하는 이벤트 핸들러 함수입니다.

## 2. 함수 전달과 함수 실행 구분하기

~~~jsx
// 클릭할 때 실행됨
<button onClick={handleClick}>좋아요</button>

// 렌더링 중 바로 실행됨: 원하는 동작이 아님
<button onClick={handleClick()}>좋아요</button>
~~~

React에는 함수의 실행 결과가 아니라 함수 자체를 전달합니다.

값을 함께 전달해야 하면 화살표 함수로 한 번 감쌉니다.

~~~jsx
<button onClick={() => handleDelete('post-1')}>삭제</button>
~~~

## 3. 일반 변수는 화면의 기억이 되지 못한다

~~~jsx
function Counter() {
  let count = 0

  function handleClick() {
    count = count + 1
    console.log(count)
  }

  return <button onClick={handleClick}>Count: {count}</button>
}
~~~

클릭할 때 콘솔의 값은 변할 수 있지만 React는 화면을 다시 그려야 한다는 사실을 모릅니다. 다시 렌더링하면 `count`는 다시 `0`에서 시작합니다.

화면에 기억하고 변화가 보이게 할 값은 state로 만듭니다.

## 4. `useState` 기본 모양

~~~jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
  }

  return <button onClick={handleClick}>Count: {count}</button>
}
~~~

코드를 나누어 읽어 봅니다.

~~~js
const [count, setCount] = useState(0)
~~~

- `0`: state의 처음 값입니다.
- `count`: 현재 값을 읽는 변수입니다.
- `setCount`: 다음 값으로 바꾸어 달라고 React에 요청하는 함수입니다.

`setCount`가 실행되면 React는 컴포넌트를 다시 렌더링하고 새 `count`를 화면에 보여 줍니다.

## 5. 문자열 state

~~~jsx
function GreetingButton() {
  const [message, setMessage] = useState('버튼을 눌러 주세요.')

  function handleClick() {
    setMessage('안녕하세요!')
  }

  return (
    <section>
      <p>{message}</p>
      <button onClick={handleClick}>인사하기</button>
    </section>
  )
}
~~~

state에는 숫자뿐 아니라 문자열, 불리언, 객체, 배열도 저장할 수 있습니다.

## 6. 불리언 state로 열고 닫기

~~~jsx
function Help() {
  const [isOpen, setIsOpen] = useState(false)

  function toggleHelp() {
    setIsOpen(!isOpen)
  }

  return (
    <section>
      <button onClick={toggleHelp}>도움말</button>
      {isOpen && <p>제목과 내용을 입력하세요.</p>}
    </section>
  )
}
~~~

`!isOpen`은 현재 불리언 값을 반대로 바꿉니다.

## 7. 이전 값을 기준으로 변경하기

다음 값이 현재 값에 의존한다면 함수 형태의 업데이트를 사용할 수 있습니다.

~~~jsx
function Counter() {
  const [count, setCount] = useState(0)

  function increase() {
    setCount((previousCount) => previousCount + 1)
  }

  return <button onClick={increase}>{count}</button>
}
~~~

`previousCount`에는 React가 가진 가장 최신 이전 값이 들어옵니다. 숫자 증가, 토글처럼 이전 값이 필요한 변경에 알맞습니다.

~~~jsx
setIsOpen((previousIsOpen) => !previousIsOpen)
~~~

## 8. state는 즉시 바뀌는 일반 변수가 아니다

~~~js
function handleClick() {
  setCount(count + 1)
  console.log(count)
}
~~~

`setCount` 바로 다음 줄의 `count`는 아직 이전 렌더링의 값일 수 있습니다. setter는 변수를 그 자리에서 직접 바꾸는 명령이 아니라 다음 렌더링을 요청하는 함수입니다.

## 9. 입력 이벤트 읽기

이벤트 핸들러는 이벤트 정보를 매개변수로 받을 수 있습니다.

~~~jsx
function SearchBox() {
  const [keyword, setKeyword] = useState('')

  function handleChange(event) {
    setKeyword(event.target.value)
  }

  return (
    <section>
      <input value={keyword} onChange={handleChange} />
      <p>검색어: {keyword}</p>
    </section>
  )
}
~~~

`event.target`은 이벤트가 발생한 입력 요소이고, `event.target.value`는 입력 칸의 현재 문자열입니다.

## 10. state는 컴포넌트마다 독립적

~~~jsx
function LikeButton() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount((value) => value + 1)}>
      좋아요 {count}
    </button>
  )
}

function App() {
  return (
    <>
      <LikeButton />
      <LikeButton />
    </>
  )
}
~~~

두 `LikeButton`은 같은 컴포넌트를 사용하지만 각자 별도의 `count`를 가집니다.

## 11. Hook의 기본 규칙

`useState`처럼 `use`로 시작하는 React 함수를 Hook이라고 합니다.

~~~jsx
function Counter() {
  const [count, setCount] = useState(0)
  // ...
}
~~~

다음 두 가지를 확인합니다.

- Hook은 React 컴포넌트의 가장 바깥쪽에서 호출합니다.
- `if`, 반복문, 이벤트 핸들러 안에서 `useState`를 호출하지 않습니다.

~~~jsx
// 잘못된 예
if (isOpen) {
  const [count, setCount] = useState(0)
}
~~~

## 코드 읽기 연습

~~~jsx
function FollowButton() {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <button onClick={() => setIsFollowing((value) => !value)}>
      {isFollowing ? '팔로우 취소' : '팔로우'}
    </button>
  )
}
~~~

- 처음 보이는 버튼 글자는 무엇인가요?
- 한 번 클릭하면 state는 어떤 값이 되나요?
- 클릭 후 버튼 글자는 무엇으로 바뀌나요?

## 흔한 실수

- `onClick={handleClick()}`처럼 렌더링 중 함수를 실행합니다.
- state 값을 `count = count + 1`처럼 직접 대입합니다.
- setter 실행 직후 state가 일반 변수처럼 즉시 바뀌었다고 생각합니다.
- 조건문이나 이벤트 핸들러 안에서 `useState`를 호출합니다.
- 이벤트 속성을 HTML처럼 소문자로 `onclick`이라고 적습니다. JSX에서는 `onClick`입니다.

## 확인 문제

1. 화면에서 변화를 기억해야 하는 값은 일반 변수와 state 중 무엇으로 만드나요?
2. `const [name, setName] = useState('')`에서 처음 값은 무엇인가요?
3. 현재 state를 기준으로 다음 값을 계산할 때 어떤 업데이트 형태가 안전한가요?

### 정답 확인

1. state로 만듭니다.
2. 빈 문자열 `''`입니다.
3. `setCount((previousCount) => previousCount + 1)` 같은 함수 형태를 사용합니다.
