import { useNavigate } from "react-router-dom";
import ProjectBtn from "../../../Components/Project_Button/ProjectBtn";
import styles from "./AttendProj.module.css";
import { useEffect, useState } from "react";
import { getMyOnGoingProjects } from "../../../service/projectService";
import { useAtomValue } from "jotai";
import { userIdAtom } from "../../../atoms/atoms";

const OngoingProj = () => {
  const navigate = useNavigate();
  const naviagateTo = (link) => {
    navigate(link);
  };
  /*1로 가정, 추후 로그인과 연동 시 로그인한 userId로 변동 */
  const userId = useAtomValue(userIdAtom);
  /*진행 중인 프로젝트 리스트 */
  const [ongoingProj, setOngoingProj] = useState([]);

  useEffect(() => {
    getMyOnGoingProjects(userId)
      .then((res) => {
        //확인 필요
        setOngoingProj(res.data);
      })
      .catch((error) => console.log(error));
  });
  return (
    <div className={styles.ongoingProj__contWrap}>
      {/*진행 중인 프로젝트 + 팀원 평가*/}

      {/*진행중인 프로젝트 */}
      <div className={styles.ongoingProj__ongoingproj}>
        {/*제목 */}
        <div className={styles.ongoingProj__title}>진행중인 프로젝트</div>
        {/*작성할 수 있는 포트폴리오 나열 , key값으로 prjId 할당*/}
        {ongoingProj.map((item) => {
          <div className={styles.ongoingProj__cont}>
            <ProjectBtn
              onClick1={() => naviagateTo("/teamboard")}
              onClick2={() => naviagateTo("/mypage/portfolio/board")}
              button1Text="팀 게시판"
              button2Text="포트폴리오"
            />
          </div>;
        })}
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
