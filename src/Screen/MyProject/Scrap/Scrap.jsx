import ProjectList from "../../../Components/ProjectList/ProjectList";
import styles from "./Scrap.module.css";

const projects = [
  {
    title: "웹 사이드 프로젝트 팀원 모집",
    period: "4월 10일 - 5월 10일",
    location: "서울",
    onoff: "오프라인",
    difficulty: "초급",
    stack: ["react", "spring", "R"],
  },

  {
    title: "앱 사이드 프로젝트 팀원 모집",
    period: "4월 10일 - 5월 10일",
    location: "서울",
    onoff: "오프라인",
    difficulty: "초급",
    stack: ["react", "spring"],
  },
];
const Scrap = () => {
  return (
    <div className={styles.Scrap__contWrap}>
      {/*스크랩한 프로젝트*/}

      <div className={styles.Scrap__title}>스크랩</div>
      {/*스크랩한 프로젝트 나열*/}
      <ProjectList projects={projects} />
    </div>
  );
};

export default Scrap;
