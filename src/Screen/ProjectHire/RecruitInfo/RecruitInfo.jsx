import useProjectPost from "../useProjectPost";
import styles from "./RecruitInfo.module.css";

const RecruitInfo = () => {
  const { onChange } = useProjectPost();
  return (
    <div className="모집정보">
      <div className={styles.projectHire__subTitle}>모집정보</div>
      <div className={styles.projectHire__countDue}>
        {/* 모집 인원 */}
        <div className={styles.projectHire__detail}>
          <label>모집인원</label>
          <input
            name="peopleNum"
            onChange={onChange}
            className={styles.projectHire__inputStyle1}
            placeholder="1명"
          />
        </div>
        {/* 모집 마감 */}
        <div className={styles.projectHire__detail}>
          <label>모집마감</label>
          <input
            name="recruitDueDate"
            onChange={onChange}
            type="date"
            className={styles.projectHire__inputStyle1}
            placeholder="1명"
          />
        </div>
      </div>
      <div className={styles.projectHire__detail}>
        <label>우대사항</label>
        <input
          name="preference"
          onChange={onChange}
          className={styles.projectHire__inputStyle2}
          placeholder="배포 경험 1회 이상"
        />
      </div>
    </div>
  );
};

export default RecruitInfo;
