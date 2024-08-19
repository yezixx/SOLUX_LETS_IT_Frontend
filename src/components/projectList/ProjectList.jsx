import React, { useState } from "react";
import styles from "./ProjectList.module.css";
import Button from "../button/Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import Tech from "../grayBox/GrayBox.jsx";
import Paging from "../paging/Paging.jsx";
import useProjListPaging from "./useProjListPaging.js";
import BookmarkIcon from "../../Image/Icons/BookmarkIcon.jsx";

function ProjectList({ projects }) {
  const nav = useNavigate();

  // 스크랩 상태 관리
  const [savedProjects, setSavedProjects] = useState({});

  // 프로젝트 리스트 페이지 커스텀 훅
  const {
    activePage,
    itemsCountPerPage,
    pageRangeDisplayed,
    handlePageChange
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

  // 시간 계산 함수
  const formatTimeAgo = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
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
  };

  return (
    <div className={styles.projectList}>
      {renderData.map((project) => (
        <div
          className={styles.projectItem}
          key={project.postId}
          onClick={() => {
            nav(`/projects/detail/${project.postId}`);
          }}
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
                <span>기간</span> <span> | </span>
                {project.projectPeriod}
              </div>
            </div>
            {project.onOff === "대면" && (
              <div>
                <div className={styles.projectLocation}>
                  <span>지역</span> <span> | </span> {project.region}{" "}
                  {project.subRegion}
                </div>
              </div>
            )}
            <div>
              <div className={styles.projectLocation}>
                <span>방식</span> <span> | </span>
                {project.onOff}
              </div>
            </div>
            <div>
              <div className={styles.projectDifficulty}>
                <span>난이도</span> <span> | </span>
                {project.difficulty}
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
          <div>
            <button
              className={styles.save}
              onClick={(e) => {
                e.stopPropagation(); // 클릭 이벤트가 부모에 전달되지 않도록 함
                handleSaveClick(project.postId);
              }}
            >
              {savedProjects[project.postId] ? (
                <BookmarkIcon width="30px" height="30px" isBookmark={true} />
              ) : (
                <BookmarkIcon width="30px" height="30px" isBookmark={false} />
              )}
            </button>
            {/* 생성 시간 */}
            <div className={styles.timeAgo}>
              <span>{formatTimeAgo(project.createdAt)}</span>
            </div>
          </div>
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
