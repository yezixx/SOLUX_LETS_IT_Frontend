import styles from "./MyPortfolio.module.css";
import PortfolioBtn from "../../../Components/Project_Button/PortfolioBtn";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPortfolioList } from "../../../service/portfolioService";

const MyPortfolio = () => {
  //백엔드에서 포트폴리오 리스트 가져옴
  const [PortfolioList, setPortfolioList] = useState([]);
  useEffect(() => {
    getPortfolioList()
      .then((res) => {
        console.log(res);
        setPortfolioList(res.data);
      })
      .catch((error) => {
        alert("포트폴리오 리스트를 가져오는 중 오류 발생");
        console.log(error);
      });
  }, []);
  return (
    <div className={styles.myPortfolio__contentWrap}>
      {/*지금 작성할 수 있는 포트폴리오 + 포트폴리오 열람 */}

      {/*지금 작성할 수 있는 포트폴리오 */}
      <div className={styles.myPortfolio__writePortfolio}>
        {/*제목 */}
        <div className={styles.myPortfolio__title}>내 포트폴리오</div>
        {/*열람할 수 있는 포트폴리오 나열 */}
        <div className={styles.myPortfolio__cont}>
          {/*백엔드 연결 후에 teamId 매핑시켜줘야 함 */}
          {PortfolioList.map((item) => (
            //Object.keys(item) -  teamId
            //Object.values(item) - prjTitle
            <Link
              to={`board/${Object.keys(item)[0]}`}
              key={Object.keys(item)[0]}
            >
              <PortfolioBtn
                prjTitle={Object.values(item)[0]}
                buttonShow={false}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPortfolio;
