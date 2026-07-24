# Windows 11 x64 개발 환경 준비

아래 명령은 Windows 11 x64와 Windows Terminal의 `Windows PowerShell` 프로필에서 실행합니다. 프로그램 설치를 마친 뒤 개인 Vite 프로젝트와 GitHub 저장소를 만듭니다.

## 1. Windows Terminal 설치

시작 메뉴에서 `Windows PowerShell`을 한 번 열고 다음 명령을 실행합니다.

```powershell
winget --version
winget install --id Microsoft.WindowsTerminal -e --source winget --accept-source-agreements --accept-package-agreements
```

`winget`을 찾지 못하면 [App Installer 공식 안내](https://learn.microsoft.com/windows/msix/app-installer/install-update-app-installer) <span class="print-url" data-print-url="true">(https://learn.microsoft.com/windows/msix/app-installer/install-update-app-installer)</span>에 따라 App Installer를 설치하거나 업데이트합니다. 설치 후 처음 열었던 창을 닫고 시작 메뉴에서 Windows Terminal을 엽니다.

탭 오른쪽의 화살표에서 `Windows PowerShell` 프로필을 선택합니다. 이후 모든 명령은 이 탭에서 실행합니다.

```powershell
$PSVersionTable.PSVersion
$PSVersionTable.PSEdition
(Get-CimInstance Win32_OperatingSystem) | Select-Object Caption, BuildNumber, OSArchitecture
[System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture
```

Windows 11과 `X64`가 표시되어야 합니다. 아래 명령은 Windows PowerShell 5.1에서 실행할 수 있는 문법만 사용합니다.

## 2. 개발 프로그램 설치

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
npm --version
git --version
code --version
gh --version
```

Node.js `22.13.0` 이상을 사용합니다. 명령을 찾지 못하면 새 Windows Terminal 창인지 확인한 뒤 실행 파일 경로를 확인합니다.

```powershell
(Get-Command node).Source
(Get-Command git).Source
(Get-Command code).Source
(Get-Command gh).Source
```

> !@#windows11 test: [Windows 11 x64 초기화 PC에서 Windows Terminal, Node.js LTS x64, Git for Windows x64, VS Code x64, GitHub CLI x64를 위 winget 명령으로 신규 설치하고 React 전 단계를 다시 검증합니다.]@#

## 3. Git과 GitHub 계정 연결

이름과 이메일은 본인의 GitHub 계정에 사용하는 값으로 바꿉니다.

```powershell
git config --global user.name "Student Name"
git config --global user.email "student@example.com"
gh auth login --hostname github.com --web
gh auth status
```

로그인 명령이 표시하는 일회용 코드를 브라우저에 입력합니다. 마지막 `gh auth status`에서 GitHub 계정에 로그인했다는 결과가 나와야 합니다.

## 4. 개인 Vite React 프로젝트 생성

이 저장소를 clone하는 대신 지정된 버전의 Vite React 프로젝트를 새로 만듭니다.

```powershell
New-Item -ItemType Directory -Path "$HOME\dongbu" -Force | Out-Null
Set-Location "$HOME\dongbu"
npm create vite@9.1.1 react-mini-blog -- --template react
Set-Location "$HOME\dongbu\react-mini-blog"
npm install
```

프로젝트 폴더 이름은 `react-mini-blog`입니다. OneDrive가 관리하는 폴더는 사용하지 않습니다.

## 5. 생성된 프로젝트 확인

먼저 검사와 build를 실행합니다.

```powershell
Set-Location "$HOME\dongbu\react-mini-blog"
npm run lint
npm run build
npm run dev
```

Vite가 표시한 `Local` 주소를 브라우저에서 엽니다. 기본 주소는 `http://localhost:5173`이며 포트를 이미 사용 중이면 5174처럼 다른 번호가 표시됩니다.

Vite의 기본 React 화면이 보이면 프로젝트 생성이 끝난 것입니다. 개발 서버는 `Ctrl+C`로 종료할 수 있습니다.

Windows 방화벽 창이 나오면 공용 네트워크는 선택하지 않습니다. 신뢰하는 개인 네트워크에서만 Node.js 접근을 허용합니다.

## 6. 첫 commit과 GitHub 저장소 생성

생성된 프로젝트를 Git 저장소로 만들고 첫 상태를 기록합니다.

```powershell
Set-Location "$HOME\dongbu\react-mini-blog"
git init -b main
git add .
git commit -m "Create Vite React project"
gh repo create react-mini-blog --private --source . --remote origin --push
git status
git remote -v
```

`git status`에는 `main`에 있고 저장하지 않은 변경 파일이 없다는 결과가 나와야 합니다. `git remote -v`에는 본인 GitHub 계정의 `react-mini-blog` 주소가 표시되어야 합니다.

같은 이름의 GitHub 저장소가 이미 있으면 `gh repo create`의 저장소 이름을 `react-mini-blog-이름`처럼 바꿉니다. 로컬 프로젝트 폴더 이름은 그대로 사용해도 됩니다.

다음 명령으로 브라우저에서 개인 저장소를 열고 첫 commit을 확인합니다.

```powershell
gh repo view --web
```

## 7. VS Code와 개발 서버 사용

```powershell
Set-Location "$HOME\dongbu\react-mini-blog"
code .
```

Windows Terminal 탭을 두 개 사용합니다.

첫 번째 탭은 개발 서버 전용입니다.

```powershell
Set-Location "$HOME\dongbu\react-mini-blog"
npm run dev
```

두 번째 탭은 검사와 Git 명령 전용입니다.

```powershell
Set-Location "$HOME\dongbu\react-mini-blog"
git status
npm run lint
npm run build
```

VS Code 오른쪽 아래에서 파일 인코딩이 `UTF-8`인지 확인합니다. 전체 파일의 줄바꿈을 한꺼번에 바꾸지 않습니다.

## 8. 매 Step 저장 순서

각 Step은 개인 저장소의 `main`에서 작업합니다. 이 저장소의 `step-N` 브랜치로 이동하지 않습니다.

```powershell
git status
npm run lint
npm run build
git add .
git commit -m "Step N: 작업 내용"
git push
git status
```

브라우저 확인과 독립 확인을 마친 뒤 commit합니다. 마지막 `git status`에는 저장하지 않은 변경 파일이 없어야 합니다.

## 9. PowerShell 진단 명령

```powershell
Get-Location
git status
git remote -v
node --version
npm --version
Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue
```

개발 서버가 열리지 않으면 터미널에 처음 표시된 오류부터 확인합니다. 포트가 사용 중이면 Vite가 출력한 실제 주소를 열고, 자세한 복구 순서는 [문제 해결 문서](./troubleshooting.md) <span class="print-reference" data-print-reference="true">(React · React 미니 블로그 문제 해결 · 1. 프로젝트 폴더와 시작 상태 확인)</span>를 따릅니다.

## 공식 안내

- [Windows Terminal 설치](https://learn.microsoft.com/windows/terminal/install) <span class="print-url" data-print-url="true">(https://learn.microsoft.com/windows/terminal/install)</span>
- [winget install 명령](https://learn.microsoft.com/windows/package-manager/winget/install) <span class="print-url" data-print-url="true">(https://learn.microsoft.com/windows/package-manager/winget/install)</span>
- [Node.js 다운로드](https://nodejs.org/en/download) <span class="print-url" data-print-url="true">(https://nodejs.org/en/download)</span>
- [Git for Windows](https://git-scm.com/install/windows) <span class="print-url" data-print-url="true">(https://git-scm.com/install/windows)</span>
- [GitHub CLI 설치](https://github.com/cli/cli/blob/trunk/docs/install_windows.md) <span class="print-url" data-print-url="true">(https://github.com/cli/cli/blob/trunk/docs/install_windows.md)</span>
- [VS Code Windows 설치](https://code.visualstudio.com/docs/setup/windows) <span class="print-url" data-print-url="true">(https://code.visualstudio.com/docs/setup/windows)</span>
- [Vite 시작 안내](https://vite.dev/guide/) <span class="print-url" data-print-url="true">(https://vite.dev/guide/)</span>
