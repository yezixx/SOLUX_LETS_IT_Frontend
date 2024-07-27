import { useNavigate } from "react-router-dom";
import ProjectBtn from "../../../Components/Project_Button/ProjectBtn";
import styles from "./AttendProj.module.css";
import { useAtomValue } from "jotai";
import { userIdAtom } from "../../../atoms/atoms";
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
  /*1로 가정, 추후 로그인과 연동 시 로그인한 userId로 변동 */
  const userId = useAtomValue(userIdAtom);
  /*진행 중인 프로젝트 리스트 */
  const [ongoingProj, setOngoingProj] = useState([]);
  const [completeProj, setCompleteProj] = useState([]);

  useEffect(() => {
    //진행 중인 프로젝트
    getMyOngoingProjects(userId)
      .then((res) => {
        // console.log(`getMyAttendProjects에서 가져온 data : ${res}`);
        // console.log(JSON.stringify(res, null, 2));
        setOngoingProj(res.projects);
      })
      .catch((error) => console.log(error));
    //완료한 프로젝트
    getCompleteProjects(userId)
      .then((res) => {
        // console.log(`completeProject 가져온 data : ${res}`);
        // console.log(JSON.stringify(res, null, 2));
        setCompleteProj(res.projects);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  console.log(JSON.stringify(ongoingProj, null, 2)); // 받아온 data 확인
  console.log(JSON.stringify(completeProj, null, 2)); // 받아온 data 확인

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
                onClick1={() => naviagateTo("/teamboard")}
                onClick2={() =>
                  naviagateTo(`/mypage/portfolio/${project.teamId}`)
                }
                button1Text="팀 게시판"
                button2Text="포트폴리오"
                project={project}
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
              <ProjectBtn buttonShow={false} project={project} />
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
