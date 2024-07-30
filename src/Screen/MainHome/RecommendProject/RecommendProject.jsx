import React, { useState, useEffect } from "react";
import ProjectList from "../../../Components/ProjectList/ProjectList";
import styles from "./RecommendProject.module.css";
import { getPostsList } from "../../../service/postService";

function RecommendProject() {
  const [projList, setProjList] = useState([]);
  const [sortedList, setSortedList] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getPostsList();
        setProjList(data.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);
  useEffect(() => {
    //조회순 기준 정렬, proList를 받아온 후에 처리함
    if (projList.length > 0) {
      const sorted = [...projList].sort((a, b) => b.viewCount - a.viewCount);
      setSortedList(sorted);
    }
  }, [projList]);

  return (
    <div className={styles.recommendproj}>
      <div className={styles.text}>이런 프로젝트는 어떠신가요? 💫</div>
      <div className={styles.recommedproj__container}>
        {sortedList.length > 0 ? (
          sortedList
            .slice(0, 4)
            .map((project, index) => (
              <ProjectList key={index} project={project} />
            ))
        ) : (
          <div>loading</div>
        )}
      </div>
    </div>
  );
}

export default RecommendProject;
