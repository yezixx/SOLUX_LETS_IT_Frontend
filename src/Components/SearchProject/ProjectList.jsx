import React, { useState } from "react";
import styles from "./ProjectList.module.css";
import Button from "../Button/Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import Tech from "./GrayBox.jsx";
import Paging from "../Paging/Paging.jsx";
import useProjListPaging from "./useProjListPaging.js";

function ProjectList({ projects }) {
  const nav = useNavigate();
  
  // 스크랩 상태 관리
  const [savedProjects, setSavedProjects] = useState({});

  // 프로젝트 리스트 페이지 커스텀 훅
  const {
    activePage,
    itemsCountPerPage,
    pageRangeDisplayed,
    handlePageChange,
  } = useProjListPaging();

  // 실제 렌더링할 데이터 (data를 슬라이스 함 0-9 / 10-19..)
  const renderData = projects.slice(
    (activePage - 1) * itemsCountPerPage,
    activePage * itemsCountPerPage
  );

  // 스크랩 상태를 관리하는 함수
  const handleSaveClick = (postId) => {
    setSavedProjects((prevSavedProjects) => ({
      ...prevSavedProjects,
      [postId]: !prevSavedProjects[postId]
    }));
  };

  return (
    <div className={styles.projectList}>
      {renderData.map((project) => (
        <div
          className={styles.projectItem}
          key={project.postId}
          onClick={() => { nav(`/projects/detail/${project.postId}`) }}
        >
          {/*제목 + 정보 + 상세내용 + 버튼 */}

          {/*프로젝트 제목 */}
          <div className={styles.projectTitle}>
            <div>{project.title}</div>
          </div>
          {/*프로젝트 정보 : 기간, 지역, 방식, 난이도 */}
          <div className={styles.projectInfo}>
            <div>
              <div className={styles.projectPeriod}>
                기간 | {project.projectPeriod}
              </div>
            </div>
            <div>
              <div className={styles.projectLocation}>
                지역 | {project.region} {project.subRegion}
              </div>
            </div>
            <div>
              <div className={styles.projectLocation}>
                방식 | {project.onOff}
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

       
            <Link to={`/apply/${project.postId}`}>
              <Button text="신청하기" />
            </Link>
            <button
              className={styles.save}
              onClick={(e) => {
                e.stopPropagation(); // 클릭 이벤트가 부모에 전달되지 않도록 함
                handleSaveClick(project.postId);
              }}
            >
              {savedProjects[project.postId] ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
              )}
            </button>
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
