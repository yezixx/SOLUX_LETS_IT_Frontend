import SearchIcon from "../../../Image/Icons/SearchIcon";
import useProjectPost from "../useProjectPost";
import styles from "./ProjField.module.css";

const ProjField = () => {
  const { onChange } = useProjectPost();

  return (
    <div className="분야">
      <div className={styles.projectHire__subTitle}>분야</div>
      <div className={styles.projectHire__detail}>
        <input
          name="field"
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

export default ProjField;
