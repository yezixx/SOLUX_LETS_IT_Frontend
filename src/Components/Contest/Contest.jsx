import React from "react";
import ContestList from "../Contest/ContestList";
import styles from "./Contest.module.css";

function Contest() {
  const contests = [
    {
      title: "웹 사이드 프로젝트 팀원 모집",
      period: "4월 10일 - 5월 10일",
      location: "서울",
      price: "30,000원",
    },

    {
      title: "웹 사이드 프로젝트 팀원 모집",
      period: "4월 10일 - 5월 10일",
      location: "서울",
      price: "30,000원",
    },
  ];

  return (
    <div className={styles.contest}>
      <div className={styles.text}>최신 공모전 🏆</div>
      <div>
        <ContestList contests={contests} />
      </div>
    </div>
  );
}

export default Contest;
