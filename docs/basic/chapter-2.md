# Chapter 2. JavaScript 값과 변수

## 배울 내용

- 문자열, 숫자, 불리언 같은 기본 값을 구분합니다.
- `const`와 `let`으로 값에 이름을 붙입니다.
- 연산자와 템플릿 문자열로 새 값을 만듭니다.

React 코드는 JavaScript입니다. JSX를 배우기 전에 화면에 넣을 데이터를 JavaScript로 표현하는 방법부터 확인합니다.

## 1. 값의 종류

~~~js
const title = 'React 시작하기' // 문자열 string
const viewCount = 120 // 숫자 number
const isPublished = true // 불리언 boolean
const selectedPost = null // 아직 선택된 값이 없음
let author // 값이 정해지지 않아 undefined
~~~

문자열은 작은따옴표 또는 큰따옴표로 감쌉니다. 숫자는 따옴표 없이 적습니다. `true`와 `false`는 참과 거짓을 나타냅니다.

~~~js
const postId = '3'
const postCount = 3

console.log(typeof postId) // string
console.log(typeof postCount) // number
~~~

`'3'`과 `3`은 눈에는 비슷하지만 종류가 다른 값입니다.

## 2. `const`와 `let`

변수는 값에 붙이는 이름입니다.

~~~js
const blogName = 'Mini Blog'
let likeCount = 0

likeCount = 1
~~~

- `const`: 같은 이름에 다른 값을 다시 대입하지 않을 때 사용합니다.
- `let`: 나중에 다른 값을 다시 대입해야 할 때 사용합니다.

기본적으로 `const`를 사용하고, 재대입이 필요할 때만 `let`을 사용합니다.

~~~js
const title = '첫 글'
title = '수정된 글' // 오류: const 변수에는 다시 대입할 수 없음
~~~

## 3. 값을 계산하는 표현식

표현식은 계산 결과로 하나의 값이 되는 코드입니다.

~~~js
const nextPage = 2 + 1
const isLongPost = 1500 > 1000
const fullTitle = 'React' + ' 기초'
~~~

결과는 각각 `3`, `true`, `'React 기초'`입니다.

자주 보는 연산자는 다음과 같습니다.

| 연산자 | 뜻 | 예제 결과 |
| --- | --- | --- |
| `+` | 더하기 또는 문자열 연결 | `2 + 3`은 `5` |
| `===` | 값과 종류가 같은지 비교 | `3 === 3`은 `true` |
| `!==` | 값 또는 종류가 다른지 비교 | `'1' !== 1`은 `true` |
| `>` | 왼쪽이 큰지 비교 | `5 > 2`는 `true` |
| `&&` | 두 조건이 모두 참인지 확인 | `true && false`는 `false` |
| `||` | 둘 중 하나라도 참인지 확인 | `true || false`는 `true` |
| `!` | 참과 거짓을 반대로 바꿈 | `!true`는 `false` |

## 4. 템플릿 문자열

백틱을 사용하면 문자열 안에 값을 넣기 쉽습니다.

~~~js
const author = 'Mina'
const title = 'JSX 읽기'
const message = `${author}님이 '${title}' 글을 작성했습니다.`

console.log(message)
// Mina님이 'JSX 읽기' 글을 작성했습니다.
~~~

`${...}` 안에는 변수뿐 아니라 표현식도 넣을 수 있습니다.

~~~js
const currentPage = 2
const label = `현재 페이지: ${currentPage + 1}`

console.log(label) // 현재 페이지: 3
~~~

## 5. 값을 비워 두는 두 가지 표현

~~~js
const selectedPost = null
let searchKeyword
~~~

- `null`: 개발자가 의도적으로 "값이 없음"을 넣은 상태입니다.
- `undefined`: 아직 값이 정해지지 않은 상태에서 자주 나타납니다.

React에서는 선택된 게시글이 아직 없거나 데이터를 아직 받지 못한 상태를 `null`로 표현할 수 있습니다.

## 6. 조건에 따라 값 고르기

삼항 연산자는 조건에 따라 두 값 중 하나를 고릅니다.

~~~js
const isLoggedIn = false
const buttonText = isLoggedIn ? '로그아웃' : '로그인'

console.log(buttonText) // 로그인
~~~

읽는 순서는 다음과 같습니다.

~~~text
조건 ? 조건이 참일 때의 값 : 조건이 거짓일 때의 값
~~~

## 7. React 코드에서 값 사용하기

JSX의 중괄호 안에는 JavaScript 값을 넣습니다.

~~~jsx
function PostSummary() {
  const title = 'React 기초'
  const viewCount = 25
  const isNew = true

  return (
    <article>
      <h2>{title}</h2>
      <p>조회수: {viewCount}</p>
      <p>{isNew ? '새 글' : '지난 글'}</p>
    </article>
  )
}
~~~

`{title}`과 `{viewCount}` 자리에 실제 값이 표시됩니다. 불리언 값 자체는 화면에 글자로 표시하지 않고, 보통 조건을 선택하는 데 사용합니다.

## 코드 읽기 연습

~~~js
const courseName = 'React Basic'
const currentChapter = 2
const totalChapters = 12
const isLastChapter = currentChapter === totalChapters
const progressText = `${currentChapter} / ${totalChapters}`
~~~

- `courseName`은 어떤 종류의 값인가요?
- `isLastChapter`의 값은 무엇인가요?
- `progressText`에는 어떤 문자열이 들어가나요?

## 흔한 실수

- 문자열에 따옴표를 빠뜨립니다.
- 비교할 때 `=`를 사용합니다. `=`는 대입이고, 같은지 비교할 때는 `===`를 사용합니다.
- 숫자와 숫자처럼 생긴 문자열을 같은 값으로 생각합니다.
- `const`로 선언한 변수에 새 값을 다시 대입합니다.
- 템플릿 문자열에 작은따옴표를 쓰고 `${...}`가 동작하기를 기대합니다. 템플릿 문자열에는 백틱을 사용합니다.

## 확인 문제

~~~js
const title = 'React'
const lesson = 2
const isComplete = lesson > 3
const label = `${title} ${lesson}강`
~~~

1. `title`, `lesson`, `isComplete`는 각각 어떤 종류의 값인가요?
2. `isComplete`의 값은 무엇인가요?
3. `label`의 값은 무엇인가요?

### 정답 확인

1. 문자열, 숫자, 불리언입니다.
2. `false`입니다.
3. `'React 2강'`입니다.
