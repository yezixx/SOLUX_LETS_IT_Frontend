import styles from "./DetailContent.module.css";
import useProjectPost from "../useProjectPost";

const DetailContent = () => {
  const { onChange, errors } = useProjectPost();
  return (
    <div className="상세 내용">
      <div className={styles.projectHire__subTitle}>상세 내용</div>
      <div className={styles.projectHire__detail}>
        <textarea
          name="content"
          onChange={onChange}
          className={`${errors["content"] ? styles.formError : ""} ${
            styles.projectHire__textarea
          }`}
          placeholder="프로젝트 상세 내용을 자유롭게 작성해 주세요 (프로젝트 소개, 주제, 연락방법 등)"
        />
      </div>
    </div>
  );
};
export default DetailContent;
