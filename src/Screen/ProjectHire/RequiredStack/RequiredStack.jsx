import SearchIcon from "../../../Image/Icons/SearchIcon";
import useProjectPost from "../useProjectPost";
import styles from "./RequiredStack.module.css";

const RequiredStack = () => {
  const { onChange } = useProjectPost();
  return (
    <div className="필요스택">
      <div className={styles.projectHire__subTitle}>필요스택</div>
      <div className={styles.projectHire__detail}>
        <input
          name="stack"
          onChange={onChange}
          className={styles.projectHire__inputStyle2}
          placeholder="JavaScript"
        />
        <div className={styles.projectHire__searchIcon}>
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default RequiredStack;
