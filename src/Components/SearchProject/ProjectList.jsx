import React from "react";
import styles from "./ProjectList.module.css";
import Button from "../Button/Button.jsx";
import { Link } from "react-router-dom";
import Tech from "./Stack.jsx";

function ProjectList({ projects }) {
  //프로젝트 리스트 db에서 postId 갖고올 것
  return (
    <div className={styles.projectList}>
      {projects.map((project, index) => (
        <div className={styles.projectItem} key={index}>
          {/*제목 + 정보 + 상세내용 + 버튼 */}

          {/*프로젝트 제목 */}
          <div className={styles.projectTitle}>
            <text>{project.title}</text>
          </div>
          {/*프로젝트 정보 : 기간, 지역, 방식, 난이도 */}
          <div className={styles.projectInfo}>
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
                방식 | {project.onoff}
              </text>
            </div>
            <div>
              <text className={styles.projectDifficulty}>
                난이도 | {project.difficulty}
              </text>
            </div>
          </div>
          {/*프로젝트 스택 + 세부사항 */}
          <div className={styles.projectStackContent}>
            <div className={styles.stack}>
              {project.stack &&
                project.stack.map((tech, idx) => (
                  <Tech key={idx} tech={tech}>
                    {tech}
                  </Tech>
                ))}
            </div>
            <div>
              <text className={styles.projectDetail}>{project.content}</text>
            </div>
          </div>

          {/*index -> postId로 변경해야함 */}
          <Link to={`/apply/${index}`}>
            <Button text="신청하기" />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
