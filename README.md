# 2024.06.02 변경사항 (필독)
<image src='https://github.com/yezixx/SOLUX_LETS_IT_Frontend/assets/168459001/ad2c0868-0214-442c-9b96-dc9c381126b6' width='500px'/><br>

## 목차 ##
[1. sideNav 컴포넌트 구현 안내](#sidenav-컴포넌트-구현-안내)

<br><br>
## css 변수 설정 ##
index.css에 변수명과 색상코드를 연결해두었습니다.

  ![image](https://github.com/yezixx/SOLUX_LETS_IT_Frontend/assets/168459001/7c0b93d6-22d2-47be-aeca-a04724aeaeab)

### 사용방법 ###
   
1) figma에서 컴포넌트를 클릭하여 색상명을 확인한다 (ex. mainColor2)
2) var(--main-color2) 를 이용하여 색상을 지정한다

<br><br><br>

## sideNav 컴포넌트 구현 안내
: 각 페이지 왼쪽에 위치한 navigator
### * 사용방법 ###
1) sideNav를 사용하고자 하는 상위 컴포넌트에서 sideNav 컴포넌트를 import 한다
2) 상위 컴포넌트에서 배열로 sideNav에 들어갈 data를 만들어준다 (ex. ['프로필 관리, '프로젝트 관리', '개인정보 수정'])
3) 해당 배열을 props로 sideNav 컴포넌트에 전달한다 (props명 : content)
   (참고 : Screen > MyPage > Profile > MyProfile.jsx)

<br><br><br>

## RouteName 컴포넌트 구현 안내
: 페이지 별로  헤더 바로 밑에 '어떤 페이지를 거쳐 어떤 페이지에 도달했는지'를 알려주는 route path
### * 사용방법 ###
- sideNav와 동일
   (참고 : Screen > MyPage > Profile > MyProfile.jsx)

<br><br><br>
## Icon 설정 ##
* 아이콘 라이브러리 링크 : https://heroicons.com/outline
  <br>(선정이유 : react-icons 등 타 아이콘 라이브러리는 vite화 호환이 안되는 이슈 발생)

### 사용방법 ###
1) 위 사이트에서 사용하고자 하는 아이콘을 검색한다
2) jsx 코드를 복사한다
3) Image > Icons에 컴포넌트를 제작한다 (챗지피티한테 시키면 더 빠르게 해줌)
4) 컴포넌트를 import 하듯이 원하는 위치에 import 한다
5) width, height, className 등을 props로 지정해준다
   (참고 : Components > Header > Nav1)

<br><br><br>

## 그 외 ##
button 태그의 border 및 background를 none으로 초기화했습니다 (button 태그 사이에 글씨를 작성하지 않으면 button태그가 화면에 안보일 가능성이 높음, 당황하지 마세요..)
