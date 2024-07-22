import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useSetAtom } from "jotai";
import { isLoginAtom } from "../../atoms/atoms";

const Redirect = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const setIsLogIn = useSetAtom(isLoginAtom);
  console.log(code);
  //인가코드 백으로 보내는 코드
  useEffect(() => {
    const kakaoLogin = async () => {
      await axios({
        method: "GET",
        url: `${import.meta.env.VITE_REDIRECT_URL}/?code=${code}`,
        headers: {
          "Content-Type": "application/json;charset=utf-8", //json형태로 데이터를 보내겠다는뜻
        },
      }).then((res) => {
        console.log(JSON.stringify(res, null, 1));
        //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면
        setIsLogIn(true);
        const userData = res.data.user;
        //계속 쓸 정보들( ex: 이름) 등은 localStorage에 저장해두자
        localStorage.setItem("user", JSON.stringify(userData));
        //로그인 상태 true로 변경
        localStorage.setItem("isLoggedIn", "true");
        //로그인이 성공하면 이동할 페이지
        navigate("/");
      });
    };
    if (code) {
      kakaoLogin();
    }
  }, [code, navigate]);

  return (
    <div className="LoginHandeler">
      <div className="notice">
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default Redirect;
