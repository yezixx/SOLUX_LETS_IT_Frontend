import { useState } from "react";
import styles from "./ProjNameForm.module.css";

const ProjNameForm = () => {
  const PROJECT_NAME = "노년층을 위한 구인구직 웹사이트";
  const [projectName, setprojectName] = useState(PROJECT_NAME);

  const onChangeProjectName = (e) => {
    setprojectName(e.target.value);
  };
  return (
    <div className={styles.projNameForm}>
      <div className={styles.projNameForm__label}>프로젝트명</div>
      <input
        className={styles.projNameForm__input}
        type="text"
        value={projectName}
        onChange={onChangeProjectName}
      ></input>
    </div>
  );
};

export default ProjNameForm;
