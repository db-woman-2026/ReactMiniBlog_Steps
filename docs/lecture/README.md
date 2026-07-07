# ReactMiniBlog_Steps Lecture

이 폴더는 `step-14` 브랜치에서 사용할 수 있는 수강생용 실습 자료입니다.
각 문서는 이전 단계 실습 결과에서 현재 단계로 넘어오며 직접 입력할 기능 코드를 작업 단위로 나누고, 설명 바로 아래에 프로젝트 내부 파일 링크와 실제 diff를 제공합니다.

실습은 이 `docs/lecture/README.md`에서 현재 브랜치에 포함된 문서 목록을 확인한 뒤, 각 `step-N.md` 문서를 순서대로 따라가는 방식으로 진행합니다.

## 강의 목록

| 단계 | 강의 자료 | 요약 |
| --- | --- | --- |
| `step-1` | [step-1.md](./step-1.md) | 기본 예제 화면을 지우고 JSX로 첫 미니 블로그 화면을 만듭니다. |
| `step-2` | [step-2.md](./step-2.md) | Header, Footer, HomePage 컴포넌트로 화면을 나눕니다. |
| `step-3` | [step-3.md](./step-3.md) | React Router로 `/`, `/about`, `/posts` 주소와 화면을 연결합니다. |
| `step-4` | [step-4.md](./step-4.md) | PostCard에 props를 전달해 재사용 컴포넌트의 감각을 익힙니다. |
| `step-5` | [step-5.md](./step-5.md) | 게시글 배열을 `map`으로 반복 렌더링합니다. |
| `step-6` | [step-6.md](./step-6.md) | `/posts/:postId` 동적 라우트로 상세 페이지를 만듭니다. |
| `step-7` | [step-7.md](./step-7.md) | 이벤트와 `useState`로 좋아요 버튼 상태를 다룹니다. |
| `step-8` | [step-8.md](./step-8.md) | controlled input으로 새 글 작성 form의 입력값을 관리합니다. |
| `step-9` | [step-9.md](./step-9.md) | form submit으로 state 배열에 새 게시글을 추가합니다. |
| `step-10` | [step-10.md](./step-10.md) | 빈 입력 검증과 조건부 오류 메시지를 추가합니다. |
| `step-11` | [step-11.md](./step-11.md) | 상세 화면에서 게시글을 삭제하고 목록으로 이동합니다. |
| `step-12` | [step-12.md](./step-12.md) | 기존 게시글을 수정하는 edit 화면을 추가합니다. |
| `step-13` | [step-13.md](./step-13.md) | keyword state로 게시글 목록을 검색합니다. |
| `step-14` | [step-14.md](./step-14.md) | `localStorage`와 `useEffect`로 새로고침 후에도 데이터를 유지합니다. |

## 실습 방식

1. 현재 단계 문서의 Overview를 먼저 읽고 이번에 완성할 기능을 파악합니다.
2. 각 작업 단위의 설명을 읽은 뒤, `직접 수정할 파일` 링크로 프로젝트 내부 파일을 엽니다.
3. `이전 단계와 달라지는 코드` diff에서 `+` 줄은 추가하고 `-` 줄은 제거합니다.
4. 명령으로 처리하는 작업은 명령을 실행하고 결과만 확인합니다.
5. 실행 확인 명령과 브라우저 체크를 마친 뒤 다음 단계로 넘어갑니다.
