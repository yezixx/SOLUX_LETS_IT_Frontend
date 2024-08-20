import styles from "./MainHome.module.css";

import MainTitle from "./MainTitle/MainTitle";
import MainManageButton from "./QuickButton/QuickButton";
import RecommendProject from "./RecommendProject/RecommendProject";
import PopularProject from "./PopularProject/PopularProject";

import Contest from "./contest/Contest";
import News from "./News/News";

function MainHome() {
  return (
    <div className={styles.wrap}>
      <MainTitle />
      <MainManageButton />
      <RecommendProject />
      <PopularProject />
      <div className={styles.contestnews}>
        <Contest />
        <div className={styles.news}>
          <News />
        </div>
      </div>
      <div className={styles.main}>
        {/*<MyProfile />*/} {/*라우팅 시 outlet이 들어갈 부분*/}
      </div>
    </div>
  );
}

export default MainHome;
