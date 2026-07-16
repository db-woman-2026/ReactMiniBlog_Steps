# Windows 11 환경 준비

Windows 11에서는 Windows Terminal의 PowerShell로 실습합니다. 명령은 저장소 루트에서 실행합니다.

## 1. 프로그램 설치

다음 프로그램을 설치합니다.

- [Node.js](https://nodejs.org/en/download): 이 과정은 `22.13.0` 이상을 기준으로 합니다.
- [Git for Windows](https://git-scm.com/install/windows.html)
- [Visual Studio Code](https://code.visualstudio.com/docs/setup/windows)

Vite 8의 Node.js 요구 버전은 [공식 안내](https://vite.dev/guide/)에서 확인합니다. 이 과정은 다른 강의 프로젝트와 환경을 맞추기 위해 Node.js `22.13.0` 이상을 사용합니다.

Git과 VS Code는 `winget`으로 설치할 수도 있습니다.

```powershell
winget install --id Git.Git -e --source winget
winget install --id Microsoft.VisualStudioCode -e --source winget
```

설치 후 터미널을 새로 열고 확인합니다.

```powershell
node --version
npm.cmd --version
git --version
code --version
```

## 2. 프로젝트 실행

OneDrive 동기화 폴더보다 `C:\workspace`처럼 짧은 작업 경로를 권장합니다.

```powershell
Set-Location C:\workspace\ReactMiniBlog_Steps
npm.cmd ci
npm.cmd run dev
```

터미널에 표시된 `http://localhost:5173` 주소를 브라우저에서 엽니다. 포트가 사용 중이면 Vite가 다른 주소를 표시하므로 터미널의 실제 주소를 사용합니다.

개발 서버는 `Ctrl+C`로 종료합니다. Windows 방화벽 창이 뜨면 개인 네트워크에서만 Node.js 접근을 허용합니다.

## 3. 확인 명령

수정 후 lint와 build를 실행합니다.

```powershell
npm.cmd run lint
npm.cmd run build
```

`npm.ps1` 실행 정책 오류가 나면 실행 정책을 바꾸기 전에 `npm.cmd`를 사용합니다. `npx`가 필요할 때도 `npx.cmd`로 실행할 수 있습니다.

## 4. PowerShell 명령 대응

| macOS·Linux 예제 | PowerShell |
| --- | --- |
| `pwd` | `Get-Location` |
| `ls` | `Get-ChildItem` |
| `cp A B` | `Copy-Item A B` |
| `rm FILE` | `Remove-Item FILE` |
| `rm -r DIR` | `Remove-Item DIR -Recurse -Force` |
| `cat FILE` | `Get-Content FILE -Encoding utf8` |
| `which node` | `(Get-Command node).Source` |

`git`, `node`, `npm`, `npx` 명령은 PowerShell에서도 같은 형식으로 실행합니다.

## 5. 경로와 줄바꿈

JavaScript에서 경로를 조합할 때는 `node:path`를 사용합니다. 저장소의 `.gitattributes`는 소스와 문서의 줄바꿈을 LF로 맞춥니다. VS Code 오른쪽 아래에서 파일 인코딩이 UTF-8인지 확인합니다.
