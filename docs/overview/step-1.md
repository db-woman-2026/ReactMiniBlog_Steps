# Step 1. 파일 구조와 첫 JSX 화면

## 완료 결과

Vite가 만든 기본 예제 화면을 지우고 직접 읽기 쉬운 첫 React 화면으로 바꿉니다.

## 변경 내용

- `src/App.jsx`에서 불필요한 로고, 버튼, 예제 링크를 제거합니다.
- `index.html`에서 Simple.css를 연결합니다.
- `src/index.css`의 기존 예제 스타일을 지우고 빈 파일로 둡니다.
- 기본 예제용 이미지와 `App.css`를 제거합니다.

## 동작 원리

- `main.jsx`가 `App` 컴포넌트를 브라우저에 붙입니다.
- JSX는 JavaScript 안에서 HTML처럼 화면 구조를 적는 문법입니다.
- 컴포넌트는 화면 조각을 반환하는 함수입니다.

## 결과 확인

> Windows 11에서는 [환경 준비](../windows-11.md)를 먼저 확인합니다. Windows Terminal의 PowerShell에서 실행합니다.

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
```

브라우저에서 `React Mini Blog` 제목과 설명 문구가 보이면 됩니다.
