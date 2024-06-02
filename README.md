# 2024.06.02 변경사항 (필독)
### css 변수 설정
index.css에 변수명과 색상코드를 연결해두었습니다.

  ![image](https://github.com/yezixx/SOLUX_LETS_IT_Frontend/assets/168459001/7c0b93d6-22d2-47be-aeca-a04724aeaeab)

* 사용방법
  
1) figma에서 컴포넌트를 클릭하여 색상명을 확인한다 (ex. mainColor2)
2) var(--main-color2) 를 이용하여 색상을 지정한다

### header detail 수정
1) css명 변경
2) 서브네비게이터에 마우스가 올라갈 때 네비게이터 버튼에서 색상, 아래쪽 border이 사라지는 issue 해결
   (서브네비게이터에 마우스가 올라가 있으면 상위 네비게이터 button의 글자색과 border-bottom은 하늘색으로 유지)
