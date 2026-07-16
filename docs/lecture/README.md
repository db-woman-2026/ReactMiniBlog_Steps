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

## 실습 방식

1. 현재 branch와 `git status --short`를 확인합니다.
2. 각 작업 단위의 설명을 읽은 뒤, `수정할 파일` 링크로 프로젝트 내부 파일을 엽니다.
3. `코드 변경` diff에서 `+` 줄은 추가하고 `-` 줄은 제거합니다.
4. 실행 결과를 먼저 예상하고 브라우저에서 확인합니다.
5. 독립 확인 뒤 임시 변경을 복구합니다.
6. lint와 build를 통과한 뒤 다음 단계로 넘어갑니다.
