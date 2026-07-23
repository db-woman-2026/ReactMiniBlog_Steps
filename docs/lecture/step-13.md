# Step 13. 게시글 검색

## 변경 내용

- 게시글 목록에 검색 입력창을 추가합니다.
- keyword state로 입력값을 관리합니다.
- `filter`로 제목과 내용에 검색어가 포함된 글만 보여줍니다.

## 시작 전 확인

개인 저장소의 `main`에 Step 12 결과를 commit하고 GitHub에 push한 상태로 시작합니다.

Windows Terminal의 PowerShell에서 개인 프로젝트 폴더로 이동하고 현재 상태를 확인합니다.

~~~powershell
Set-Location "$HOME\dongbu\react-mini-blog"
git status
~~~

`main`에 있고 아직 저장하지 않은 변경 파일이 없어야 합니다. 각 코드 블록 위의 파일 경로를 확인한 뒤 해당 파일의 전체 내용을 직접 입력합니다.

## 작업 1. keyword로 게시글 검색하기

검색어 입력값을 state로 관리하고, 제목 또는 내용에 검색어가 들어간 게시글만 화면에 보여줍니다.

### 수정할 파일

- 수정: `src/pages/PostsPage.jsx`

### 입력할 코드

#### `src/pages/PostsPage.jsx`

`src/pages/PostsPage.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
import { useState } from 'react'
import PostCard from '../components/PostCard'

function PostsPage({ posts }) {
  const [keyword, setKeyword] = useState('')
  const normalizedKeyword = keyword.trim().toLowerCase()
  const filteredPosts = posts.filter((post) => {
    const title = post.title.toLowerCase()
    const content = post.content.toLowerCase()

    return title.includes(normalizedKeyword) || content.includes(normalizedKeyword)
  })

  return (
    <main>
      <h1>Posts</h1>

      <label htmlFor="keyword">Search posts</label>
      <input
        id="keyword"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="Type a keyword"
      />

      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            excerpt={post.excerpt}
            author={post.author}
          />
        ))
      )}
    </main>
  )
}

export default PostsPage
~~~

### 설명과 확인

- 검색어는 `keyword` state에 저장됩니다.
- `toLowerCase()`를 사용해 대소문자 차이를 줄입니다.
- 검색 결과가 없을 때는 별도 안내 문구를 보여줍니다.

## 완료 결과 및 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. npm 명령은 `npm.cmd`로 실행합니다.

~~~powershell
npm.cmd run lint
npm.cmd run build
~~~

`React`와 `react`의 결과가 같은지 확인합니다. 없는 검색어에는 No posts found가 보이고 입력을 지우면 전체 목록이 돌아와야 합니다.

## 독립 확인

대문자와 소문자 검색어가 같은 결과를 내는지 확인합니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험값은 검사를 마치면 원래대로 복구합니다.

## GitHub에 저장하기

독립 확인에서 잠시 바꾼 코드를 원래대로 돌린 뒤 현재 파일 상태를 확인합니다. 검사와 화면 확인이 끝나면 현재 변경을 하나의 commit으로 저장합니다.

```powershell
git status
git add .
git commit -m "Step 13: Search posts"
git push
git status
```

마지막 `git status`에서 저장하지 않은 변경 파일이 없어야 합니다. GitHub의 개인 저장소를 열어 `main`에 이번 Step의 commit이 보이는지도 확인합니다.
