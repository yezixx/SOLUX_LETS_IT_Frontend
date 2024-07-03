import { useState } from "react";
import styles from "./CollabLink.module.css";

const CollabLink = ({ link }) => {
  const [url, setUrl] = useState(link);

  const onChangeUrl = (e) => {
    setUrl(e.target.value);
  };
  return (
    <div className={styles.collabLink}>
      <div className={styles.collabLink__icon}>아이콘</div>
      <input
        className={styles.collabLink__input}
        type="text"
        value={url}
        onChange={onChangeUrl}
      ></input>
    </div>
  );
};

export default CollabLink;
