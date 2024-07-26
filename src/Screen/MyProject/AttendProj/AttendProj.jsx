import { useNavigate } from "react-router-dom";
import ProjectBtn from "../../../Components/Project_Button/ProjectBtn";
import styles from "./AttendProj.module.css";
import { useEffect } from "react";

const OngoingProj = () => {
  const navigate = useNavigate();
  const naviagateTo = (link) => {
    navigate(link);
  };
  useEffect(()=>{
    
  })
  return (
    <div className={styles.ongoingProj__contWrap}>
      {/*진행 중인 프로젝트 + 팀원 평가*/}

      {/*진행중인 프로젝트 */}
      <div className={styles.ongoingProj__ongoingproj}>
        {/*제목 */}
        <div className={styles.ongoingProj__title}>진행중인 프로젝트</div>
        {/*작성할 수 있는 포트폴리오 나열 */}
        <div className={styles.ongoingProj__cont}>
          <ProjectBtn
            onClick={() => naviagateTo("/teamboard")}
            button1Text="팀 게시판"
            button2Text="포트폴리오"
          />
        </div>
      </div>

      {/*제목 */}
      <div className={styles.ongoingProj__ongoingproj}>
        <div className={styles.ongoingProj__title}>완료한 프로젝트</div>
        {/*작성할 수 있는 포트폴리오 나열 */}
        <div className={styles.ongoingProj__cont}>
          <ProjectBtn buttonShow={false} />
        </div>
      </div>

      {/*팀원평가 */}
      <div className={styles.ongoingProj__teamEvaluation}>
        {/*제목 */}
        <div className={styles.ongoingProj__title}>팀원 평가</div>
        {/*팀원평가가 가능한 프로젝트 나열 */}
        <div className={styles.ongoingProj__cont}>
          <ProjectBtn buttonShow={false} />
          <ProjectBtn buttonShow={false} />
          <ProjectBtn buttonShow={false} />
        </div>
      </div>
    </div>
  );
};

export default OngoingProj;
