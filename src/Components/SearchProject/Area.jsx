// Area.jsx
import React, { useState } from "react";
import styles from "./Area.module.css";
import { KoreaArea } from "../../Screen/KoreaArea"; // 새로 만든 파일에서 변수 가져오기

const Area = () => {
  const [selectedArea, setSelectedArea] = useState(null);

  const handleAreaClick = (area) => {
    setSelectedArea(area);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>지역으로 찾기</h1>
      <div className={styles.buttonContainer}>
        {KoreaArea.map((state, index) => (
          <button
            key={index}
            className={styles.stateButton}
            onClick={() => handleAreaClick(state)}
          >
            {state.name}
          </button>
        ))}
      </div>
      {/* 지역 부수적인 선택 */}
      {selectedArea && (
        <div className={styles.subAreaContainer}>
          <h2>{selectedArea.name}</h2>
          <div>
            {selectedArea.subArea.map((sub, index) => (
              <button key={index} className={styles.sub}>
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Area;
