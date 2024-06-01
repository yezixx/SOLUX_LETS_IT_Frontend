import styles from "./TopLabel.module.css";

const TopLabel = () => {
  return (
    <div className={styles.top_label__wrapper}>
      <div className={styles.top_label__container}>팀 게시판</div>
    </div>
  );
};

export default TopLabel;
