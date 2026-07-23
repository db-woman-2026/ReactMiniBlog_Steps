# Windows 11 x64 개발 환경 준비

이 강의는 Windows 11 x64와 Windows Terminal의 `Windows PowerShell` 프로필을 기준으로 진행합니다. 수업 PC에 프로그램이 이미 보여도 아래 `winget install` 명령을 모두 실행해 설치 상태와 최신 안정판 여부를 확인합니다.

## 1. Windows Terminal 설치

시작 메뉴에서 `Windows PowerShell`을 한 번 열고 다음 명령을 실행합니다.

```powershell
winget --version
winget install --id Microsoft.WindowsTerminal -e --source winget --accept-source-agreements --accept-package-agreements
```

`winget`을 찾지 못하면 [App Installer 공식 안내](https://learn.microsoft.com/windows/msix/app-installer/install-update-app-installer)에 따라 App Installer를 설치하거나 업데이트합니다. 설치 후 처음 열었던 창을 닫고 시작 메뉴에서 `Windows Terminal`을 엽니다.

탭 오른쪽의 화살표에서 `Windows PowerShell` 프로필을 선택합니다. 이후 모든 명령은 이 탭에서 실행합니다.

```powershell
$PSVersionTable.PSVersion
$PSVersionTable.PSEdition
(Get-CimInstance Win32_OperatingSystem) | Select-Object Caption, BuildNumber, OSArchitecture
[System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture
```

대상 PC에서는 Windows 11과 `X64`가 표시되어야 합니다. 강의 명령은 Windows PowerShell 5.1에서 실행할 수 있는 문법만 사용합니다.

## 2. 개발 프로그램 새로 설치

다음 명령을 위에서부터 한 줄씩 실행합니다.

```powershell
winget install --id OpenJS.NodeJS.LTS -e --source winget --architecture x64 --accept-source-agreements --accept-package-agreements
winget install --id Git.Git -e --source winget --architecture x64 --accept-source-agreements --accept-package-agreements
winget install --id Microsoft.VisualStudioCode -e --source winget --architecture x64 --accept-source-agreements --accept-package-agreements
winget install --id GitHub.cli -e --source winget --architecture x64 --accept-source-agreements --accept-package-agreements
```

설치가 끝나면 Windows Terminal 창을 모두 닫고 새 창을 엽니다. 기존 창에는 새 `PATH`가 반영되지 않을 수 있습니다.

```powershell
node --version
npm.cmd --version
git --version
code --version
gh --version
```

이 과정은 Node.js `22.13.0` 이상을 사용합니다. Vite 8은 Node.js 20.19 이상 또는 22.12 이상이 필요하므로 강의 기준 버전이면 요구 조건을 충족합니다.

명령을 찾지 못하면 새 Windows Terminal 창인지 확인한 뒤 실행 파일 경로를 확인합니다.

```powershell
(Get-Command node).Source
(Get-Command git).Source
(Get-Command code).Source
(Get-Command gh).Source
```

> !@#windows11 test: [Windows 11 x64 초기화 PC에서 Windows Terminal, Node.js LTS x64, Git for Windows x64, VS Code x64, GitHub CLI x64를 위 winget 명령으로 신규 설치하고 React 전 단계를 다시 검증합니다.]@#

## 3. 개인 실습 저장소 준비

```powershell
gh auth login --hostname github.com --web
git config --global user.name "Student Name"
git config --global user.email "student@example.com"
New-Item -ItemType Directory -Path "$HOME\dongbu" -Force | Out-Null
Set-Location "$HOME\dongbu"
git clone --branch main --single-branch https://github.com/db-woman-2026/ReactMiniBlog_Steps.git
Set-Location "$HOME\dongbu\ReactMiniBlog_Steps"
git remote remove origin
gh repo create react-mini-blog-practice --private --source . --remote origin --push
git branch --show-current
git status --short --branch
```

현재 branch는 `main`이어야 합니다. 같은 저장소 이름이 이미 있으면 다른 이름으로 빈 GitHub 저장소를 만든 뒤 `origin`으로 연결합니다. OneDrive가 관리하는 폴더는 사용하지 않습니다.

## 4. 프로젝트 최초 실행

저장소 루트에서 branch와 변경 상태를 확인하고 잠금 파일에 고정된 패키지를 설치합니다.

```powershell
Set-Location "$HOME\dongbu\ReactMiniBlog_Steps"
git switch main
git status --short
npm.cmd ci
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
```

`git status --short`는 실행 전 아무것도 출력하지 않아야 합니다. Vite가 표시한 `Local` 주소를 브라우저에서 엽니다. 기본 주소는 `http://localhost:5173`이며 포트를 이미 사용 중이면 다음 번호가 표시됩니다.

개발 서버는 `Ctrl+C`로 종료합니다. Windows 방화벽 창이 나오면 공용 네트워크는 선택하지 않고 신뢰하는 개인 네트워크에서만 Node.js 접근을 허용합니다.

PowerShell에서 `npm.ps1` 실행 정책 오류가 나오면 정책을 바꾸지 말고 `npm.cmd`를 사용합니다. `npx`가 필요한 경우에도 `npx.cmd`를 사용합니다.

## 5. 매 단계 반복

각 단계는 개인 저장소의 `main`에서 이어서 작업합니다.

```powershell
Set-Location "$HOME\dongbu\ReactMiniBlog_Steps"
git branch --show-current
git status --short
npm.cmd run lint
npm.cmd run build
```

실험용 변경을 복구한 뒤 commit하고 `git push origin main`을 실행합니다.

## 6. VS Code와 파일 상태

```powershell
Set-Location "$HOME\dongbu\ReactMiniBlog_Steps"
code .
git config --global --get core.autocrlf
git check-attr text eol -- README.md src\App.jsx
git diff --check
```

VS Code 오른쪽 아래에서 파일 인코딩이 `UTF-8`인지 확인합니다. 저장소의 `.gitattributes`가 JavaScript, JSX, JSON, CSS, Markdown 파일의 줄바꿈을 관리하므로 전체 파일의 줄바꿈을 한꺼번에 바꾸지 않습니다.

## 7. PowerShell 진단 명령

```powershell
Get-Location
git branch --show-current
git status --short
node --version
npm.cmd --version
Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue
```

개발 서버가 열리지 않으면 터미널에 처음 표시된 오류부터 확인합니다. 포트가 사용 중이면 Vite가 출력한 실제 주소를 열고, 자세한 복구 순서는 [문제 해결 문서](./troubleshooting.md)를 따릅니다.

## 공식 안내

- [Windows Terminal 설치](https://learn.microsoft.com/windows/terminal/install)
- [winget install 명령](https://learn.microsoft.com/windows/package-manager/winget/install)
- [Node.js 다운로드](https://nodejs.org/en/download)
- [Git for Windows](https://git-scm.com/install/windows)
- [GitHub CLI 설치](https://github.com/cli/cli/blob/trunk/docs/install_windows.md)
- [VS Code Windows 설치](https://code.visualstudio.com/docs/setup/windows)
- [Vite 시작 안내](https://vite.dev/guide/)
