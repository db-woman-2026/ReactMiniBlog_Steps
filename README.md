# React 미니 블로그 실습

Vite로 만든 starter에서 시작해 컴포넌트, props, state, form, Router, localStorage를 한 단계씩 구현합니다. 개인 저장소의 `main`에서 모든 코드를 직접 입력하고 각 단계가 끝날 때 검사·commit·push합니다.

## 시작 순서

1. [Windows 11 환경 준비](docs/windows-11.md)를 끝냅니다.
2. [React 기초 읽기 자료](docs/basic/README.md)를 확인합니다.
3. [과정 계획](docs/course-plan.md)에서 15단계 순서를 확인합니다.
4. [단계별 실습](docs/lecture/README.md)을 Step 1부터 진행합니다.

## 실습 범위

- JSX와 컴포넌트
- props와 배열 렌더링
- React Router와 동적 주소
- event와 state
- controlled input과 게시글 CRUD
- 검증, 조건부 렌더링, 검색
- localStorage와 mock fetch

## 매 단계 공통 확인

```powershell
git branch --show-current
git status --short
npm.cmd run lint
npm.cmd run build
git diff
git add .
git diff --staged
git commit -m "Complete React step N"
git push origin main
```

현재 branch는 항상 `main`입니다. 실험용 변경을 복구하고 lint와 build가 모두 통과한 뒤 commit합니다.
