import styles from "./APILogIn.module.css";
import KakaoLoginImage from "../../assets/kakao_login.png";
import Logo from "../../assets/logo.svg?react";
import { KAKAO_AUTH_URL } from "../../api/kakaoApi";

const APILogIn = () => {
  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <Logo width="200px" />
        <a href={KAKAO_AUTH_URL}>
          <img src={KakaoLoginImage} alt="카카오 로그인" />
        </a>
      </div>
    </div>
  );
};
export default APILogIn;
