import styles from "./ProjectHire.module.css";
import RecruitInfo from "./RecruitInfo/RecruitInfo";
import RequiredStack from "./RequiredStack/RequiredStack";
import ProjInfo from "./ProjInfo/ProjInfo";
import ProjField from "./ProjField/ProjField";
import DetailContent from "./DetailContent/DetailContent";
import Button from "../../Components/Button/Button";
import { useAtomValue } from "jotai";
import { postProjectAtom } from "../../atoms/atoms";
import useProjectPost from "./useProjectPost";

const ProjectHire = () => {
  const projectPost = useAtomValue(postProjectAtom);
  const { handleSubmit, onChange } = useProjectPost();
  console.log(projectPost);

  return (
    <form onSubmit={handleSubmit} className={styles.projectHire}>
      구인글 작성
      {/* 구인글 제목란 */}
      <input
        className={styles.projectHire__projectTitle}
        name="prjTitle"
        onChange={onChange}
        placeholder="구인글 제목을 입력해 주세요"
      />
      <div className={styles.projectHire__container}>
        {/*모집 정보 */}
        <RecruitInfo />
        {/*필요 스택 */}
        <RequiredStack />
        {/*프로젝트 정보 */}
        <ProjInfo />
        {/* 분야 */}
        <ProjField />
        {/*상세 내용 */}
        <div className="grid large">
          <DetailContent />
        </div>
      </div>
      <div className={styles.buttonWrap}>
        <Button type="submit" text="업로드" />
      </div>
    </form>
  );
};

export default ProjectHire;
