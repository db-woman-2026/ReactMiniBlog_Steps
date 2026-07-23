# Step 2. 컴포넌트 분리

## 완료 결과

한 파일에 있던 화면을 Header, Footer, HomePage 컴포넌트로 나눕니다.

## 변경 내용

- `src/components/Header.jsx`를 추가합니다.
- `src/components/Footer.jsx`를 추가합니다.
- `src/pages/HomePage.jsx`를 추가합니다.
- `src/App.jsx`는 전체 배치만 담당하도록 단순화합니다.

## 동작 원리

- 컴포넌트는 파일로 나눌 수 있습니다.
- `export default`와 `import`로 다른 파일의 컴포넌트를 가져옵니다.
- 반복되는 화면 요소는 공통 컴포넌트로 분리합니다.

## 결과 확인

홈 화면 위에 제목 영역, 아래에 footer 문구가 보이면 됩니다.
