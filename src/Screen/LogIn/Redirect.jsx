import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { isLoginAtom, userAtom } from "../../atoms/atoms";
import apiClient, { updateApiClientToken } from "../../service/apiClient";
import Loading from "../../components/Loading/Loading";

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

  return <Loading />;
};

export default Redirect;
