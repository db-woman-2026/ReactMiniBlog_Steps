# Step 10. 검증과 조건부 렌더링

## 이번 스텝 주요 기능 Overview

- 새 글 작성 form에 간단한 검증을 추가합니다.
- 빈 제목이나 빈 내용을 제출하지 못하게 합니다.
- 조건부 렌더링으로 오류 메시지를 보여줍니다.

## 작업 1. 빈 입력 검증하기

제목이나 내용이 비어 있으면 게시글을 만들지 않고 오류 메시지를 보여줍니다. 사용자가 다시 입력을 시작하면 오류 메시지는 사라집니다.

### 직접 수정할 파일

- 수정: [src/pages/NewPostPage.jsx](../../src/pages/NewPostPage.jsx)
- 수정: [src/index.css](../../src/index.css)

### 이전 단계와 달라지는 코드

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

### 설명/확인 포인트

- `trim()`은 앞뒤 공백을 제거합니다.
- `error && ...`는 error 값이 있을 때만 메시지를 보여주는 조건부 렌더링입니다.
- 검증을 통과한 값만 `onCreate`로 전달합니다.

## 실행 확인

~~~bash
npm run dev
~~~

브라우저에서 이번 단계의 화면을 직접 눌러 확인합니다. 문제가 없으면 다음 step으로 넘어갑니다.
