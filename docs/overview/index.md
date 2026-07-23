# 단계별 개요

[Windows 11 개발 환경 준비](../windows-11.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: React · 장 「Windows 11 x64 개발 환경 준비」 · 절 「1. Windows Terminal 설치」)</span>에서 개인 프로젝트 생성과 GitHub 등록을 마친 뒤 시작합니다. 실제 입력 순서는 [단계별 실습](../lecture/README.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: React · 장 「React 미니 블로그 단계별 실습」 · 절 「터미널 사용」)</span>에서 확인합니다.

## 전체 흐름

| 단계 | 개요 | 한 줄 요약 |
| --- | --- | --- |
| 시작 | - | Vite React JavaScript 프로젝트를 만들고 개인 GitHub 저장소의 `main`에 올립니다. |
| Step 1 | [첫 JSX 화면](./step-1.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: React · 장 「Step 1. 파일 구조와 첫 JSX 화면」 · 절 「완료 결과」)</span> | 기본 예제 화면을 지우고 Simple.css를 연결한 첫 화면을 만듭니다. |
| Step 2 | [컴포넌트 분리](./step-2.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: React · 장 「Step 2. 컴포넌트 분리」 · 절 「완료 결과」)</span> | Header, Footer, HomePage 컴포넌트로 화면을 나눕니다. |
| Step 3 | [React Router](./step-3.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: React · 장 「Step 3. React Router 기초」 · 절 「완료 결과」)</span> | React Router로 `/`, `/about`, `/posts` 주소와 화면을 연결합니다. |
| Step 4 | [Props](./step-4.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: React · 장 「Step 4. Props」 · 절 「완료 결과」)</span> | PostCard에 props를 전달합니다. |
| Step 5 | [배열 렌더링](./step-5.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: React · 장 「Step 5. 배열과 목록 렌더링」 · 절 「완료 결과」)</span> | 게시글 배열을 `map`으로 반복 렌더링합니다. |
| Step 6 | [동적 라우트](./step-6.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: React · 장 「Step 6. 동적 라우트와 상세 페이지」 · 절 「완료 결과」)</span> | `/posts/:postId` 동적 라우트로 상세 페이지를 만듭니다. |
| Step 7 | [이벤트와 State](./step-7.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: React · 장 「Step 7. 이벤트와 State」 · 절 「완료 결과」)</span> | 이벤트와 `useState`로 좋아요 버튼 상태를 다룹니다. |
| Step 8 | [Controlled Input](./step-8.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: React · 장 「Step 8. Controlled Input」 · 절 「완료 결과」)</span> | controlled input으로 작성 form의 입력값을 관리합니다. |
| Step 9 | [게시글 작성](./step-9.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: React · 장 「Step 9. State 배열에 게시글 작성」 · 절 「완료 결과」)</span> | form submit으로 state 배열에 새 게시글을 추가합니다. |
| Step 10 | [입력 검증](./step-10.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: React · 장 「Step 10. 검증과 조건부 렌더링」 · 절 「완료 결과」)</span> | 빈 입력 검증과 조건부 오류 메시지를 추가합니다. |
| Step 11 | [게시글 삭제](./step-11.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: React · 장 「Step 11. 게시글 삭제」 · 절 「완료 결과」)</span> | 상세 화면에서 게시글을 삭제하고 목록으로 이동합니다. |
| Step 12 | [게시글 수정](./step-12.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: React · 장 「Step 12. 게시글 수정」 · 절 「완료 결과」)</span> | 기존 게시글을 수정하는 edit 화면을 추가합니다. |
| Step 13 | [게시글 검색](./step-13.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: React · 장 「Step 13. 게시글 검색」 · 절 「완료 결과」)</span> | keyword state로 게시글 목록을 검색합니다. |
| Step 14 | [localStorage](./step-14.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: React · 장 「Step 14. localStorage 저장」 · 절 「완료 결과」)</span> | `localStorage`와 `useEffect`로 데이터를 유지합니다. |
| Step 15 | [mock fetch](./step-15.md) <span class="print-reference" data-print-reference="true">(인쇄본 위치: React · 장 「Step 15. mock fetch와 Next.js 연결」 · 절 「완료 결과」)</span> | 정적 JSON을 불러오고 Next.js API 요청 구조와 비교합니다. |

## 단계 묶음

| 범위 | 확인 내용 |
| --- | --- |
| Step 1~2 | JSX와 컴포넌트 분리 |
| Step 3~6 | React Router와 목록·상세 화면 |
| Step 7~10 | 이벤트, state, controlled form과 검증 |
| Step 11~13 | state 기반 삭제, 수정과 검색 |
| Step 14~15 | 브라우저 저장소, mock fetch와 Next.js 전환 준비 |

## 게시글 처리 방식

서버가 없는 이 프로젝트에서는 게시글을 React state 배열로 관리합니다. 작성, 삭제와 수정은 각각 배열에 객체를 추가하거나 `filter`, `map`으로 새 배열을 만드는 작업입니다.

| React 미니 블로그 | Next.js 블로그 |
| --- | --- |
| state 배열 | MongoDB collection |
| 함수형 updater로 객체 추가 | `POST /api/post` |
| `filter`로 삭제 | `DELETE /api/post/[id]` |
| `map`으로 수정 | `PUT /api/post/[id]` |
| React Router | Next.js App Router |

## 기준 코드 브랜치

이 저장소의 `main`은 Vite 시작 상태입니다. `step-1`부터 `step-15`까지는 각 단계의 누적 결과를 확인하는 스냅샷입니다. 개인 실습에서는 이 브랜치로 이동하지 않고 자신의 저장소 `main`을 사용합니다.
