import Button from "../../../Components/Button/Button";
import ApplicantBtn from "./ApplicantBtn/ApplicantBtn";
import styles from "./ApplyHireProj.module.css";
import MemberView from "./MemberView/MemberView";
import ProjectList from "../../../Components/RecommendProject/ProjectList";
import { useApplyHire } from "./useApplyHire";

const ApplyHireProj = () => {
  const { apHireProj, showMember, handleClickMember } = useApplyHire();
  console.log(apHireProj);
  return (
    <div className={styles.ApplyHireProj__content}>
      {/*구인 중인 프로젝트 + 신청한 프로젝트 */}

      {/*구인중인 프로젝트*/}
      <div className={styles.HireProj__contWrap}>
        {/*제목 */}
        <div className={styles.ApplyHireProj__title}>구인중인 프로젝트</div>
        {apHireProj.map((item) => (
          <div key={item.postId} className={styles.HireProj__content}>
            {/*프로젝트 구인글 + 버튼 + 신청자 목록 (컨텐츠) */}

            {/*(대체 예정)프로젝트 컴포넌트 + 모집 마감/팀원/글삭제 버튼 + 팀원*/}

            {/*item은 구인/신청 프로젝트 리스트를 의미, 각 data별로 postId 존재 */}
            <div className={styles.HireProj__ProjectSetting}>
              <ProjectList key={item.postId} projects={apHireProj} />
              <div className={styles.HireProj__buttonWrap}>
                <Button text="모집 마감" />
                <Button
                  text="팀원"
                  type="SEC_70x40"
                  onClick={() => handleClickMember(item.postId)}
                />
                <Button text="글 삭제" type="NONE__TEXT-TC2" />
              </div>

              {/*프로젝트 팀원창 */}
              {showMember && <MemberView postId={item.postId} />}
            </div>

            {/*프로젝트 신청자*/}
            <div className={styles.HireProj__Applicant}>
              <ApplicantBtn postId={item.postId} />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.ApplyProj__contWrap}>
        <div className={styles.ApplyHireProj__title}>신청한 프로젝트</div>
        {/*프로젝트 구인글 + 버튼 + 신청자 목록 (컨텐츠) */}
        <div className={styles.ApplyProj__content}>
          <div className={styles.ApplyProj__ProjectList}></div>
        </div>
      </div>
    </div>
  );
};

export default ApplyHireProj;
