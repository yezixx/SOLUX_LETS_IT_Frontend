import ProjectList from "../../../Components/ProjectList/ProjectList";
import styles from "./PopularProject.module.css";
import { getPostsList } from "../../../service/postService";
import React, { useState, useEffect } from "react";
import Loading from "../../../Components/Loading/Loading";

function PopularProject() {
  const [projList, setProjList] = useState([]);
  const [sortedList, setSortedList] = useState([]);
  const [loading, setLoading] = useState(true);

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
    if (projList.length > 0) {
      const sorted = [...projList].sort((a, b) => b.viewCount - a.viewCount);
      setSortedList(sorted);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [projList]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className={styles.popularproj}>
      <div className={styles.popularproj_content}>
        <div className={styles.text}>지금 인기있는 프로젝트 🔥 </div>
        <div className={styles.popularproj__container}>
          {sortedList.length > 0 ? (
            sortedList
              .slice(0, 4)
              .map((project, index) => (
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
