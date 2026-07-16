# React 단계별 실습

전체 일정은 [강의 운영안](../course-plan.md), 막혔을 때의 확인 순서는 [문제 해결](../troubleshooting.md)에서 확인합니다.

`step-N` 문서는 `step-(N-1)` 완료 코드에 적용합니다. 현재 `step-N` branch는 해당 변경이 이미 반영된 강사용 참고 완성본입니다.

문서를 따라 파일을 수정할 때는 이전 branch에서 시작합니다. diff와 완성 코드를 비교할 때만 현재 branch를 엽니다.

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

## 실습 방식

1. 현재 branch와 `git status --short`를 확인합니다.
2. 각 작업 단위의 설명을 읽은 뒤, `수정할 파일` 링크로 프로젝트 내부 파일을 엽니다.
3. `코드 변경` diff에서 `+` 줄은 추가하고 `-` 줄은 제거합니다.
4. 실행 결과를 먼저 예상하고 브라우저에서 확인합니다.
5. 독립 확인 뒤 임시 변경을 복구합니다.
6. lint와 build를 통과한 뒤 다음 단계로 넘어갑니다.
