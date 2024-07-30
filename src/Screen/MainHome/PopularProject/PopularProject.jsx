import ProjectList from "../../../Components/ProjectList/ProjectList";
import styles from "./PopularProject.module.css";
import { getPostsList } from "../../../service/postService";
import React, { useState, useEffect } from "react";

function PopularProject() {
  const [projList, setProjList] = useState([]);
  const [sortedList, setSortedList] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getPostsList();
        setProjList(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);
  useEffect(() => {
    if (projList.length > 0) {
      const sorted = [...projList].sort((a, b) => b.viewCount - a.viewCount);
      setSortedList(sorted);
    }
  }, [projList]);


  return (
    <div className={styles.popularproj}>
    <div className={styles.popularproj_content}>
      <div className={styles.text}>지금 인기있는 프로젝트 🔥 </div>
      <div className={styles.popularproj__container}>
      {sortedList.length > 0 ? (
        sortedList.slice(0, 4).map((project, index) => (
          <ProjectList key={index} project={project} />
        ))
      ) : (
        <div className={styles.noProjectsMessage}>
          현재 게시된 프로젝트가 존재하지 않습니다.
        </div>
      )}
      </div>
    </div>
  </div>
  );
}

export default PopularProject;
