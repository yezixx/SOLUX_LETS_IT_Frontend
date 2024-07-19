import React from "react";
import styles from "./ProjectList.module.css";
import Tech from "../SearchProject/Stack";

function ProjectList({ projects }) {
  return (
    <div className={styles.projectList}>
      {projects.map((project, index) => (
        <div className={styles.projectItem} key={index}>
          <div className={styles.projectCont}>
            <div className={styles.stack}>
              {project.stack &&
                project.stack.map((tech, idx) => (
                  <Tech key={idx} tech={tech}>
                    {tech}
                  </Tech>
                ))}
            </div>
            {/*프로젝트 세부사항 */}
            <div className={styles.projectlist__content}>
              <div className={styles.projectTitle}>
                <text>{project.title}</text>
              </div>
              <div>
                <text className={styles.projectPeriod}>
                  기간 | {project.period}
                </text>
              </div>
              <div>
                <text className={styles.projectLocation}>
                  지역 | {project.location}
                </text>
              </div>
              <div>
                <text className={styles.projectLocation}>
                  {" "}
                  방식 | {project.onoff}
                </text>
              </div>
              <div>
                <text className={styles.projectDifficulty}>
                  난이도 | {project.difficulty}
                </text>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
