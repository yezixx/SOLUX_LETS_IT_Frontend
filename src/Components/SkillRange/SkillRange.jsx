import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import styles from "./SkillRange.module.css";

const SkillRange = forwardRef(
  ({ id, skillName, value = "50", onChange }, ref) => {
    const [currentValue, setCurrentValue] = useState(value);

    const [skill, setSkill] = useState(skillName);

    const inputRef = useRef();

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus();
      },
    }));

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
          ref={inputRef}
          className={styles.skillRange__skillName}
          placeholder="ex) React"
          value={skill}
          onChange={onChangeSkillName}
        />
        <div className={styles.skillRange__slide}>
          <div
            className={styles.skillRange__track}
            style={{
              width:
                currentValue <= 5
                  ? `calc(${currentValue}% + 5px)`
                  : `${currentValue}%`,
              borderRadius:
                currentValue <= 35 ? "5.5px 0px 0px 5.5px" : "5.5px",
            }}
          ></div>
          <input
            type="range"
            value={currentValue}
            min="0"
            max="100"
            step="5"
            onChange={onChangeRange}
          />
        </div>
        <div className={styles.skillRange__value}>{currentValue}</div>
      </div>
    );
  }
);

SkillRange.displayName = "SkillRange";

export default SkillRange;
