import React from "react";
import styles from "./ProjectList.module.css";
import Stack from "../SearchProject/GrayBox";
import { useNavigate } from "react-router-dom";
/*db 배열자체를 projects로 보내줄 것 */
/*객체의 key 값을 백엔드와 맞출 필요 있음 */
function ProjectList({ project }) {
  //백엔드 없을 경우 null이 되도록 설정 (오류화면 방지)
  const nav = useNavigate();

  console.log(project);
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
              <div className={styles.projectTitle}>
                <div>{project.title}</div>
              </div>
              <div>
                <div className={styles.projectPeriod}>
                  <span>기간 </span>
                  <span>| </span>
                  {project.projectPeriod}
                </div>
              </div>
              <div>
                <div className={styles.projectLocation}>
                  {project.regionId === "대면" && (
                    <>
                      <span>지역</span>
                      <span> |</span> {project.regionId} {project.subRegionId}
                    </>
                  )}
                </div>
              </div>
              <div>
                <div className={styles.projectLocation}>
                  <span>방식</span> <span>| </span>
                  {project.onoff}
                </div>
              </div>
              <div>
                <div className={styles.projectDifficulty}>
                  <span> 난이도</span>
                  <span> | </span> {project.difficulty}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectList;
