# 2024.06.22 변경사항 (필독)
<image src='https://github.com/yezixx/SOLUX_LETS_IT_Frontend/assets/168459001/ad2c0868-0214-442c-9b96-dc9c381126b6' width='500px'/><br>

## 목차 ##
[1) SideNav 컴포넌트 구현 안내](#sidenav-컴포넌트-구현-안내) <br><br>
[2) RouteName 컴포넌트 구현 안내](#routename-컴포넌트-구현-안내) <br><br>
[3) css 변수 설정 안내](#css-변수-설정-안내) <br><br>
[4) Icon 설정 안내](#icon-설정-안내) <br><br> 
[5) 그 외 : button태그 css 초기화](#그-외)<br>
__________________________________________________________________2024.06.22 <br>

[6) Graph 컴포넌트 구현 안내](#graph-컴포넌트-구현-안내)<br><br>
[7) Profile 컴포넌트 구현 안내](#profile-컴포넌트-구현-안내)<br><br>
[8) Button 컴포넌트 구현 안내](#button-컴포넌트-구현-안내)

<br><br>
## sidenav 컴포넌트 구현 안내
: 각 페이지 왼쪽에 위치한 navigator
### * 사용방법 ###
1) sideNav를 사용하고자 하는 상위 컴포넌트에서 sideNav 컴포넌트를 import 한다
2) 상위 컴포넌트에서 배열로 sideNav에 들어갈 data를 만들어준다 (ex. ['프로필 관리, '프로젝트 관리', '개인정보 수정'])
3) 해당 배열을 props로 sideNav 컴포넌트에 전달한다 (props명 : content)
   (참고 : Screen > MyPage > Profile > MyProfile.jsx)


<br><br><br>
## routename 컴포넌트 구현 안내
: 페이지 별로  헤더 바로 밑에 '어떤 페이지를 거쳐 어떤 페이지에 도달했는지'를 알려주는 route path
### * 사용방법 ###
- sideNav와 동일
   (참고 : Screen > MyPage > Profile > MyProfile.jsx)

  
<br><br><br>
## css 변수 설정 안내
index.css에 변수명과 색상코드를 연결해두었습니다.

  ![image](https://github.com/yezixx/SOLUX_LETS_IT_Frontend/assets/168459001/7c0b93d6-22d2-47be-aeca-a04724aeaeab)

### 사용방법 ###
   
1) figma에서 컴포넌트를 클릭하여 색상명을 확인한다 (ex. mainColor2)
2) var(--main-color2) 를 이용하여 색상을 지정한다



<br><br><br>
## Icon 설정 안내
* 아이콘 라이브러리 링크 : https://heroicons.com/outline
  <br>(선정이유 : react-icons 등 타 아이콘 라이브러리는 vite화 호환이 안되는 이슈 발생)

### 사용방법 ###
1) 위 사이트에서 사용하고자 하는 아이콘을 검색한다
2) jsx 코드를 복사한다
3) Image > Icons에 컴포넌트를 제작한다 (챗지피티한테 시키면 더 빠르게 해줌)
4) 컴포넌트를 import 하듯이 원하는 위치에 import 한다
5) width, height, className 등을 props로 지정해준다
   (참고 : Components > Header > Nav1)
-> 제가 디자인할 때 딱히 아이콘을 많이 사용하진 않았어서, 위 방식대로 해도 큰 문제는 없을 것 같습니다

<br><br><br>
## 그 외 
button 태그의 border 및 background를 none으로 초기화했습니다 (button 태그 사이에 글씨를 작성하지 않으면 button태그가 화면에 안보일 가능성이 높음, 당황하지 마세요..)


### 2024.06.22 ###
<br><br><br>
## graph 컴포넌트 구현 안내 
 <image src='https://github.com/yezixx/SOLUX_LETS_IT_Frontend/assets/168459001/8ace8d64-c103-4e1a-9eb4-07d7b560f430' width='300px'><br>
 - value, width, height를 주면 width에 따른 비율을 자동적으로 계산하여 그려줌<br>
 ex) width가 150px일 때 value 50을 전달하면 전체 길이의 절반 만큼만 그림
 - 색, 숫자표시여부, 숫자 위치 등을 커스텀 가능 (value 숫자값을 표시할 것인가?)
 - 기본값은 Graph.jsx 파일 참조


## profile 컴포넌트 구현 안내
<img src='https://github.com/yezixx/SOLUX_LETS_IT_Frontend/assets/168459001/0b2a5f67-22e4-4ab6-9bf5-370d199b96bc' width='500px' /><br>
- user data를 전송하면 프로필을 구현해주는 컴포넌트 제작
- user data는 mock data로 제작하여 테스트함

## button 컴포넌트 구현 안내
- graph와 동일하게 props로 width,height, background-color 등을 받아 커스텀 할 수 있음
- 기본값이 설정돼 있음 (Button.jsx파일 참조)
