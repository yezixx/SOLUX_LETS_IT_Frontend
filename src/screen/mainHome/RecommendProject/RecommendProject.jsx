import React, { useState, useEffect } from "react";
import ProjectList from "../../../components/prjContentBlock/PrjContentBlock";
import styles from "./RecommendProject.module.css";
import { getPostsList } from "../../../service/postService";
import Loading from "../../../components/loading/Loading";

function RecommendProject() {
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
      //프로젝트 리스트가 없을 경우
      setLoading(false);
    }
  }, [projList]);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.recommendproj}>
      <div className={styles.recommendproj__content}>
        <div className={styles.text}>이런 프로젝트는 어떠신가요? 💫</div>
        <div className={styles.recommedproj__container}>
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

export default RecommendProject;
