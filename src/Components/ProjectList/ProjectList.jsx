import React from "react";
import styles from "./ProjectList.module.css";
import Stack from "../SearchProject/GrayBox";
import { useNavigate } from "react-router-dom";

function ProjectList({ project }) {
  const nav = useNavigate();
  console.log(project);
  function formatTimeAgo(createdAt) {
    const now = new Date();
    const createdDate = new Date(createdAt);

    // Validate if createdDate is a valid date
    if (isNaN(createdDate.getTime())) {
      return "Invalid date";
    }

    const diffInMs = now - createdDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      return `${diffInDays}일 전`;
    }
  }
  return (
    <div className={styles.projectList}>
      {project && (
        <div
          className={styles.projectItem}
          key={project.postId}
          onClick={() => {
            nav(`/projects/detail/${project.postId}`);
          }}
        >
          <div className={styles.projectCont}>
            <div className={styles.stack}>
              {project.stack &&
                project.stack.map((tech, idx) => (
                  <Stack key={idx} tech={tech}>
                    {tech}
                  </Stack>
                ))}
            </div>
            {/*프로젝트 세부사항 */}
            <div className={styles.projectlist__content}>
              {/* 프로젝트 제목 */}
              <div className={styles.projectTitle}>
                <div>{project.title}</div>
              </div>
              {/* 프로젝트 기간 */}
              <div>
                <div className={styles.projectPeriod}>
                  <span>기간 </span>
                  <span>| </span>
                  {project.projectPeriod}
                </div>
              </div>
              {/* 프로젝트 지역 */}
              <div>
                <div className={styles.projectLocation}>
                  {project.onOff === "대면" && (
                    <>
                      <span>지역</span>
                      <span> |</span> {project.region} {project.subRegion}
                    </>
                  )}
                </div>
              </div>
              {/* 프로젝트 방식 */}
              <div>
                <div className={styles.projectLocation}>
                  <span>방식</span> <span>| </span>
                  {project.onOff}
                  {project.onoff}
                </div>
              </div>
              {/* 프로젝트 난이도 */}
              <div>
                <div className={styles.projectDifficulty}>
                  <span> 난이도</span>
                  <span> | </span> {project.difficulty}
                </div>
              </div>
              {/* 프로젝트 생성 시간 */}
              <div className={styles.timeAgo}>
                {project.createdAt && (
                  <span>{formatTimeAgo(project.createdAt)}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectList;
