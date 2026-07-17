# 단계별 개요

Windows 10/11에서는 [Windows 개발 환경 준비](../windows-11.md)를 마친 뒤 시작합니다.

React 미니 블로그의 단계별 개요입니다. 입력 순서와 diff는 `docs/lecture/`에서 확인합니다.

## 전체 흐름

| 단계 | 개요 | 한 줄 요약 |
| --- | --- | --- |
| `main` | - | Vite React JavaScript 템플릿으로 생성한 시작 상태입니다. |
| `step-1` | [overview/step-1.md](./step-1.md) | 기본 예제 화면을 지우고 JSX로 첫 미니 블로그 화면을 만듭니다. |
| `step-2` | [overview/step-2.md](./step-2.md) | Header, Footer, HomePage 컴포넌트로 화면을 나눕니다. |
| `step-3` | [overview/step-3.md](./step-3.md) | React Router로 `/`, `/about`, `/posts` 주소와 화면을 연결합니다. |
| `step-4` | [overview/step-4.md](./step-4.md) | PostCard에 props를 전달해 재사용 컴포넌트의 감각을 익힙니다. |
| `step-5` | [overview/step-5.md](./step-5.md) | 게시글 배열을 `map`으로 반복 렌더링합니다. |
| `step-6` | [overview/step-6.md](./step-6.md) | `/posts/:postId` 동적 라우트로 상세 페이지를 만듭니다. |
| `step-7` | [overview/step-7.md](./step-7.md) | 이벤트와 `useState`로 좋아요 버튼 상태를 다룹니다. |
| `step-8` | [overview/step-8.md](./step-8.md) | controlled input으로 새 글 작성 form의 입력값을 관리합니다. |
| `step-9` | [overview/step-9.md](./step-9.md) | form submit으로 state 배열에 새 게시글을 추가합니다. |
| `step-10` | [overview/step-10.md](./step-10.md) | 빈 입력 검증과 조건부 오류 메시지를 추가합니다. |
| `step-11` | [overview/step-11.md](./step-11.md) | 상세 화면에서 게시글을 삭제하고 목록으로 이동합니다. |
| `step-12` | [overview/step-12.md](./step-12.md) | 기존 게시글을 수정하는 edit 화면을 추가합니다. |
| `step-13` | [overview/step-13.md](./step-13.md) | keyword state로 게시글 목록을 검색합니다. |
| `step-14` | [overview/step-14.md](./step-14.md) | `localStorage`와 `useEffect`로 새로고침 후에도 데이터를 유지합니다. |
| `step-15` | [overview/step-15.md](./step-15.md) | `public/posts.json` mock fetch와 Next.js 연결 지점을 정리합니다. |

## 단계 묶음

| 범위 | 학습 초점 |
| --- | --- |
| `step-1 ~ step-2` | JSX와 컴포넌트 분리 |
| `step-3 ~ step-6` | React Router와 목록/상세 화면 |
| `step-7 ~ step-10` | 이벤트, state, controlled form, 검증 |
| `step-11 ~ step-13` | state 기반 삭제, 수정, 검색 |
| `step-14 ~ step-15` | 브라우저 저장소, mock fetch, Next.js 전환 준비 |

## 실습 방향

이 프로젝트의 CRUD는 서버나 데이터베이스 없이 React state로 먼저 처리합니다.

이후 `NextJsBlog_Steps`에서는 같은 흐름을 API Route와 MongoDB로 옮겨갑니다.

| ReactMiniBlog_Steps | NextJsBlog_Steps |
| --- | --- |
| state 배열 | MongoDB collection |
| `setPosts([...posts, newPost])` | `POST /api/post` |
| `filter`로 삭제 | `DELETE /api/post/[id]` |
| `map`으로 수정 | `PUT /api/post/[id]` |
| React Router | Next.js App Router |
