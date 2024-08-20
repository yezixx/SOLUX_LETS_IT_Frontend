import styles from "./ProjectHire.module.css";
import RecruitInfo from "./recruitInfo/RecruitInfo";
import RequiredStack from "./requiredStack/RequiredStack";
import ProjInfo from "./projInfo/ProjInfo";
import ProjField from "./projField/ProjField";
import DetailContent from "./detailContent/DetailContent";
import Button from "../../components/button/Button";
import { useAtomValue } from "jotai";
import { postProjectAtom } from "../../store/atom.js";
import useProjectPost from "./useProjectPost";

const ProjectHire = () => {
  const projectPost = useAtomValue(postProjectAtom);
  const { handleSubmit, onChange, errors, minDate } = useProjectPost();
  console.log(projectPost);
  return (
    <form onSubmit={handleSubmit} className={styles.projectHire}>
      구인글 작성
      {/* 구인글 제목란 */}
      <input
        className={`${errors["title"] ? styles.formError : ""} ${
          styles.projectHire__projectTitle
        }`}
        name="title"
        onChange={onChange}
        placeholder="구인글 제목을 입력해 주세요"
      />
      <div className={styles.projectHire__container}>
        {/*모집 정보 */}
        <RecruitInfo errors={errors} minDate={minDate} />
        {/*필요 스택 */}
        <RequiredStack errors={errors} />
        {/*프로젝트 정보 */}
        <ProjInfo errors={errors} />
        {/* 분야 */}
        <ProjField errors={errors} />
        {/*상세 내용 */}
        <div className="grid large">
          <DetailContent errors={errors} />
        </div>
      </div>
      <div className={styles.buttonWrap}>
        <Button type="submit" text="업로드" />
      </div>
    </form>
  );
};

export default ProjectHire;
