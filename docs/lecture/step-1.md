# Step 1. 파일 구조와 첫 JSX 화면

## 변경 내용

- 기본 Vite 예제 화면을 미니 블로그 첫 화면으로 바꿉니다.
- 복잡한 기본 스타일과 예제 자산을 제거합니다.
- JSX가 화면에 어떻게 보이는지 확인합니다.

## 시작 전 확인

환경 준비에서 만든 개인 프로젝트를 처음 commit하고 GitHub에 push한 상태로 시작합니다.

이 저장소의 `step-N` 브랜치는 기준 코드 스냅샷입니다. 개인 프로젝트에서는 브랜치를 바꾸지 않고 자신의 저장소 `main`에서 작업합니다.

Windows Terminal의 PowerShell에서 개인 프로젝트 폴더로 이동하고 현재 상태를 확인합니다.

~~~powershell
Set-Location "$HOME\dongbu\react-mini-blog"
git status
~~~

`main`에 있고 아직 저장하지 않은 변경 파일이 없어야 합니다. 각 코드 블록 위의 파일 경로를 확인한 뒤 해당 파일의 전체 내용을 직접 입력합니다.

## 작업 1. 기본 예제 화면 정리

Vite가 만든 예제 화면은 로고, 버튼, 외부 링크가 많습니다. 첫 실습에서는 화면을 읽기 쉬운 미니 블로그 소개 화면으로 단순화합니다.

### 수정할 파일

- 수정: `index.html`
- 수정: `src/App.jsx`
- 수정: `src/index.css`
- 삭제: `src/App.css`
- 삭제: `src/assets/`
- 삭제: `public/icons.svg`

### 먼저 실행

~~~powershell
Remove-Item src/App.css -Force
Remove-Item src/assets -Recurse -Force
Remove-Item public/icons.svg -Force
~~~

### 입력할 코드

#### `index.html`

`index.html`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css" />
    <title>React Mini Blog</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
~~~

#### `src/App.jsx`

`src/App.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
function App() {
  return (
    <main>
      <h1>React Mini Blog</h1>
      <p>
        This project practices React fundamentals before moving to the Next.js
        blog project.
      </p>
      <p>
        In the first step, focus on reading JSX and changing text on the
        screen.
      </p>
    </main>
  )
}

export default App
~~~

#### `src/index.css`

`src/index.css`의 기존 내용을 모두 지우고 빈 파일로 둡니다. Simple.css가 기본 화면 스타일을 담당합니다.

### 설명과 확인

- `App.jsx`는 화면에 보일 JSX를 반환합니다.
- `index.html`에서 Simple.css를 불러오므로 별도의 CSS를 작성하지 않아도 기본 화면 모양이 갖춰집니다.
- `index.css`는 Step 8에서 입력창 높이를 지정하기 전까지 빈 파일로 둡니다.
- 삭제하는 파일과 폴더는 기본 예제 화면에서만 쓰던 자산입니다.

## 완료 결과 및 실행 확인

~~~powershell
npm.cmd run lint
npm.cmd run build
~~~

lint와 build가 통과해야 합니다. 브라우저에는 `React Mini Blog` 제목과 두 설명 문단이 보여야 하며, Vite 로고와 counter는 더 이상 보이지 않아야 합니다. Vite가 5173이 아닌 다른 포트를 표시하면 터미널의 실제 `Local` 주소를 엽니다.

## 독립 확인

홈 설명 문장 하나를 본인 학습 목표로 바꾸고 복구합니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험을 위해 바꾼 값은 다음 단계 전에 복구합니다.

## GitHub에 저장하기

독립 확인에서 잠시 바꾼 코드를 원래대로 돌린 뒤 현재 파일 상태를 확인합니다. 검사와 화면 확인이 끝났다면 이번 단계의 결과를 하나의 commit으로 저장합니다.

```powershell
git status
git add .
git commit -m "Step 1: Create the first JSX screen"
git push
git status
```

마지막 `git status`에서 저장하지 않은 변경 파일이 없어야 합니다. GitHub의 개인 저장소를 열어 `main`에 이번 Step의 commit이 보이는지도 확인합니다.
