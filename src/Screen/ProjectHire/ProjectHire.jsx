import styles from "./ProjectHire.module.css";

const ProjectHire = () => {
  return (
    <div className={styles.projectHire}>
      구인글 작성
      {/*구인글 제목란 */}
      <input
        styles={styles.projectHire__projectTitle}
        name="title"
        placeholder="제목을 입력해 주세요"
      />
    </div>
  );
};

export default ProjectHire;
