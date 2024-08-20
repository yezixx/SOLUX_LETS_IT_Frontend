import Button from "../button/Button";
import styles from "./ProjectBtn.module.css";
import ProjectBtnPhoto from "./ProjectBtnPhoto";

const ProjectBtn = ({
  //포트폴리오 작성, 삭제 버튼을 보여줄 것인가
  buttonShow = true,
  onClick1 = undefined,
  onClick2 = undefined,
  onClick = undefined,
  button1Text = "add text",
  button2Text = "add text",
  prjTitle, //부모 요소에서 전달한 project title,
  imgSrc
}) => {
  return (
    <div onClick={onClick} className={styles.ProjectBtn__box}>
      {/*프로젝트명 */}
      <div className={styles.ProjectBtn__title}>
        {/*부모 객체로부터 오는 시간 동안 '로딩'을 보여줌 */}
        {prjTitle ? prjTitle : "Loading"}
      </div>

      {/*프로젝트 참석자 프로필 사진 - 백엔드 잇고 map으로 수정할 예정*/}
      <div className={styles.ProjectBtn__photo}>
        <div className={styles.member1}>
          <ProjectBtnPhoto imgSrc={imgSrc && imgSrc[0]} />
          {/* <PortfolioBtnPhoto photo={project.teamMembers[0].profile_url} /> */}
        </div>
        <div className={styles.member2}>
          {/* <PortfolioBtnPhoto photo={project.teamMembers[1].profile_url} /> */}
          <ProjectBtnPhoto imgSrc={imgSrc && imgSrc[1]} />
        </div>
        <div className={styles.member3}>
          {/* <PortfolioBtnPhoto photo={project.teamMembers[2].profile_url} /> */}
          <ProjectBtnPhoto imgSrc={imgSrc && imgSrc[2]} />
        </div>
      </div>

      {/*포트폴리오 작성,삭제 버튼 */}
      {buttonShow ? (
        <div className={styles.ProjectBtn__button}>
          <Button onClick={onClick1} text={button1Text} />
          <Button onClick={onClick2} text={button2Text} type="SEC_120x40" />
        </div>
      ) : null}
    </div>
  );
};

export default ProjectBtn;
