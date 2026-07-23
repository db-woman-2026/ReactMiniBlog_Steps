# Step 2. 컴포넌트 분리

## 이번 단계에서 할 일

- 화면을 Header, Footer, HomePage 컴포넌트로 나눕니다.
- 파일을 나누고 import/export로 연결합니다.
- App 컴포넌트는 전체 조립 역할만 맡게 합니다.

## 시작 전 확인

권장 시간은 45분입니다. 개인 저장소의 `main`에 Step 1 결과를 commit하고 GitHub에 push한 상태로 시작합니다.

Windows Terminal의 PowerShell에서 개인 프로젝트 폴더로 이동하고 현재 상태를 확인합니다.

~~~powershell
Set-Location "$HOME\dongbu\react-mini-blog"
git status
~~~

`main`에 있고 아직 저장하지 않은 변경 파일이 없어야 합니다. 각 코드 블록 위의 파일 경로를 확인한 뒤 해당 파일의 전체 내용을 직접 입력합니다.

## 작업 1. 화면을 작은 컴포넌트로 나누기

`App.jsx` 안에 있던 내용을 Header, HomePage, Footer로 나눕니다. 이 단계의 목표는 기능을 늘리는 것이 아니라 파일을 나누고 다시 연결하는 흐름을 익히는 것입니다.

### 수정할 파일

- 수정: `src/App.jsx`
- 새 파일: `src/components/Header.jsx`
- 새 파일: `src/components/Footer.jsx`
- 새 파일: `src/pages/HomePage.jsx`

### 입력할 코드

#### `src/App.jsx`

`src/App.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'

function App() {
  return (
    <>
      <Header />
      <HomePage />
      <Footer />
    </>
  )
}

export default App
~~~

#### `src/components/Footer.jsx`

`src/components/Footer.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
function Footer() {
  return <footer>React fundamentals before Next.js</footer>
}

export default Footer
~~~

#### `src/components/Header.jsx`

`src/components/Header.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
function Header() {
  return (
    <header>
      <strong>React Mini Blog</strong>
    </header>
  )
}

export default Header
~~~

#### `src/pages/HomePage.jsx`

`src/pages/HomePage.jsx`를 열고 파일 전체를 다음 내용으로 맞춥니다.

~~~jsx
function HomePage() {
  return (
    <main>
      <h1>React Mini Blog</h1>
      <p>
        This project practices React fundamentals before moving to the Next.js
        blog project.
      </p>
      <p>
        In this step, focus on splitting one screen into smaller components.
      </p>
    </main>
  )
}

export default HomePage
~~~

### 설명과 확인

- `App.jsx`는 전체 배치를 조립합니다.
- `Header`, `Footer`, `HomePage`는 각각 독립된 화면 조각입니다.
- 다른 파일의 컴포넌트는 `import`로 가져옵니다.

## 완료 결과 및 실행 확인

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. npm 명령은 `npm.cmd`로 실행합니다.

~~~powershell
npm.cmd run lint
npm.cmd run build
~~~

화면 위아래에 Header와 Footer가 보이고, 가운데 HomePage 내용이 `step-1`과 같게 표시되는지 확인합니다.

## 독립 확인

Header와 Footer 중 하나의 문구를 props로 전달하려면 어느 경계를 바꿀지 적습니다. 결과와 확인 방법을 한 문장으로 기록합니다. 실험을 위해 바꾼 값은 다음 단계 전에 복구합니다.

## GitHub에 저장하기

독립 확인에서 잠시 바꾼 코드를 원래대로 돌린 뒤 현재 파일 상태를 확인합니다. 검사와 화면 확인이 끝났다면 이번 단계의 결과를 하나의 commit으로 저장합니다.

```powershell
git status
git add .
git commit -m "Step 2: Split the UI into components"
git push
git status
```

마지막 `git status`에서 저장하지 않은 변경 파일이 없어야 합니다. GitHub의 개인 저장소를 열어 `main`에 이번 Step의 commit이 보이는지도 확인합니다.
