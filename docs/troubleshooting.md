# React 미니 블로그 문제 해결

오류가 나면 터미널의 첫 오류와 브라우저 개발자 도구의 첫 오류부터 확인합니다. 여러 파일을 한꺼번에 되돌리지 말고 아래 순서로 원인을 좁힙니다.

## 1. 시작 branch 확인

강의 diff는 바로 이전 단계의 완성 코드에 적용합니다.

```bash
git branch --show-current
git status --short
```

`step-7` 문서를 따라 한다면 시작 코드는 `step-6`입니다. `step-7` branch는 변경이 이미 들어간 참고용 완성본입니다.

## 2. 명령을 찾지 못할 때

```bash
node --version
npm --version
npm ci
```

PowerShell에서 `npm.ps1` 실행 정책 오류가 나면 `npm.cmd --version`과 `npm.cmd ci`를 사용합니다. 설치 결과가 계속 다르면 Node.js 버전과 `package-lock.json` 변경 여부를 확인합니다.

## 3. 화면이 비어 있을 때

브라우저 콘솔과 Vite 터미널의 첫 오류를 읽습니다. 다음 항목을 차례로 확인합니다.

- import 경로의 대소문자와 확장자
- JSX의 닫는 태그와 하나의 최상위 요소
- `map()` callback의 `return`
- route의 path와 링크 주소
- 배열이어야 하는 state에 객체나 `null`이 들어갔는지

오류를 고친 뒤 페이지를 새로 고칩니다. 개발 서버 주소는 터미널에 표시된 실제 포트를 사용합니다.

## 4. state가 일부 변경을 잃을 때

새 값이 이전 state에 의존하면 함수형 updater를 사용합니다.

```js
setPosts((currentPosts) => [newPost, ...currentPosts])
```

같은 이벤트에서 여러 갱신이 일어나거나 비동기 작업 뒤에 갱신할 때 바깥 scope의 `posts`는 최신값이 아닐 수 있습니다.

## 5. route가 글을 찾지 못할 때

URL의 `postId`는 문자열입니다. 게시글 id와 비교할 때 양쪽 형식이 같은지 확인합니다. 없는 id에는 오류가 아니라 찾을 수 없음 화면이 나와야 합니다.

## 6. localStorage 뒤 화면이 깨질 때

개발자 도구의 Application 탭에서 `react-mini-blog-posts` 값을 확인합니다. JSON 문법이 맞아도 배열이 아니면 게시글 목록으로 사용할 수 없습니다.

문제가 있는 값을 지운 뒤 새로 고칩니다. 강의 마지막 단계의 코드는 잘못된 값에서 초기 데이터로 복구해야 합니다.

## 7. mock fetch가 실패할 때

개발자 도구 Network 탭에서 `/posts.json`의 상태 코드와 응답 본문을 확인합니다.

- 요청 실패: `src/data/posts.js` fallback을 사용합니다.
- 응답 성공, JSON 오류: fallback을 사용합니다.
- 응답 성공, 배열 아님: fallback을 사용합니다.

복구 경로를 확인한 뒤 `public/posts.json`은 다음 단계 전에 정상 내용으로 되돌립니다.

## 8. 최종 확인

```bash
npm run lint
npm run build
```

PowerShell이 `npm.ps1`을 차단하면 `npm.cmd run lint`와 `npm.cmd run build`를 사용합니다.

lint는 문법과 코드 규칙을, build는 import와 번들 생성을 확인합니다. 둘 중 하나라도 실패하면 완료로 처리하지 않습니다.
