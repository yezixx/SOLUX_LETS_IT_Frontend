# SOLUX 웹시코기 LET'S IT 프로젝트 - 프론트엔드
## 개발환경

1. IDE: Visual Studio Code
2. 프로젝트 생성: Vite 사용
3. React

## 화면 구성

...

## CSS 방식 (CSS-IN-CSS)

- CSS module
  - 대형 프로젝트이니만큼 추후 운영 및 배포를 고려했을 때 사용자 경험이 더 좋은 css-in-css 방식 선정  
  - 익숙한 방식
- 색상 코드는 CSS 변수로 지정하여 사용

## Icon 사용
* 아이콘 라이브러리 링크 : https://heroicons.com/outline
  <br>(선정이유 : react-icons 등 타 아이콘 라이브러리는 vite화 호환이 안되는 이슈 발생)

## Router 방식

- [CreateBrowserRouter](https://reactrouter.com/en/main/start/overview)
  - 화면 구조 파악하기 쉬움
  - 오류 수정 및 유지보수가 편리함

## 페이징 처리 방식

- [react-js-pagination](https://www.npmjs.com/package/react-js-pagination) 사용
