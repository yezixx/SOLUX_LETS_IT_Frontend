import React from "react";
import styles from "./NewsList.module.css";

function NewsList({ news }) {
  return (
    <div className={styles.container}>
      <div className={styles.newsList}>
        {news.map((news, index) => (
          <div className={styles.newsItem} key={index}>
            <img
              src="https://via.placeholder.com/50/87CEEB/FFFFFF?text=Img"
              alt="Blue"
              className={styles.newsImage}
            />
            <div className={styles.newsTitle}>{news.title}</div>
            <div className={styles.newscontent}>{news.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsList;
