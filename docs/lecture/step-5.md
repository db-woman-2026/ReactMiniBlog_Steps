# Step 5. 배열과 목록 렌더링

## 이번 단계에서 할 일

- 게시글 배열을 만들고 `map`으로 목록을 렌더링합니다.
- 여러 게시글을 같은 PostCard 모양으로 출력합니다.
- 목록 렌더링에서 key가 필요한 이유를 확인합니다.

## 시작 전 확인

개인 저장소의 `main`에 Step 4 결과를 commit하고 GitHub에 push한 상태로 시작합니다.

Windows Terminal의 PowerShell에서 개인 프로젝트 폴더로 이동하고 현재 상태를 확인합니다.

~~~powershell
Set-Location "$HOME\dongbu\react-mini-blog"
git status
~~~

`main`에 있고 아직 저장하지 않은 변경 파일이 없어야 합니다. 각 코드 블록 위의 파일 경로를 확인한 뒤 해당 파일의 전체 내용을 직접 입력합니다.

## 작업 1. 게시글 데이터를 배열로 바꾸기

게시글 하나만 있던 데이터를 여러 게시글이 들어 있는 배열로 바꿉니다. 각 게시글에는 나중에 상세 페이지에서 사용할 `id`와 `content`도 함께 둡니다.

### 수정할 파일

- 수정: `src/data/posts.js`

### 입력할 코드

#### `src/data/posts.js`

`src/data/posts.js`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~js
export const posts = [
  {
    id: '1',
    title: 'Getting Started with React',
    excerpt: 'React lets us build a screen by combining small components.',
    content:
      'React components are JavaScript functions that return JSX. A page can be built by combining small components together.',
    author: 'Mini Blog Team',
  },
  {
    id: '2',
    title: 'Why Props Matter',
    excerpt: 'Props let a parent component pass data to a child component.',
    content:
      'Props are useful because the same component can show different data. This keeps our UI reusable and easier to read.',
    author: 'Mini Blog Team',
  },
  {
    id: '3',
    title: 'Rendering Lists',
    excerpt: 'The map method turns an array of data into an array of elements.',
    content:
      'Most apps show lists: posts, products, messages, or comments. React uses arrays and map to render those lists.',
    author: 'Mini Blog Team',
  },
]
~~~

### 설명과 확인

- 배열은 여러 개의 비슷한 데이터를 한 곳에 모을 때 사용합니다.
- `id`는 목록에서 각 게시글을 구분하는 값입니다.

## 작업 2. map으로 목록 출력하기

`posts.map(...)`을 사용해 배열의 각 게시글을 `PostCard`로 바꿉니다. 같은 컴포넌트가 여러 데이터에 반복 적용됩니다.

### 수정할 파일

- 수정: `src/pages/PostsPage.jsx`

### 입력할 코드

#### `src/pages/PostsPage.jsx`

`src/pages/PostsPage.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
import PostCard from '../components/PostCard'
import { posts } from '../data/posts'

function PostsPage() {
  return (
    <main>
      <h1>Posts</h1>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          excerpt={post.excerpt}
          author={post.author}
        />
      ))}
    </main>
  )
}

export default PostsPage
~~~

### 설명과 확인

- `map`은 배열의 각 항목을 다른 값으로 바꿔 새 배열을 만듭니다.
- React 목록에는 각 항목을 구분할 `key`가 필요합니다.

## 완료 결과 및 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. npm 명령은 `npm.cmd`로 실행합니다.

~~~powershell
npm.cmd run lint
npm.cmd run build
~~~

Posts 화면에 서로 다른 제목을 가진 카드 세 개가 배열 순서대로 보이는지 확인합니다.

## 독립 확인

게시글 객체 하나를 추가하고 `key`가 중복되지 않는지 확인합니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험을 위해 바꾼 값은 다음 단계 전에 복구합니다.

## GitHub에 저장하기

독립 확인에서 잠시 바꾼 코드를 원래대로 돌린 뒤 현재 파일 상태를 확인합니다. 검사와 화면 확인이 끝났다면 이번 단계의 결과를 하나의 commit으로 저장합니다.

```powershell
git status
git add .
git commit -m "Step 5: Render the post list"
git push
git status
```

마지막 `git status`에서 저장하지 않은 변경 파일이 없어야 합니다. GitHub의 개인 저장소를 열어 `main`에 이번 Step의 commit이 보이는지도 확인합니다.
