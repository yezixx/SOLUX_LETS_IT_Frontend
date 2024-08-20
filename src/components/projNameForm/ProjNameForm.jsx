import { forwardRef, useImperativeHandle, useRef } from "react";
import styles from "./ProjNameForm.module.css";

const ProjNameForm = forwardRef(({ title, onChange }, ref) => {
  const inputRef = useRef();

  const onChangeProjectName = (e) => {
    onChange(e.target.value);
  };

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  return (
    <div className={styles.projNameForm}>
      <div className={styles.projNameForm__label}>프로젝트명</div>
      <input
        className={styles.projNameForm__input}
        type="text"
        ref={inputRef}
        value={title}
        onChange={onChangeProjectName}
        placeholder="프로젝트명을 입력해주세요."
      ></input>
    </div>
  );
});

ProjNameForm.displayName = "ProjNameForm";

export default ProjNameForm;
