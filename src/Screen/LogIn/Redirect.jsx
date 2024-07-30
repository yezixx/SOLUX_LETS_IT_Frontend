import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { isLoginAtom, userAtom } from "../../atoms/atoms";
import apiClient, { updateApiClientToken } from "../../service/apiClient";

const Redirect = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const setIsLogIn = useSetAtom(isLoginAtom);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const res = await apiClient.get(
          `/login/oauth2/callback/kakao?code=${code}`
        );
        console.log(res);

        setIsLogIn(true);
        const userData = res.data.user;
        const TOKEN = res.data.token;
        setUser(userData);
        console.log(`user state : ${user}`);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", TOKEN);
        updateApiClientToken(TOKEN);

        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      } catch (error) {
        console.error("Login failed:", error);
      }
    };

    if (code) {
      kakaoLogin();
    }
  }, [code, navigate, setIsLogIn, setUser, user]);

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
