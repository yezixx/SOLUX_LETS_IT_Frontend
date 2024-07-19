import styles from "./MainHome.module.css";

import MainTitle from "../../Components/MainTitle/MainTitle";
import MainManageButton from "../../Components/MainManegeButton/MainManageButton";
import RecommendProject from "../../Components/RecommendProject/RecommendProject";
import PopularProject from "../../Components/PopularProject/PopularProject";

import Contest from "../../Components/Contest/Contest";
import News from "../../Components/News/News";

function MainHome() {
  return (
  <div className={styles.wrap}>
    
    <MainTitle />
    <MainManageButton/>
    <RecommendProject />
    <PopularProject />
    <div className={styles.contestnews}>
      <Contest/>
      <News/>

    </div>
    <div className={styles.main}> 
    {/*<MyProfile />*/} {/*라우팅 시 outlet이 들어갈 부분*/}
    </div>
  </div>
  )
}

export default MainHome;