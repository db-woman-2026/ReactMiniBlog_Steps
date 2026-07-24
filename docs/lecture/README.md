# React 미니 블로그 단계별 실습

[Windows 11 개발 환경 준비](../windows-11.md) <span class="print-reference" data-print-reference="true">(React · Windows 11 x64 개발 환경 준비 · 1. Windows Terminal 설치)</span>에 따라 개인 `react-mini-blog` 프로젝트와 GitHub 저장소를 먼저 만듭니다. 이후 브랜치를 바꾸지 않고 개인 저장소의 `main`에서 직전 단계까지 작성한 코드를 이어서 수정합니다.

코드 블록은 Git 패치가 아니라 해당 Step을 마쳤을 때의 파일 전체 내용입니다. 파일 경로를 먼저 확인하고 기존 파일 전체를 맞춰 입력합니다. `package-lock.json`처럼 명령으로 만들어지는 파일은 직접 수정하지 않습니다.

## 터미널 사용

Windows Terminal 탭을 두 개 엽니다.

- 첫 번째 탭에서는 `npm run dev`를 실행해 개발 서버를 유지합니다.
- 두 번째 탭에서는 `git status`, `npm run lint`, `npm run build`와 Git 명령을 실행합니다.

개발 서버를 처음 실행하면 터미널의 `Local` 주소를 브라우저에서 엽니다. 파일을 저장할 때마다 같은 화면에서 결과를 확인합니다.

## 실습 목록

| 단계 | 문서 | 결과 |
| --- | --- | --- |
| 1 | [파일 구조와 첫 JSX](./step-1.md) <span class="print-reference" data-print-reference="true">(React · Step 1. 파일 구조와 첫 JSX 화면 · 변경 내용)</span> | 기본 화면 |
| 2 | [컴포넌트 분리](./step-2.md) <span class="print-reference" data-print-reference="true">(React · Step 2. 컴포넌트 분리 · 변경 내용)</span> | Header, Home, Footer |
| 3 | [React Router](./step-3.md) <span class="print-reference" data-print-reference="true">(React · Step 3. React Router 기초 · 변경 내용)</span> | 여러 주소와 메뉴 |
| 4 | [Props](./step-4.md) <span class="print-reference" data-print-reference="true">(React · Step 4. Props로 게시글 카드 만들기 · 변경 내용)</span> | 게시글 카드 |
| 5 | [배열 렌더링](./step-5.md) <span class="print-reference" data-print-reference="true">(React · Step 5. 배열과 목록 렌더링 · 변경 내용)</span> | 게시글 목록 |
| 6 | [동적 라우트](./step-6.md) <span class="print-reference" data-print-reference="true">(React · Step 6. 동적 라우트와 상세 페이지 · 변경 내용)</span> | 상세 페이지 |
| 7 | [이벤트와 State](./step-7.md) <span class="print-reference" data-print-reference="true">(React · Step 7. 이벤트와 State · 변경 내용)</span> | 좋아요 버튼 |
| 8 | [Controlled Input](./step-8.md) <span class="print-reference" data-print-reference="true">(React · Step 8. Controlled Input · 변경 내용)</span> | 글쓰기 form |
| 9 | [State 배열에 추가](./step-9.md) <span class="print-reference" data-print-reference="true">(React · Step 9. State 배열에 게시글 작성 · 변경 내용)</span> | 새 게시글 |
| 10 | [검증과 조건부 렌더링](./step-10.md) <span class="print-reference" data-print-reference="true">(React · Step 10. 검증과 조건부 렌더링 · 변경 내용)</span> | 입력 오류 표시 |
| 11 | [게시글 삭제](./step-11.md) <span class="print-reference" data-print-reference="true">(React · Step 11. 게시글 삭제 · 변경 내용)</span> | 삭제 동작 |
| 12 | [게시글 수정](./step-12.md) <span class="print-reference" data-print-reference="true">(React · Step 12. 게시글 수정 · 변경 내용)</span> | 수정 form |
| 13 | [게시글 검색](./step-13.md) <span class="print-reference" data-print-reference="true">(React · Step 13. 게시글 검색 · 변경 내용)</span> | keyword 필터 |
| 14 | [localStorage](./step-14.md) <span class="print-reference" data-print-reference="true">(React · Step 14. localStorage 저장 · 변경 내용)</span> | 새로고침 후 유지 |
| 15 | [mock fetch와 연결](./step-15.md) <span class="print-reference" data-print-reference="true">(React · Step 15. mock fetch와 Next.js 연결 · 변경 내용)</span> | 초기 데이터 로딩 |

각 Step에서 시작 상태, 파일 내용, 브라우저 결과, 독립 확인, `lint`와 `build`, commit과 push를 확인합니다. 독립 확인을 위해 잠시 바꾼 코드는 commit 전에 원래대로 돌립니다.
