import { useParams } from "react-router-dom";
import styles from "./PortfolioDetail.module.css";
import { useEffect, useState } from "react";
import { getMyDetailPortfolios } from "../../../../service/portfolioService";

const PortfolioDetail = () => {
  const { prtId, teamId } = useParams();
  /*프로젝트 상세 데이터 담을 state */
  const [prtDetailList, setPrtDetailList] = useState({});

  useEffect(() => {
    getMyDetailPortfolios(prtId, teamId)
      .then((res) => {
        console.log(res.data);
        setPrtDetailList(res.data); //확인 필요
      })
      .catch((error) =>
        console.log(`Error get portfolioDetail list : ${error}`)
      );
  }, [setPrtDetailList]);
  //prtId 기반으로 포트폴리오 리스트 불러올 것
  return (
    <div className={styles.portfolioDetail__wrap}>
      <div className={styles.portfolioDetail__prjTitle}>
        오픈 AI 활용 프로젝트
      </div>
      {/*포트폴리오 컨테이너 */}
      <div className={styles.portfolioDetail__portfolioContainer}>
        <div className={styles.portfolioDetail__prtTitle}>
          {prtDetailList.prtTitle}
        </div>
        {/*담당역할 + 스택 */}
        {/*담당역할 */}
        {/* <div className={styles.portfolioDetail__rolestack}>
          <div className={styles.portfolioDetail__container}>
            <div className={styles.portfolioDetail__detailTitle}>담당역할</div>
            <div className={styles.portfolioDetail__contentsBox1}></div>
          </div> */}
        {/*스택*/}
        {/* <div className={styles.portfolioDetail__container}>
            <div className={styles.portfolioDetail__detailTitle}>사용 스택</div>
            <div className={styles.portfolioDetail__contentsBox1}></div>
          </div>
        </div> */}

        {/*이번 주 한 일*/}
        <div className={styles.portfolioDetail__container}>
          <div className={styles.portfolioDetail__detailTitle}>
            이번 주 한 일
          </div>
          <div className={styles.portfolioDetail__contentsBox2}>
            {prtDetailList.workDescription}
          </div>
        </div>
        <div className={styles.portfolioDetail__problemSolution}>
          {/*발생한 문제 / 어려움*/}
          <div className={styles.portfolioDetail__container}>
            <div className={styles.portfolioDetail__detailTitle}>
              발생한 문제 / 어려움
            </div>
            <div className={styles.portfolioDetail__contentsBox2}>
              {prtDetailList.issues}
            </div>
          </div>
          {/*해결 방법*/}
          <div className={styles.portfolioDetail__container}>
            <div className={styles.portfolioDetail__detailTitle}>해결 방법</div>
            <div className={styles.portfolioDetail__contentsBox2}>
              {prtDetailList.solutions}
            </div>
          </div>
        </div>
        {/*새로 알게된 점 깨달은 점*/}
        <div className={styles.portfolioDetail__container}>
          <div className={styles.portfolioDetail__detailTitle}>
            새로 알게된 점 / 깨달은 점
          </div>
          <div className={styles.portfolioDetail__contentsBox2}>
            {prtDetailList.feedback}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetail;
