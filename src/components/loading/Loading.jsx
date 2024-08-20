import styles from "./Loading.module.css";
import Spinner from "../../assets/loadingSpin.gif";

const Loading = () => {
  return (
    <div className={styles.Loading}>
      <div className={styles.Loading__text}>잠시만 기다려 주세요</div>
      <img src={Spinner} alt="loading" width="5%" />
    </div>
  );
};

export default Loading;
