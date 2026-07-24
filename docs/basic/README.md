# React 기초

미니 블로그 실습 전에 읽을 React 기초 자료입니다.

Windows 11에서 실습한다면 먼저 [Windows 개발 환경 준비](../windows-11.md) <span class="print-reference" data-print-reference="true">(React · Windows 11 x64 개발 환경 준비 · 1. Windows Terminal 설치)</span>를 확인합니다.

단계별 확인 결과는 [실습 구성](../course-plan.md) <span class="print-reference" data-print-reference="true">(React · React 미니 블로그 실습 구성 · 시작 조건)</span>, 오류가 났을 때의 진단 절차는 [문제 해결](../troubleshooting.md) <span class="print-reference" data-print-reference="true">(React · React 미니 블로그 문제 해결 · 1. 프로젝트 폴더와 시작 상태 확인)</span>에서 확인합니다.

짧은 예제에서 JavaScript 값이 React 화면으로 바뀌는 결과를 확인합니다. 문법을 먼저 외우지 말고 코드의 입력과 화면 결과를 비교합니다.

## 문서 목록

| 챕터 | 주제 | 실습에서 만나는 내용 |
| --- | --- | --- |
| 1 | [React와 프로젝트 구조](./chapter-1.md) <span class="print-reference" data-print-reference="true">(React · Chapter 1. React와 프로젝트 구조 · 확인할 내용)</span> | `main.jsx`, `App.jsx`, 컴포넌트가 화면에 나타나는 흐름 |
| 2 | [JavaScript 값과 변수](./chapter-2.md) <span class="print-reference" data-print-reference="true">(React · Chapter 2. JavaScript 값과 변수 · 확인할 내용)</span> | 문자열, 숫자, 불리언, `const`, `let`, 표현식 |
| 3 | [객체와 배열](./chapter-3.md) <span class="print-reference" data-print-reference="true">(React · Chapter 3. 객체와 배열 · 확인할 내용)</span> | 게시글 데이터, `map`, `find`, `filter`, 전개 문법 |
| 4 | [함수와 모듈](./chapter-4.md) <span class="print-reference" data-print-reference="true">(React · Chapter 4. 함수와 모듈 · 확인할 내용)</span> | 함수, 매개변수, 반환값, `import`, `export` |
| 5 | [JSX 읽고 쓰기](./chapter-5.md) <span class="print-reference" data-print-reference="true">(React · Chapter 5. JSX 읽고 쓰기 · 확인할 내용)</span> | 중괄호, 속성, Fragment, JSX 기본 규칙 |
| 6 | [컴포넌트와 화면 조립](./chapter-6.md) <span class="print-reference" data-print-reference="true">(React · Chapter 6. 컴포넌트와 화면 조립 · 확인할 내용)</span> | 컴포넌트 정의, 사용, 분리, 합성 |
| 7 | [props로 데이터 전달](./chapter-7.md) <span class="print-reference" data-print-reference="true">(React · Chapter 7. props로 데이터 전달 · 확인할 내용)</span> | 부모에서 자식으로 문자열, 객체, 함수 전달 |
| 8 | [이벤트와 state](./chapter-8.md) <span class="print-reference" data-print-reference="true">(React · Chapter 8. 이벤트와 state · 확인할 내용)</span> | 클릭, 입력 이벤트, `useState`, 다시 렌더링 |
| 9 | [조건부 화면과 목록](./chapter-9.md) <span class="print-reference" data-print-reference="true">(React · Chapter 9. 조건부 화면과 목록 · 확인할 내용)</span> | 조건부 렌더링, `map`, `key`, 빈 목록 처리 |
| 10 | [폼과 사용자 입력](./chapter-10.md) <span class="print-reference" data-print-reference="true">(React · Chapter 10. 폼과 사용자 입력 · 확인할 내용)</span> | controlled input, submit, `preventDefault`, 검증 |
| 11 | [state로 추가·삭제·수정](./chapter-11.md) <span class="print-reference" data-print-reference="true">(React · Chapter 11. state로 추가·삭제·수정 · 확인할 내용)</span> | 배열과 객체를 바꾸지 않고 CRUD 처리 |
| 12 | [Effect와 브라우저 데이터](./chapter-12.md) <span class="print-reference" data-print-reference="true">(React · Chapter 12. Effect와 브라우저 데이터 · 확인할 내용)</span> | `useEffect`, `localStorage`, `fetch`, 실습 연결 |

## 예제 확인 방법

1. 필요한 주제의 챕터를 엽니다.
2. 예제마다 먼저 코드가 보여 줄 결과를 예상합니다.
3. 설명을 읽고 다시 코드를 위에서 아래로 읽습니다.
4. 확인 문제에 말로 답해 봅니다.
5. 이해되지 않는 문법은 외우지 말고 해당 예제의 입력과 결과만 비교합니다.

예제는 서로 독립적인 경우가 많습니다. 앞 예제의 변수가 다음 예제에도 있다고 가정하지 않습니다. 코드 끝의 세미콜론은 이 프로젝트의 작성 방식에 맞춰 생략합니다.

## 다루지 않는 내용

- CSS 설계와 디자인 시스템
- TypeScript
- 서버, 데이터베이스, 로그인
- 성능 최적화와 복잡한 상태 관리 도구
- React 내부 동작과 고급 Hook

라우팅, 게시글 작성·삭제·수정은 개념과 예제 결과를 확인합니다. 실제 화면 코드는 개인 저장소의 `main`에서 [단계별 실습](../lecture/README.md) <span class="print-reference" data-print-reference="true">(React · React 미니 블로그 단계별 실습 · 터미널 사용)</span>을 참고해 작성합니다.
