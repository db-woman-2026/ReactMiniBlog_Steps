# Step 4. Props로 게시글 카드 만들기

## 이번 단계에서 할 일

- PostCard 컴포넌트에 게시글 데이터를 props로 전달합니다.
- 데이터와 화면 컴포넌트를 분리합니다.
- 같은 컴포넌트가 다른 데이터를 보여줄 준비를 합니다.

## 시작 전 확인

권장 시간은 40분입니다. 개인 저장소의 `main`에 Step 3 결과를 commit하고 GitHub에 push한 상태로 시작합니다.

Windows Terminal의 PowerShell에서 개인 프로젝트 폴더로 이동하고 현재 상태를 확인합니다.

~~~powershell
Set-Location "$HOME\dongbu\react-mini-blog"
git status
~~~

`main`에 있고 아직 저장하지 않은 변경 파일이 없어야 합니다. 각 코드 블록 위의 파일 경로를 확인한 뒤 해당 파일의 전체 내용을 직접 입력합니다.

## 작업 1. PostCard에 props 전달하기

게시글 카드 모양을 `PostCard` 컴포넌트로 만들고, 제목/요약/작성자 값을 props로 전달합니다. 아직 목록 반복은 하지 않고 게시글 하나만 보여줍니다.

### 수정할 파일

- 새 파일: `src/components/PostCard.jsx`
- 새 파일: `src/data/posts.js`
- 수정: `src/pages/PostsPage.jsx`

### 입력할 코드

#### `src/components/PostCard.jsx`

`src/components/PostCard.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
function PostCard({ title, excerpt, author }) {
  return (
    <article className="post-card">
      <h2>{title}</h2>
      <p>{excerpt}</p>
      <p>Written by {author}</p>
    </article>
  )
}

export default PostCard
~~~

#### `src/data/posts.js`

`src/data/posts.js`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~js
export const featuredPost = {
  title: 'Getting Started with React',
  excerpt: 'React lets us build a screen by combining small components.',
  author: 'Mini Blog Team',
}
~~~

#### `src/pages/PostsPage.jsx`

`src/pages/PostsPage.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
import PostCard from '../components/PostCard'
import { featuredPost } from '../data/posts'

function PostsPage() {
  return (
    <main>
      <h1>Posts</h1>
      <PostCard
        title={featuredPost.title}
        excerpt={featuredPost.excerpt}
        author={featuredPost.author}
      />
    </main>
  )
}

export default PostsPage
~~~

### 설명과 확인

- props는 부모가 자식 컴포넌트에 넘겨주는 값입니다.
- `PostCard`는 데이터를 직접 만들지 않고 받은 값을 화면에 보여줍니다.
- 데이터 파일을 따로 두면 화면 코드와 샘플 데이터를 구분해서 볼 수 있습니다.

## 완료 결과 및 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. npm 명령은 `npm.cmd`로 실행합니다.

~~~powershell
npm.cmd run lint
npm.cmd run build
~~~

Posts 화면에 제목, 요약, 작성자가 들어 있는 게시글 카드 하나가 보이는지 확인합니다.

## 독립 확인

서로 다른 author 값을 전달한 두 `PostCard`의 출력 차이를 확인합니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험을 위해 바꾼 값은 다음 단계 전에 복구합니다.

## GitHub에 저장하기

독립 확인에서 잠시 바꾼 코드를 원래대로 돌린 뒤 현재 파일 상태를 확인합니다. 검사와 화면 확인이 끝났다면 이번 단계의 결과를 하나의 commit으로 저장합니다.

```powershell
git status
git add .
git commit -m "Step 4: Build a post card with props"
git push
git status
```

마지막 `git status`에서 저장하지 않은 변경 파일이 없어야 합니다. GitHub의 개인 저장소를 열어 `main`에 이번 Step의 commit이 보이는지도 확인합니다.
