import styles from "./ProjectList.module.css";
import Button from "../Button/Button.jsx";
import { Link } from "react-router-dom";
import Tech from "./GrayBox.jsx";
import Paging from "../Paging/Paging.jsx";
import useProjListPaging from "./useProjListPaging.js";

function ProjectList({ projects }) {
  //프로젝트 리스트 페이지 커스텀 훅
  const {
    activePage,
    itemsCountPerPage,
    pageRangeDisplayed,
    handlePageChange,
  } = useProjListPaging();

  //실제 렌더링할 데이터 (data를 슬라이스 함 0-9 / 10-19..)
  const renderData = projects.slice(
    (activePage - 1) * itemsCountPerPage,
    activePage * itemsCountPerPage
  );
  //프로젝트 리스트 db에서 postId 갖고올 것
  return (
    <div className={styles.projectList}>
      {renderData.map((project, index) => (
        <div className={styles.projectItem} key={index}>
          {/*제목 + 정보 + 상세내용 + 버튼 */}

          {/*프로젝트 제목 */}
          <div className={styles.projectTitle}>
            <div>{project.title}</div>
          </div>
          {/*프로젝트 정보 : 기간, 지역, 방식, 난이도 */}
          <div className={styles.projectInfo}>
            <div>
              <div className={styles.projectPeriod}>
                기간 | {project.period}
              </div>
            </div>
            <div>
              <div className={styles.projectLocation}>
                지역 | {project.location}
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
              <div className={styles.projectDetail}>{project.content}</div>
            </div>
          </div>

          {/*index -> postId로 변경해야함 */}
          <Link to={`/apply/${index}`}>
            <Button text="신청하기" />
          </Link>
        </div>
      ))}
      <Paging
        activePage={activePage}
        totalItemsCount={projects.length}
        itemsCountPerPage={itemsCountPerPage}
        pageRangeDisplayed={pageRangeDisplayed}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default ProjectList;