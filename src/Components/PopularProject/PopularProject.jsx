import React from "react";
import ProjectList from "../RecommendProject/ProjectList";
import styles from "./PopularProject.module.css";

function PopularProject() {
  const projects = [
    {
      prtTitle: "웹 사이드 프로젝트 팀원 모집",
      period: "4월 10일 - 5월 10일",
      regionId: "서울",
      onoff: "오프라인",
      difficulty: "초급",
      requiredStack: ["react", "spring", "R"],
    },
    {
      prtTitle: "웹 사이드 프로젝트 팀원 모집",
      period: "4월 10일 - 5월 10일",
      regionId: "서울",
      onoff: "오프라인",
      difficulty: "초급",
      requiredStack: ["react", "spring", "R"],
    },
    {
      prtTitle: "웹 사이드 프로젝트 팀원 모집",
      period: "4월 10일 - 5월 10일",
      regionId: "서울",
      onoff: "오프라인",
      difficulty: "초급",
      requiredStack: ["react", "spring", "R"],
    },
    {
      prtTitle: "웹 사이드 프로젝트 팀원 모집",
      period: "4월 10일 - 5월 10일",
      regionId: "서울",
      onoff: "오프라인",
      difficulty: "초급",
      requiredStack: ["react", "spring", "R"],
    },
  ];

  return (
    <div className={styles.popularproj}>
      <div className={styles.popularproj_content}>
        <div className={styles.text}>지금 인기있는 프로젝트 🔥 </div>
        <div>
          <ProjectList projects={projects} />
        </div>
      </div>
    </div>
  );
}

export default PopularProject;
