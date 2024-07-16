import { useState } from "react";
import styles from "./ProjNameForm.module.css";

const ProjNameForm = () => {
  const [projectName, setprojectName] = useState();

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
        placeholder="프로젝트명을 입력해주세요."
      ></input>
    </div>
  );
};

export default ProjNameForm;
