import styles from "./Stack.module.css";

/*프로젝트 정보 상단에 리액트 , 스프링 등등을 표시하는 컴포넌트 */
const Stack = ({ tech }) => {
  return <div className={styles.tech}>{tech}</div>;
};
export default Stack;
