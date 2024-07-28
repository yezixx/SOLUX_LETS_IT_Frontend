import React from "react";
import styles from "./ProjectList.module.css";
import Stack from "../SearchProject/GrayBox";
/*db 배열자체를 projects로 보내줄 것 */
/*객체의 key 값을 백엔드와 맞출 필요 있음 */
function ProjectList({ projects }) {
  return (
    <div className={styles.projectList}>
      {projects.map((project, index) => (
        <div className={styles.projectItem} key={index}>
          <div className={styles.projectCont}>
            <div className={styles.stack}>
              {project.requiredStack &&
                project.requiredStack.map((tech, idx) => (
                  <Stack key={idx} tech={tech}>
                    {tech}
                  </Stack>
                ))}
            </div>
            {/*프로젝트 세부사항 */}
            <div className={styles.projectlist__content}>
              <div className={styles.projectTitle}>
                <div>{project.prtTitle}</div>
              </div>
              <div>
                <div className={styles.projectPeriod}>
                  기간 | {project.period}
                </div>
              </div>
              <div>
                <div className={styles.projectLocation}>
                  지역 | {project.regionId}
                </div>
              </div>
              <div>
                <div className={styles.projectLocation}>
                  방식 | {project.onoff}
                </div>
              </div>
              <div>
                <div className={styles.projectDifficulty}>
                  난이도 | {project.difficulty}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;