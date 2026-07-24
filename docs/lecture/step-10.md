# Step 10. 검증과 조건부 렌더링

## 변경 내용

- 새 글 작성 form에 간단한 검증을 추가합니다.
- 빈 제목이나 빈 내용을 제출하지 못하게 합니다.
- 조건부 렌더링으로 오류 메시지를 보여줍니다.

## 시작 전 확인

개인 저장소의 `main`에 Step 9 결과를 commit하고 GitHub에 push한 상태로 시작합니다.

Windows Terminal의 PowerShell에서 개인 프로젝트 폴더로 이동하고 현재 상태를 확인합니다.

~~~powershell
Set-Location "$HOME\dongbu\react-mini-blog"
git status
~~~

`main`에 있고 아직 저장하지 않은 변경 파일이 없어야 합니다. 각 코드 블록 위의 파일 경로를 확인한 뒤 해당 파일의 전체 내용을 직접 입력합니다.

## 작업 1. 빈 입력 검증하기

제목이나 내용이 비어 있으면 게시글을 만들지 않고 오류 메시지를 보여줍니다. 사용자가 다시 입력을 시작하면 오류 메시지는 사라집니다.

### 수정할 파일

- 수정: `src/pages/NewPostPage.jsx`
- 수정: `src/index.css`

### 입력할 코드

#### `src/index.css`

`src/index.css`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~css
textarea {
  height: 140px;
}

.error-message {
  color: #b00020;
}
~~~

#### `src/pages/NewPostPage.jsx`

`src/pages/NewPostPage.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NewPostPage({ onCreate }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()

    if (!trimmedTitle || !trimmedContent) {
      setError('Please enter both a title and content.')
      return
    }

    const newPost = onCreate({
      title: trimmedTitle,
      content: trimmedContent,
    })

    navigate(`/posts/${newPost.id}`)
  }

  return (
    <main>
      <h1>New Post</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
            setError('')
          }}
        />

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(event) => {
            setContent(event.target.value)
            setError('')
          }}
        />

        <button type="submit">Create Post</button>
      </form>

      <section>
        <h2>Preview</h2>
        <h3>{title || 'Untitled post'}</h3>
        <p>{content || 'Write something to preview the post content.'}</p>
      </section>
    </main>
  )
}

export default NewPostPage
~~~

### 설명과 확인

- `trim()`은 앞뒤 공백을 제거합니다.
- `error && ...`는 error 값이 있을 때만 메시지를 보여주는 조건부 렌더링입니다.
- 검증을 통과한 값만 `onCreate`로 전달합니다.

## 완료 결과 및 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md) <span class="print-reference" data-print-reference="true">(React · Windows 11 x64 개발 환경 준비 · 1. Windows Terminal 설치)</span>를 먼저 확인합니다.

~~~powershell
npm run lint
npm run build
~~~

공백만 제출하면 오류 문구가 보이고, 제목과 내용을 입력하면 글이 만들어지는지 확인합니다.

## 독립 확인

공백만 입력한 경우와 정상 입력의 오류 메시지를 비교합니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험값은 검사를 마치면 원래대로 복구합니다.

## GitHub에 저장하기

독립 확인에서 잠시 바꾼 코드를 원래대로 돌린 뒤 현재 파일 상태를 확인합니다. 검사와 화면 확인이 끝나면 현재 변경을 하나의 commit으로 저장합니다.

```powershell
git status
git add .
git commit -m "Step 10: Validate post input"
git push
git status
```

마지막 `git status`에서 저장하지 않은 변경 파일이 없어야 합니다. GitHub의 개인 저장소를 열어 `main`에 이번 Step의 commit이 보이는지도 확인합니다.
