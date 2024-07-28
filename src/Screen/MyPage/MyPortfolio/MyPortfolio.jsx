import styles from "./MyPortfolio.module.css";
import PortfolioBtn from "../../../Components/Project_Button/ProjectBtn";
import { Link, useNavigate } from "react-router-dom";

const MyPortfolio = () => {
  //버튼 누를 시 위치 이동, 이벤트 핸들러
  const navigate = useNavigate();
  const navigateTo = (link) => {
    navigate(link);
  };
  //(수정) 백엔드 db에서 teamId 받아옴
  const teamId = 1;
  return (
    <div className={styles.myPortfolio__contentWrap}>
      {/*지금 작성할 수 있는 포트폴리오 + 포트폴리오 열람 */}

      {/*지금 작성할 수 있는 포트폴리오 */}
      <div className={styles.myPortfolio__writePortfolio}>
        {/*제목 */}
        <div className={styles.myPortfolio__title}>
          지금 작성할 수 있는 포트폴리오
        </div>
        {/*작성할 수 있는 포트폴리오 나열 */}
        <div className={styles.myPortfolio__cont}>
          <PortfolioBtn
            onClick1={() => {
              navigateTo(`post/${teamId}`);
            }}
            onClick2={() => {
              navigateTo(`/`); //임시로 홈화면 이동 설정
            }}
            button1Text="작성하기"
            button2Text="삭제"
          />
        </div>
      </div>

      {/*포트폴리오 열람하기 */}
      <div className={styles.myPortfolio__portfolioView}>
        {/*제목 */}
        <div className={styles.myPortfolio__title}>포트폴리오 열람하기</div>
        {/*열람할 수 있는 포트폴리오 나열 */}
        <div className={styles.myPortfolio__cont}>
          {/*백엔드 연결 후에 teamId 매핑시켜줘야 함 */}
          <Link to={`board/${teamId}`}>
            <PortfolioBtn buttonShow={false} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyPortfolio;
