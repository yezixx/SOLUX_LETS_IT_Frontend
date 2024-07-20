import { useState } from "react";
import styles from "./SkillRange.module.css";

const SkillRange = ({ id, skillName, value = "50", onChange }) => {
  const [currentValue, setCurrentValue] = useState(value);

  const [skill, setSkill] = useState(skillName);

  const onChangeSkillName = (e) => {
    setSkill(e.target.value);
    onChange(id, "name", e.target.value);
  };

  const onChangeRange = (e) => {
    setCurrentValue(e.target.value);
    onChange(id, "fluency", e.target.value);
  };

  return (
    <div className={styles.skillRange}>
      <input
        type="text"
        className={styles.skillRange__skillName}
        placeholder="ex) React"
        value={skill}
        onChange={onChangeSkillName}
      />
      <div className={styles.skillRange__slide}>
        <div
          className={styles.skillRange__track}
          style={{ width: `${currentValue}%` }}
        ></div>
        <input
          type="range"
          value={currentValue}
          min="0"
          max="100"
          onChange={onChangeRange}
        />
      </div>
      <div className={styles.skillRange__value}>{currentValue}</div>
    </div>
  );
};

export default SkillRange;
