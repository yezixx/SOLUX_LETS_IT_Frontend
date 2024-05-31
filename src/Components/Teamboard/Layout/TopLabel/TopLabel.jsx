import styles from "./TopLabel.module.css";

const TopLabel = () => {
  return (
    <div className={styles.topLabel_wrapper}>
      <div className={styles.topLabel_container}>팀 게시판</div>
    </div>
  );
};

export default TopLabel;
