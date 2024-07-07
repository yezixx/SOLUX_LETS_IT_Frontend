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

- 아이콘 라이브러리 링크 : https://heroicons.com/outline
  <br>(선정이유 : react-icons 등 타 아이콘 라이브러리는 vite화 호환이 안되는 이슈 발생)

## Router 방식

- [CreateBrowserRouter](https://reactrouter.com/en/main/start/overview)
  - 화면 구조 파악하기 쉬움
  - 오류 수정 및 유지보수가 편리함

## 페이징 처리 방식

- [react-js-pagination](https://www.npmjs.com/package/react-js-pagination) 사용

## 공통 컴포넌트

동일하거나 공통된 특징을 가지고 있는 요소들을 하나하나 구현하지 않고 type을 props로 받아 type의 값에 따라 렌더링하려는 요소의 className이 동적으로 변경되도록 설정하여 다른 스타일링을 적용한다. 컴포넌트의 재사용성을 높이기 위해 사용

(ex) <br/>

- Button.jsx<br/>
  ![image](https://github.com/yezixx/SOLUX_LETS_IT_Frontend/assets/102747968/2306ff77-1a63-4be7-a023-eaa00eb7c82d)<br/>
- Button.css<br/>
  ![image](https://github.com/yezixx/SOLUX_LETS_IT_Frontend/assets/102747968/462bec1c-7c3e-4906-b2bb-dfe4330dc199)<br/>
- 사용<br/>
  ![image](https://github.com/yezixx/SOLUX_LETS_IT_Frontend/assets/102747968/128fab17-cdc2-43af-b4f0-048b4b7f4ecb)<br/>
  위와 같이 작성하면<br/>
  ![image](https://github.com/yezixx/SOLUX_LETS_IT_Frontend/assets/102747968/15d55dd3-f67f-496b-a03b-516b4b58e3a2)<br/>
  위와 같이 className이 적용됨<br/>

type props를 사용하는 공통 컴포넌트

- Button
- MemberItem
