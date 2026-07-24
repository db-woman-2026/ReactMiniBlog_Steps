# React 미니 블로그 문제 해결

오류가 나면 터미널의 첫 오류와 브라우저 개발자 도구의 첫 오류부터 확인합니다. 여러 파일을 한꺼번에 지우거나 다른 Step의 코드를 가져오기 전에 아래 순서로 원인을 좁힙니다.

## 1. 프로젝트 폴더와 시작 상태 확인

```powershell
Get-Location
git status
```

현재 위치는 `$HOME\dongbu\react-mini-blog`이어야 합니다. 개인 저장소의 `main`에서 직전 Step까지 commit한 상태인지 확인합니다.

예를 들어 Step 7은 Step 6까지 직접 작성한 파일에서 이어집니다. 이 저장소의 `step-7` 브랜치로 바꾸거나 같은 Step의 내용을 두 번 입력하지 않습니다.

## 2. 명령을 찾지 못할 때

```powershell
Get-Command node
Get-Command npm
node --version
npm --version
npm install
```

`Get-Command`가 찾지 못하면 설치를 마친 뒤 Windows Terminal을 완전히 닫고 다시 엽니다. npm은 위 PowerShell 코드 블록의 `npm` 명령을 그대로 사용합니다.

현재 터미널이 PowerShell인지 확실하지 않으면 다음 값을 확인합니다.

```powershell
$PSVersionTable.PSVersion
$PSVersionTable.PSEdition
(Get-Process -Id $PID).Path
```

## 3. GitHub에 push되지 않을 때

```powershell
gh auth status
git remote -v
git status
git push
```

`gh auth status`에는 본인 계정이 표시되어야 합니다. `git remote -v`의 `origin`은 본인의 `react-mini-blog` 저장소여야 하며 이 저장소 주소가 나오면 안 됩니다.

아직 첫 GitHub 저장소를 만들지 않았다면 [Windows 11 환경 준비](./windows-11.md) <span class="print-reference" data-print-reference="true">(React · Windows 11 x64 개발 환경 준비 · 1. Windows Terminal 설치)</span>의 6번 절차를 먼저 마칩니다.

## 4. 포트나 개발 서버가 꼬였을 때

개발 서버는 `Ctrl+C`로 종료합니다. 5173 포트를 누가 사용 중인지 확인하려면 다음 명령을 실행합니다.

```powershell
Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue
```

Vite가 5174처럼 다른 포트를 자동 선택하는 것은 오류가 아닙니다. 브라우저에는 터미널의 `Local`에 표시된 실제 주소를 입력합니다.

## 5. 화면이 비어 있을 때

브라우저 콘솔과 Vite 터미널의 첫 오류를 읽습니다. 다음 항목을 차례로 확인합니다.

- import 경로의 대소문자와 확장자
- JSX의 닫는 태그와 하나의 최상위 요소
- `map()` callback의 `return`
- route의 `path`와 링크 주소
- 배열이어야 하는 state에 객체나 `null`이 들어갔는지

오류를 고친 뒤 페이지를 새로 고칩니다. 개발 서버 주소는 터미널에 표시된 실제 포트를 사용합니다.

## 6. state가 일부 변경을 잃을 때

새 값이 이전 state에 의존하면 함수형 updater를 사용합니다.

```js
setPosts((currentPosts) => [newPost, ...currentPosts])
```

같은 이벤트에서 여러 갱신이 일어나거나 비동기 작업 뒤에 갱신할 때 바깥 scope의 `posts`는 최신값이 아닐 수 있습니다.

## 7. route가 글을 찾지 못할 때

URL의 `postId`는 문자열입니다. 게시글 id와 비교할 때 양쪽 형식이 같은지 확인합니다. 없는 id에는 오류가 아니라 찾을 수 없음 화면이 나와야 합니다.

## 8. localStorage 뒤 화면이 깨질 때

개발자 도구의 Application 탭에서 `react-mini-blog-posts` 값을 확인합니다. 배열이어도 게시글의 `id`, `title`, `excerpt`, `content`, `author`가 문자열이 아니면 화면 데이터로 사용하지 않습니다.

문제가 있는 값을 지운 뒤 새로 고칩니다. Step 14와 Step 15의 코드는 잘못된 값에서 초기 데이터로 복구해야 합니다.

## 9. mock fetch가 실패할 때

개발자 도구 Network 탭에서 `/posts.json`의 상태 코드와 응답 본문을 확인합니다.

- 요청 실패: `src/data/posts.js`의 fallback을 사용합니다.
- 응답 성공, JSON 오류: fallback을 사용합니다.
- 응답 성공, 배열 아님: fallback을 사용합니다.

복구 경로를 확인한 뒤 `public/posts.json`을 정상 JSON 배열로 되돌리고 commit합니다.

## 10. 최종 확인

```powershell
npm run lint
npm run build
git status
```

`lint`는 문법과 코드 규칙을, `build`는 import와 번들 생성을 확인합니다. 둘 중 하나라도 실패하면 완료로 처리하지 않습니다.
