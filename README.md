# React 미니 블로그 실습

Next.js 과정 전에 React의 컴포넌트, props, state, form, Router와 브라우저 저장소를 작은 블로그로 연습합니다.

이 저장소에는 단계별 설명과 기준 코드 스냅샷이 있습니다. 코드는 새 Vite 프로젝트와 개인 GitHub 저장소의 `main`에서 작성합니다.

## 시작 순서

1. [Windows 11 환경 준비](docs/windows-11.md)에 따라 `react-mini-blog` 프로젝트를 만들고 GitHub에 첫 commit을 올립니다.
2. [React 기초 읽기 자료](docs/basic/README.md)에서 실습에 필요한 문법을 확인합니다.
3. [실습 구성](docs/course-plan.md)에서 단계별 결과를 확인합니다.
4. [단계별 개요](docs/overview/index.md)와 [단계별 실습](docs/lecture/README.md)에서 수정할 내용을 확인합니다.

## 실습 범위

- JSX와 컴포넌트
- props와 배열 렌더링
- React Router와 동적 주소
- event와 state
- controlled input과 게시글 CRUD
- 검증, 조건부 렌더링, 검색
- `localStorage`와 mock fetch

화면 모양은 Step 1에서 연결하는 Simple.css에 맡깁니다. 직접 작성하는 CSS는 입력창 높이와 오류 문구 색상만 다룹니다.

## 매 단계 작업 순서

```powershell
Set-Location "$HOME\dongbu\react-mini-blog"
git status
npm.cmd run lint
npm.cmd run build
git add .
git commit -m "Step N: 작업 내용"
git push
git status
```

현재 브랜치는 항상 개인 저장소의 `main`입니다. 각 단계의 브라우저 확인과 독립 확인을 마친 뒤 commit하고 GitHub에 push합니다.

## 기준 코드 스냅샷

이 저장소의 `main`은 Vite 시작 상태이고 `step-N` 브랜치는 해당 Step까지 누적된 기준 코드입니다. 개인 실습에서는 이 브랜치로 이동하지 않고 자신의 저장소 `main`을 사용합니다.
