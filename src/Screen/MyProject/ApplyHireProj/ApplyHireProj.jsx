import Button from "../../../components/button/Button";
import ApplicantBtn from "./ApplicantBtn/ApplicantBtn";
import styles from "./ApplyHireProj.module.css";
import MemberView from "./MemberView/MemberView";
import ProjectList from "../../../components/ProjectList/ProjectList";
import { useApplyHire } from "./useApplyHire";

const ApplyHireProj = () => {
  const {
    hireProj,
    applyProj,
    showMember,
    handleClickMember,
    completeHire,
    deleteHireProj
  } = useApplyHire();

  console.log(`hireProj 리스트 : ${hireProj}`);
  return (
    <div className={styles.ApplyHireProj__content}>
      {/*구인 중인 프로젝트 + 신청한 프로젝트 */}

      {/*구인중인 프로젝트*/}
      <div className={styles.HireProj__contWrap}>
        {/*제목 */}
        <div className={styles.ApplyHireProj__title}>구인중인 프로젝트</div>
        <div className={styles.ApplyHireProj__container}>
          {hireProj.map((item) => (
            <div key={item.postId} className={styles.HireProj__content}>
              {/*프로젝트 구인글 + 버튼 + 신청자 목록 (컨텐츠) */}

              {/*item은 구인/신청 프로젝트 리스트를 의미, 각 data별로 postId 존재 */}
              <div className={styles.HireProj__ProjectSetting}>
                <ProjectList key={item.postId} project={item} />
                <div className={styles.HireProj__buttonWrap}>
                  <Button
                    text="모집 마감"
                    onClick={() => {
                      completeHire(item.postId);
                    }}
                  />
                  <Button
                    text="팀원"
                    type="SEC_70x40"
                    onClick={() => handleClickMember(item.postId)}
                  />
                  <Button
                    text="글 삭제"
                    type="NONE__TEXT-TC2"
                    onClick={() => deleteHireProj(item.postId)}
                  />
                </div>

                {/*프로젝트 팀원창 */}
                {showMember[item.postId] && <MemberView postId={item.postId} />}
              </div>

              {/* 프로젝트 신청자*/}
              <div className={styles.HireProj__Applicant}>
                <ApplicantBtn postId={item.postId} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.ApplyProj__contWrap}>
        <div className={styles.ApplyHireProj__title}>신청한 프로젝트</div>
        {/*프로젝트 구인글 + 버튼 + 신청자 목록 (컨텐츠) */}
        <div className={styles.ApplyProj__content}>
          <div className={styles.ApplyProj__ProjectList}>
            {applyProj.map((project) => (
              <ProjectList key={project.postId} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyHireProj;
