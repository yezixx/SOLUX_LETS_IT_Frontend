import { useState } from "react";
import styles from "./CollabLink.module.css";
import ToolIcon from "../ToolIcon/ToolIcon";
import SelectIcon from "../SelectIcon/SelectIcon";

const CollabLink = ({ id, value, type, onChange }) => {
  const [visible, setVisible] = useState(false);

  const onChangeInput = (e) => {
    onChange(id, e.target.value);
  };

  return (
    <div className={styles.collabLink}>
      {visible === true ? (
        <div className={styles.collabLink__selectIcon}>
          <SelectIcon />
        </div>
      ) : null}
      <div
        onClick={() => {
          setVisible(!visible);
        }}
      >
        <ToolIcon alt="아이콘" type={type === "SHORT" ? "" : "NONE"} />
      </div>
      <input
        className={`${styles.collabLink__input} ${
          styles[`collabLink__input--${type}`]
        }`}
        type="text"
        value={value}
        onChange={onChangeInput}
        placeholder="URL을 입력해주세요."
      ></input>
    </div>
  );
};

export default CollabLink;
