# Windows 10/11 개발 환경 준비

이 강의는 Windows Terminal 안의 PowerShell을 기준으로 진행합니다. Windows Terminal은 여러 셸을 담는 창이고, PowerShell은 그 안에서 명령을 해석하는 셸입니다. 명령 프롬프트(`cmd.exe`)나 Git Bash를 열지 말고 PowerShell 탭을 사용합니다.

React 코드와 Vite 명령은 Windows 10과 Windows 11에서 같습니다. 차이가 날 수 있는 부분은 프로그램 설치 화면, `winget` 제공 여부, Windows Terminal 기본 설치 여부, 방화벽 화면입니다.

> !@#Need Windows 11 Check!@# 실제 수업용 Windows 11 초기화 PC에서 `winget`과 Windows Terminal의 기본 제공 여부, 시작 메뉴 이름, Node.js 방화벽 안내 문구를 확인합니다.

## 1. 현재 Windows와 PowerShell 확인

Windows Terminal에서 PowerShell 탭을 열고 다음 명령을 한 줄씩 실행합니다.

```powershell
$PSVersionTable.PSVersion
$PSVersionTable.PSEdition
(Get-Process -Id $PID).Path
Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version, BuildNumber
```

Windows PowerShell 5.1과 PowerShell 7 모두 이 강의를 진행할 수 있습니다. 문서에서는 두 버전에서 공통으로 동작하는 명령만 사용하며, PowerShell 7 전용 명령 연결자인 `&&`는 사용하지 않습니다.

이 문서는 Windows 10 Pro 22H2 빌드 19045, Windows PowerShell 5.1에서 전체 단계를 검증했습니다. Windows 11에서만 달라질 수 있는 화면은 위 표시를 남겼습니다.

## 2. 필요한 프로그램과 기준 버전

| 프로그램 | 강의 기준 | 공식 설치 안내 |
| --- | --- | --- |
| Node.js | 22.13.0 이상 | [Node.js 다운로드](https://nodejs.org/en/download) |
| Git for Windows | 공식 최신 안정판 | [Git for Windows 설치](https://git-scm.com/install/windows) |
| Visual Studio Code | 공식 최신 안정판 | [VS Code Windows 설치](https://code.visualstudio.com/docs/setup/windows) |
| Windows Terminal | Microsoft Store의 최신 안정판 | [Windows Terminal 설치](https://learn.microsoft.com/windows/terminal/install) |
| GitHub CLI | 공식 최신 안정판 | [GitHub CLI](https://cli.github.com/) |

Vite 8 자체는 Node.js 20.19 이상 또는 22.12 이상을 요구합니다. 이 과정은 다른 강의 프로젝트와 버전을 맞추기 위해 Node.js 22.13.0 이상을 강의 기준으로 사용합니다. 자세한 요구 버전은 [Vite 8 공식 안내](https://vite.dev/blog/announcing-vite8)에서 확인합니다.

### `winget`으로 설치

먼저 `winget --version`을 실행합니다. 명령이 있다면 다음 설치 명령을 각각 실행합니다.

```powershell
winget install --id OpenJS.NodeJS.LTS -e --source winget
winget install --id Git.Git -e --source winget
winget install --id Microsoft.VisualStudioCode -e --source winget
winget install --id Microsoft.WindowsTerminal -e --source winget
winget install --id GitHub.cli -e --source winget
```

`winget`을 찾지 못하거나 학교 정책으로 막혀 있으면 표의 공식 링크에서 Windows 설치 프로그램을 내려받아 설치합니다. Git과 VS Code 설치에서는 PATH 추가 옵션을 유지합니다. 설치가 끝나면 열려 있던 Windows Terminal 창을 모두 닫고 새로 엽니다.

### 설치 확인

```powershell
node --version
npm.cmd --version
git --version
code --version
gh --version
```

명령을 찾지 못하면 `Get-Command node`, `Get-Command git`, `Get-Command code`로 경로를 확인합니다. 설치 직후의 기존 터미널에는 PATH 변경이 반영되지 않을 수 있으므로 새 터미널에서 다시 확인합니다.

## 3. Git과 GitHub SSH 연결

Git 커밋에 기록할 이름과 GitHub에서 확인된 이메일을 설정합니다. 아래 예시는 본인의 값으로 바꿉니다.

```powershell
git config --global user.name "본인 이름"
git config --global user.email "GitHub에 등록한 이메일"
git config --global --get user.name
git config --global --get user.email
```

SSH 키가 아직 없을 때만 새 키를 만듭니다. 저장 위치 질문에는 Enter를 눌러 기본값인 `$HOME\.ssh\id_ed25519`를 사용하고, 암호 문구는 직접 정해 입력합니다.

```powershell
Get-ChildItem "$HOME\.ssh" -ErrorAction SilentlyContinue
ssh-keygen -t ed25519 -C "GitHub에 등록한 이메일"
```

가장 간단한 등록 방법은 GitHub CLI입니다.

```powershell
gh auth login
gh auth status
```

로그인 화면에서 `GitHub.com` → `SSH` → 브라우저 로그인을 선택합니다. 새 공개 키 업로드 질문이 나오면 방금 만든 키를 선택합니다. 계정 비밀번호, 브라우저 인증 코드, SSH 키 암호 문구는 다른 사람에게 보내지 말고 본인이 직접 입력합니다.

직접 등록해야 한다면 공개 키를 클립보드에 복사해 [GitHub SSH key 설정](https://github.com/settings/keys)의 `New SSH key`에 붙여 넣습니다.

```powershell
Get-Content "$HOME\.ssh\id_ed25519.pub" | Set-Clipboard
ssh -T git@github.com
```

처음 연결할 때 호스트 지문 확인 질문이 나오면 주소가 `github.com`인지 확인한 뒤 `yes`를 입력합니다. 성공 메시지에는 셸 접근을 제공하지 않는다는 안내가 함께 나오는 것이 정상입니다.

## 4. 강의 작업 폴더 만들기

PowerShell의 `$HOME`과 `$env:USERPROFILE`은 현재 사용자의 프로필 폴더를 가리킵니다. 예를 들어 사용자 이름이 `student`라면 둘 다 보통 `C:\Users\student`입니다. `%USERPROFILE%`은 명령 프롬프트 전용 표기이므로 PowerShell 문서에서는 사용하지 않습니다.

모든 강의 프로젝트는 다음처럼 `$HOME\dongbu` 아래에 둡니다.

```powershell
Set-Location $HOME
New-Item -ItemType Directory -Path 'dongbu' -Force | Out-Null
Set-Location "$HOME\dongbu"
git clone git@github.com:db-woman-2026/ReactMiniBlog_Steps.git
Set-Location "$HOME\dongbu\ReactMiniBlog_Steps"
```

이미 프로젝트를 받은 경우에는 `git clone`을 다시 실행하지 말고 마지막 `Set-Location`만 실행합니다. 경로에 공백이 있을 가능성을 고려해 전체 경로를 따옴표로 감쌉니다. 이 프로젝트는 공백이 포함된 별도 경로에서도 설치·lint·build를 검증했습니다.

OneDrive의 `바탕 화면`이나 `문서`보다 `$HOME\dongbu`를 권장합니다. 동기화 잠금, 긴 경로, 다른 PC와의 자동 병합을 피할 수 있습니다.

## 5. 프로젝트 최초 실행

저장소 루트에서 현재 branch와 변경 상태를 확인하고, 잠금 파일 그대로 의존성을 설치합니다.

```powershell
Set-Location "$HOME\dongbu\ReactMiniBlog_Steps"
git switch main
git status --short
npm.cmd ci
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
```

`git status --short`는 아무것도 출력하지 않아야 합니다. 개발 서버가 켜지면 Vite가 표시한 `Local` 주소를 브라우저에서 엽니다. 보통 `http://localhost:5173`이지만 5173을 사용 중이면 5174처럼 다음 포트가 자동 선택됩니다. 이 대체 포트 동작도 Windows에서 확인했습니다.

개발 서버는 `Ctrl+C`로 종료합니다. Windows 방화벽 창이 뜨면 공용 네트워크는 선택하지 말고 신뢰하는 개인 네트워크에서만 Node.js 접근을 허용합니다.

`npm` 대신 항상 `npm.cmd`, `npx` 대신 `npx.cmd`를 사용합니다. 그러면 `npm.ps1` 실행 정책 오류 때문에 시스템 실행 정책을 바꿀 필요가 없습니다.

## 6. VS Code에서 열기

```powershell
Set-Location "$HOME\dongbu\ReactMiniBlog_Steps"
code .
```

VS Code 오른쪽 아래에서 파일 인코딩이 `UTF-8`인지 확인합니다. 저장소의 `.gitattributes`가 JavaScript, JSON, CSS, Markdown 파일의 줄바꿈을 LF로 맞춥니다. Git for Windows의 전역 `core.autocrlf` 값과 관계없이 저장소 규칙을 우선하며, 강의 도중 전체 파일의 줄바꿈을 한꺼번에 바꾸지 않습니다.

```powershell
git config --show-origin --get core.autocrlf
git diff --check
```

## 7. PowerShell 명령 빠른 비교

예전 macOS 자료를 발견하면 다음처럼 바꿉니다. 강의 본문에서는 오른쪽 명령만 사용합니다.

| macOS·Linux | PowerShell |
| --- | --- |
| `pwd` | `Get-Location` |
| `ls` | `Get-ChildItem` |
| `cd PATH` | `Set-Location "PATH"` |
| `cp A B` | `Copy-Item A B` |
| `rm FILE` | `Remove-Item FILE -Force` |
| `rm -r DIR` | `Remove-Item DIR -Recurse -Force` |
| `cat FILE` | `Get-Content FILE -Encoding UTF8` |
| `which node` | `(Get-Command node).Source` |

## 8. 막혔을 때 최소 진단

```powershell
Get-Location
git branch --show-current
git status --short
node --version
npm.cmd --version
Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue
```

첫 번째 오류 메시지를 복사하고, 현재 branch와 실행한 명령을 함께 확인합니다. 추가 순서는 [문제 해결 문서](./troubleshooting.md)를 따릅니다.
