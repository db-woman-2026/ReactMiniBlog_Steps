# React 미니 블로그 학습 범위

Next.js 과정 전에 React의 화면 구성과 상태 변경을 작은 블로그로 연습합니다. 개인 저장소의 `main`에서 Step 1부터 Step 15까지 이어서 작업합니다.

## 사용하는 도구

- Vite와 React
- React Router
- JavaScript
- CSS
- localStorage
- 정적 JSON과 fetch

## 다루는 내용

- JSX와 컴포넌트
- props
- 배열과 `map`
- 동적 주소
- event와 `useState`
- controlled input
- 게시글 생성·조회·수정·삭제
- 입력 검증과 조건부 렌더링
- 검색
- `useEffect`와 localStorage
- 정적 JSON 로딩

TypeScript, CSS framework, backend API, 데이터베이스, 인증, 배포는 이 과정에서 다루지 않습니다.

## 학습 순서

1. [Windows 11 환경 준비](docs/windows-11.md)를 끝냅니다.
2. [기초 읽기 자료](docs/basic/README.md)를 확인합니다.
3. [단계별 실습](docs/lecture/README.md)의 코드를 직접 입력합니다.
4. 각 단계에서 `lint`와 `build`를 통과시킵니다.
5. 변경을 commit하고 개인 저장소의 `origin/main`에 push합니다.

마지막 Step 15에서는 localStorage에 저장된 값이 없을 때 정적 JSON을 불러옵니다. 다음 과정에서는 이 흐름을 Next.js API와 MongoDB 데이터로 바꿉니다.
