import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = (props) => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  //인가코드 백으로 보내는 코드
  useEffect(() => {
    const kakaoLogin = async () => {
      await axios({
        method: "GET",
        url: `${import.meta.env.VITE_REDIRECT_URL}/?code=${code}`,
        headers: {
          "Content-Type": "application/json;charset=utf-8", //json형태로 데이터를 보내겠다는뜻
          "Access-Control-Allow-Origin": "*", //cors 에러 방지
        },
      }).then((res) => {
        //백에서 완료후 우리사이트 전용 토큰 넘겨받음
        console.log(res);
        //사용할 정보 localstorage에 저장
        localStorage.setItem("name", res.data.account.kakaoName);
        //로그인이 성공하면 이동할 페이지
        navigate("/");
      });
    };
    kakaoLogin();
  }, [props.history]);
  return <h1>로그인 중입니다.</h1>;
};

export default Redirect;
