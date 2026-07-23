# React 미니 블로그 문제 해결

오류가 나면 터미널의 첫 오류와 브라우저 개발자 도구의 첫 오류부터 확인합니다. 여러 파일을 한꺼번에 되돌리지 말고 아래 순서로 원인을 좁힙니다.

## 1. 시작 branch 확인

강의 diff는 바로 이전 단계의 완성 코드에 적용합니다.

```powershell
git branch --show-current
git status --short
```

Step 7 문서는 Step 6까지 직접 입력한 코드에서 이어집니다. 개인 저장소의 `main`에서 같은 변경을 두 번 입력하지 않았는지 확인합니다.

## 2. 명령을 찾지 못할 때

```powershell
Get-Command node
Get-Command npm.cmd
node --version
npm.cmd --version
npm.cmd ci
```

`Get-Command`가 찾지 못하면 설치를 마친 뒤 Windows Terminal을 완전히 닫고 다시 엽니다. PowerShell에서 `npm.ps1` 실행 정책 오류가 나더라도 실행 정책을 바꾸지 말고 `npm.cmd`를 사용합니다. 설치 결과가 계속 다르면 Node.js 버전과 `package-lock.json` 변경 여부를 확인합니다.

현재 터미널이 PowerShell인지 확실하지 않으면 다음 값을 확인합니다.

```powershell
$PSVersionTable.PSVersion
$PSVersionTable.PSEdition
(Get-Process -Id $PID).Path
```

## 3. 포트나 개발 서버가 꼬였을 때

개발 서버는 `Ctrl+C`로 종료합니다. 5173 포트를 누가 사용 중인지 확인하려면 다음 명령을 실행합니다.

```powershell
Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue
```

Vite가 5174처럼 다른 포트를 자동 선택하는 것은 오류가 아닙니다. 브라우저에는 터미널의 `Local`에 표시된 실제 주소를 입력합니다.

## 4. 화면이 비어 있을 때

브라우저 콘솔과 Vite 터미널의 첫 오류를 읽습니다. 다음 항목을 차례로 확인합니다.

- import 경로의 대소문자와 확장자
- JSX의 닫는 태그와 하나의 최상위 요소
- `map()` callback의 `return`
- route의 path와 링크 주소
- 배열이어야 하는 state에 객체나 `null`이 들어갔는지

오류를 고친 뒤 페이지를 새로 고칩니다. 개발 서버 주소는 터미널에 표시된 실제 포트를 사용합니다.

## 5. state가 일부 변경을 잃을 때

새 값이 이전 state에 의존하면 함수형 updater를 사용합니다.

```js
setPosts((currentPosts) => [newPost, ...currentPosts])
```

같은 이벤트에서 여러 갱신이 일어나거나 비동기 작업 뒤에 갱신할 때 바깥 scope의 `posts`는 최신값이 아닐 수 있습니다.

## 6. route가 글을 찾지 못할 때

URL의 `postId`는 문자열입니다. 게시글 id와 비교할 때 양쪽 형식이 같은지 확인합니다. 없는 id에는 오류가 아니라 찾을 수 없음 화면이 나와야 합니다.

## 7. localStorage 뒤 화면이 깨질 때

개발자 도구의 Application 탭에서 `react-mini-blog-posts` 값을 확인합니다. 배열이어도 게시글의 `id`, `title`, `excerpt`, `content`, `author`가 문자열이 아니면 화면 데이터로 사용하지 않습니다.

문제가 있는 값을 지운 뒤 새로 고칩니다. 강의 마지막 단계의 코드는 잘못된 값에서 초기 데이터로 복구해야 합니다.

## 8. mock fetch가 실패할 때

개발자 도구 Network 탭에서 `/posts.json`의 상태 코드와 응답 본문을 확인합니다.

- 요청 실패: `src/data/posts.js` fallback을 사용합니다.
- 응답 성공, JSON 오류: fallback을 사용합니다.
- 응답 성공, 배열 아님: fallback을 사용합니다.

복구 경로를 확인한 뒤 `public/posts.json`은 다음 단계 전에 정상 내용으로 되돌립니다.

## 9. 최종 확인

```powershell
npm.cmd run lint
npm.cmd run build
```

lint는 문법과 코드 규칙을, build는 import와 번들 생성을 확인합니다. 둘 중 하나라도 실패하면 완료로 처리하지 않습니다.
