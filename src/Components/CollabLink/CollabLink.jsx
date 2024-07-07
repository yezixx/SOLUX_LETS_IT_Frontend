import { useState } from "react";
import styles from "./CollabLink.module.css";
import ToolIcon from "../ToolIcon/ToolIcon";

const CollabLink = ({ link }) => {
  const [url, setUrl] = useState(link);

  const onChangeUrl = (e) => {
    setUrl(e.target.value);
  };
  return (
    <div className={styles.collabLink}>
      <ToolIcon alt="아이콘" type="NONE" />
      <input
        className={styles.collabLink__input}
        type="text"
        value={url}
        onChange={onChangeUrl}
        placeholder="URL을 입력해주세요."
      ></input>
    </div>
  );
};

export default CollabLink;
