import { useEffect, useState } from "react";
import Button from "../../../../../Components/Button/Button";
import styles from "./CompletePort.module.css";
import { getMyAIPortfolios } from "../../../../../service/portfolioService";
import { useParams } from "react-router-dom";

const CompletePort = () => {
  const { teamId } = useParams();
  const [AIportfolio, setAIportfolio] = useState(null);
  useEffect(() => {
    getMyAIPortfolios(teamId)
      .then((res) => {
        console.log(res);
        setAIportfolio(res.data);
      })
      .catch((error) => {
        alert("AI 포트폴리오를 조회하는 도중 에러가 발생했습니다.");
        console.log(error);
      });
  }, []);
  return (
    <div className={styles.CompletePort__contentWrap}>
      {/*프로젝트명 + 주의문구 + AI로 생성된 포폴 */}

      {/*프로젝트명 + 주의 문구*/}
      <div className={styles.CompletePort__title}>
        OPEN AI 활용 프로젝트
        {/*생성형 AI 포폴 주의 문구 */}
        <div className={styles.CompletePort__warning}>
          생성형 AI가 요약 작성한 내용으로, 참고용으로 활용하시기 바랍니다
        </div>
      </div>

      {/*AI로 생성된 포폴 */}
      <div className={styles.CompletePort__content}>{AIportfolio}</div>
      <div className={styles.CompletePort__saveBtn}>
        <Button text="저장" />
      </div>
    </div>
  );
};

export default CompletePort;
