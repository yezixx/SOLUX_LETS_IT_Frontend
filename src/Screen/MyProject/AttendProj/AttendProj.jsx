import { useNavigate } from "react-router-dom";
import ProjectBtn from "../../../Components/Project_Button/PortfolioBtn";
import styles from "./AttendProj.module.css";
import { useEffect, useState } from "react";
import {
  getCompleteProjects,
  getMyOngoingProjects,
} from "../../../service/projectService";

const OngoingProj = () => {
  const navigate = useNavigate();
  const naviagateTo = (link) => {
    navigate(link);
  };
  /*진행 중인 프로젝트 리스트 */
  const [ongoingProj, setOngoingProj] = useState([]);
  const [completeProj, setCompleteProj] = useState([]);

  useEffect(() => {
    //진행 중인 프로젝트
    getMyOngoingProjects()
      .then((res) => {
        setOngoingProj(res.data);
      })
      .catch((error) => console.log(error));
    //완료한 프로젝트
    getCompleteProjects()
      .then((res) => {
        // console.log(`completeProject 가져온 data : ${res}`);
        // console.log(JSON.stringify(res, null, 2));
        console.log(res.data);
        setCompleteProj(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={styles.ongoingProj__contWrap}>
      {/*진행 중인 프로젝트 + 팀원 평가*/}

      {/*진행중인 프로젝트 */}
      <div className={styles.ongoingProj__ongoingproj}>
        {/*제목 */}
        <div className={styles.ongoingProj__title}>진행중인 프로젝트</div>
        {/*작성할 수 있는 포트폴리오 나열 , key값으로 prjId 할당*/}
        <div className={styles.attendProj__container}>
          {ongoingProj.map((project) => (
            <div key={project.teamId} className={styles.ongoingProj__cont}>
              <ProjectBtn
                onClick1={() =>
                  naviagateTo(`/teamboard/?team=${project.teamId}`)
                }
                onClick2={() =>
                  naviagateTo(`/mypage/portfolio/board/${project.teamId}`)
                }
                button1Text="팀 게시판"
                button2Text="포트폴리오"
                prjTitle={project.prjTitle}
              />
            </div>
          ))}
        </div>
      </div>

      {/*제목 */}
      <div className={styles.ongoingProj__ongoingproj}>
        <div className={styles.ongoingProj__title}>완료한 프로젝트</div>
        {/*작성할 수 있는 포트폴리오 나열 */}
        <div className={styles.attendProj__container}>
          {completeProj.map((project) => (
            <div key={project.teamId} className={styles.ongoingProj__cont}>
              <ProjectBtn buttonShow={false} prjTitle={project.prjTitle} />
            </div>
          ))}
        </div>
      </div>

      {/*팀원평가 */}
      <div className={styles.ongoingProj__teamEvaluation}>
        {/*제목 */}
        <div className={styles.ongoingProj__title}>팀원 평가</div>
        {/*팀원평가가 가능한 프로젝트 나열 */}
        <div className={styles.ongoingProj__cont}>
          {/* <ProjectBtn buttonShow={false} /> */}
        </div>
      </div>
    </div>
  );
};

export default OngoingProj;
