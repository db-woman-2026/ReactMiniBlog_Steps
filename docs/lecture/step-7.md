# Step 7. 이벤트와 State

## 이번 단계에서 할 일

- 상세 화면에 좋아요 버튼을 추가합니다.
- 버튼 클릭 이벤트를 처리합니다.
- `useState`로 화면의 숫자가 바뀌는 흐름을 확인합니다.

## 시작 전 확인

개인 저장소의 `main`에 Step 6 결과를 commit하고 GitHub에 push한 상태로 시작합니다.

Windows Terminal의 PowerShell에서 개인 프로젝트 폴더로 이동하고 현재 상태를 확인합니다.

~~~powershell
Set-Location "$HOME\dongbu\react-mini-blog"
git status
~~~

`main`에 있고 아직 저장하지 않은 변경 파일이 없어야 합니다. 각 코드 블록 위의 파일 경로를 확인한 뒤 해당 파일의 전체 내용을 직접 입력합니다.

## 작업 1. 좋아요 버튼으로 이벤트와 state 연습하기

상세 화면에 Like 버튼을 추가합니다. 버튼을 누르면 `likes` state가 증가하고 화면 숫자가 바뀝니다.

### 수정할 파일

- 수정: `src/pages/PostDetailPage.jsx`

### 입력할 코드

#### `src/pages/PostDetailPage.jsx`

`src/pages/PostDetailPage.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { posts } from '../data/posts'

function PostDetailPage() {
  const { postId } = useParams()
  const post = posts.find((item) => item.id === postId)
  const [likes, setLikes] = useState(0)

  if (!post) {
    return (
      <main>
        <h1>Post not found</h1>
        <p>No post matches this address.</p>
        <Link to="/posts">Back to posts</Link>
      </main>
    )
  }

  return (
    <main>
      <h1>{post.title}</h1>
      <p>Written by {post.author}</p>
      <p>{post.content}</p>
      <button
        type="button"
        onClick={() => setLikes((currentLikes) => currentLikes + 1)}
      >
        Like {likes}
      </button>
      <Link to="/posts">Back to posts</Link>
    </main>
  )
}

export default PostDetailPage
~~~

### 설명과 확인

- `useState(0)`은 처음 값을 0으로 둔 state를 만듭니다.
- `onClick`은 버튼 클릭 이벤트를 처리합니다.
- 다음 값이 이전 좋아요 수에 의존하므로 함수형 updater의 `currentLikes`를 사용합니다.
- state가 바뀌면 React가 화면을 다시 그립니다.

## 완료 결과 및 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. npm 명령은 `npm.cmd`로 실행합니다.

~~~powershell
npm.cmd run lint
npm.cmd run build
~~~

Like 버튼을 연속으로 눌렀을 때 표시 숫자가 누른 횟수만큼 증가하는지 확인합니다.

## 독립 확인

좋아요 버튼을 여러 번 눌러 이전 state를 기준으로 값이 바뀌는지 확인합니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험을 위해 바꾼 값은 다음 단계 전에 복구합니다.

## GitHub에 저장하기

독립 확인에서 잠시 바꾼 코드를 원래대로 돌린 뒤 현재 파일 상태를 확인합니다. 검사와 화면 확인이 끝났다면 이번 단계의 결과를 하나의 commit으로 저장합니다.

```powershell
git status
git add .
git commit -m "Step 7: Add like state"
git push
git status
```

마지막 `git status`에서 저장하지 않은 변경 파일이 없어야 합니다. GitHub의 개인 저장소를 열어 `main`에 이번 Step의 commit이 보이는지도 확인합니다.
