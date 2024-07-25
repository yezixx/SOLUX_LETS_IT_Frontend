import styles from "./Gray.module.css";

/*프로젝트 정보 상단에 리액트 , 스프링 등등을 표시하는 컴포넌트 */
const GrayBox = ({ tech, showX = false, onClick }) => {
  return (
    <div className={styles.tech__wrap}>
      <div className={styles.tech}>{tech}</div>
      {showX && (
        <button type="button" onClick={onClick}>
          x
        </button>
      )}
    </div>
  );
};
export default GrayBox;
