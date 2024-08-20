// components/Area.js
import React from "react";
import styles from "./area.module.css";
import { KoreaArea } from "../../screen/KoreaArea.js";
import useArea from "../../hooks/useArea.jsx";

const Area = () => {
  const {
    selectedArea,
    selectedSubAreas,
    isSubAreaVisible,
    handleAreaClick,
    handleSubAreaClick
  } = useArea();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>지역으로 찾기</h1>
      <div className={styles.buttonContainer}>
        {KoreaArea.map((state, index) => (
          <button
            key={index}
            className={`${styles.stateButton} ${selectedArea === state ? styles.selectedState : ""}`}
            onClick={() => handleAreaClick(state)}
          >
            {state.name}
          </button>
        ))}
      </div>
      {selectedArea && isSubAreaVisible && (
        <div className={styles.subAreaContainer}>
          <h2>{selectedArea.name}</h2>
          <div>
            {selectedArea.subArea.map((sub, index) => (
              <button
                key={index}
                className={`${styles.sub} ${selectedSubAreas.includes(sub) ? styles.selected : ""}`}
                onClick={() => handleSubAreaClick(sub)}
              >
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
