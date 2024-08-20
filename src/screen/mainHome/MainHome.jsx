import styles from "./MainHome.module.css";

import MainTitle from "./mainTitle/MainTitle";
import QuickButton from "./quickButton/QuickButton";
import RecommendProject from "./recommendProject/RecommendProject";
import PopularProject from "./popularProject/PopularProject";

import Contest from "./contest/Contest";
import News from "./newsLetter/NewsLetter";

function MainHome() {
  return (
    <div className={styles.wrap}>
      <MainTitle />
      <QuickButton />
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
