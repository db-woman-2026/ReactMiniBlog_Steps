# Step 10. 검증과 조건부 렌더링

## 이번 단계에서 할 일

- 새 글 작성 form에 간단한 검증을 추가합니다.
- 빈 제목이나 빈 내용을 제출하지 못하게 합니다.
- 조건부 렌더링으로 오류 메시지를 보여줍니다.

## 시작 전 확인

권장 시간은 40분입니다. 이 문서의 diff는 `step-9` 완료 코드에 적용합니다. `step-10` branch는 아래 변경이 이미 반영된 완성본입니다.

Windows Terminal의 PowerShell에서 시작 branch와 변경 상태를 확인합니다.

~~~powershell
Set-Location "$HOME\dongbu\ReactMiniBlog_Steps"
git switch step-9
git status --short
~~~

`git status --short`의 출력이 없어야 합니다. 변경이 남아 있다면 원인을 확인하고 시작 상태를 정리합니다.

## 작업 1. 빈 입력 검증하기

제목이나 내용이 비어 있으면 게시글을 만들지 않고 오류 메시지를 보여줍니다. 사용자가 다시 입력을 시작하면 오류 메시지는 사라집니다.

### 수정할 파일

- 수정: [src/pages/NewPostPage.jsx](../../src/pages/NewPostPage.jsx)
- 수정: [src/index.css](../../src/index.css)

### 코드 변경

아래 diff에서 `+`로 시작하는 줄은 추가하고, `-`로 시작하는 줄은 제거합니다. 새 파일은 diff에 보이는 전체 내용을 입력합니다.

~~~diff
diff --git a/src/index.css b/src/index.css
index c53f0c9..6a5464f 100644
--- a/src/index.css
+++ b/src/index.css
@@ -63,3 +63,7 @@ nav {
   padding: 16px;
   border: 1px solid #ddd;
 }
+
+.error-message {
+  color: #b00020;
+}
diff --git a/src/pages/NewPostPage.jsx b/src/pages/NewPostPage.jsx
index 9b53d8a..71f064a 100644
--- a/src/pages/NewPostPage.jsx
+++ b/src/pages/NewPostPage.jsx
@@ -4,14 +4,23 @@ import { useNavigate } from 'react-router-dom'
 function NewPostPage({ onCreate }) {
   const [title, setTitle] = useState('')
   const [content, setContent] = useState('')
+  const [error, setError] = useState('')
   const navigate = useNavigate()
 
   function handleSubmit(event) {
     event.preventDefault()
 
+    const trimmedTitle = title.trim()
+    const trimmedContent = content.trim()
+
+    if (!trimmedTitle || !trimmedContent) {
+      setError('Please enter both a title and content.')
+      return
+    }
+
     const newPost = onCreate({
-      title,
-      content,
+      title: trimmedTitle,
+      content: trimmedContent,
     })
 
     navigate(`/posts/${newPost.id}`)
@@ -21,18 +30,26 @@ function NewPostPage({ onCreate }) {
     <main>
       <h1>New Post</h1>
       <form onSubmit={handleSubmit}>
+        {error && <p className="error-message">{error}</p>}
+
         <label htmlFor="title">Title</label>
         <input
           id="title"
           value={title}
-          onChange={(event) => setTitle(event.target.value)}
+          onChange={(event) => {
+            setTitle(event.target.value)
+            setError('')
+          }}
         />
 
         <label htmlFor="content">Content</label>
         <textarea
           id="content"
           value={content}
-          onChange={(event) => setContent(event.target.value)}
+          onChange={(event) => {
+            setContent(event.target.value)
+            setError('')
+          }}
         />
 
         <button type="submit">Create Post</button>
~~~

### 설명과 확인

- `trim()`은 앞뒤 공백을 제거합니다.
- `error && ...`는 error 값이 있을 때만 메시지를 보여주는 조건부 렌더링입니다.
- 검증을 통과한 값만 `onCreate`로 전달합니다.

## 완료 결과 및 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. npm 명령은 `npm.cmd`로 실행합니다.

~~~powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
~~~

공백만 제출하면 오류 문구가 보이고, 제목과 내용을 입력하면 글이 만들어지는지 확인합니다.

## 독립 확인

공백만 입력한 경우와 정상 입력의 오류 메시지를 비교합니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험을 위해 바꾼 값은 다음 단계 전에 복구합니다.
