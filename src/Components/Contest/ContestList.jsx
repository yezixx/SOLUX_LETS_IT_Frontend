import React from 'react';
import styles from './ContestList.module.css';

function ContestList({ contests }) {
  return (
    <div className={styles.container}>
      <div className={styles.contestList}>
        {contests.map((contest, index) => (
          <div className={styles.contestItem} key={index}>
            <img 
              src="https://via.placeholder.com/50/87CEEB/FFFFFF?text=Img" 
              alt="Blue" 
              className={styles.newsImage} 
            />
            <div className={styles.contestTitle}><text>{contest.title}</text></div>
            <div><text className={styles.contestPeriod}>신청 기간 | {contest.period}</text></div>
            <div><text className={styles.contestLocation}>지역 | {contest.location}</text></div>
            <div><text className={styles.contestPrice}>참가 비용 | {contest.price}</text></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContestList;
