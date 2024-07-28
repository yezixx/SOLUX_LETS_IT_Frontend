import { useEffect, useState } from "react";
import Button from "../../../Components/Button/Button";
import ApplicantBtn from "./ApplicantBtn/ApplicantBtn";
import styles from "./ApplyHireProj.module.css";
import MemberView from "./MemberView/MemberView";
import {
  getMyApplyProjects,
  getMyProjects,
} from "../../../service/projectService";
import { useAtomValue } from "jotai";
import { userIdAtom } from "../../../atoms/atoms";
import ProjectList from "../../../Components/ProjectList/ProjectList";
import { approveApplicants } from "../../../service/applyService";

const ApplyHireProj = () => {
  //클릭하면 팀원을 보여주도록 state 설정
  const [showMember, setShowMember] = useState({});
  /*구인/신청 프로젝트 data 담을 state */
  const [hireProj, setHireProj] = useState([]);
  const [applyProj, setApplyProj] = useState([]);
  /*팀원 data를 담을 state */
  const [memberList, setMemberList] = useState([]);
  /*userId 전역 상태에서 불러오기 */
  const userId = useAtomValue(userIdAtom);
  /*프로젝트 리스트 db에서 갖고 와서 hireProj 저장 */
  useEffect(() => {
    getMyProjects(userId)
      .then((res) => {
        setHireProj(res.projects);
      })
      .catch((error) => {
        console.log("에러발생");
      });
    getMyApplyProjects(userId)
      .then((res) => {
        setApplyProj(res.projects);
      })
      .catch((error) => {
        console.log(`apply 프로젝트 데이터 가져오는 중 에러 발생 : ${error}`);
      });
  }, [userId]);

  //클릭했을 시 멤버 보여주는 함수
  const handleClickMember = (postId) => {
    setShowMember((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId], // 해당 프로젝트의 팀원 목록 표시 상태를 토글
    }));

    if (!showMember[postId]) {
      approveApplicants(postId)
        .then((data) => {
          setMemberList((prevList) => ({
            ...prevList,
            [postId]: data, // 해당 프로젝트의 팀원 목록 업데이트
          }));
        })
        .catch((error) => {
          console.log("승인 멤버 리스트 오류:", error);
        });
    }
  };

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
                  <Button text="모집 마감" />
                  <Button
                    text="팀원"
                    type="SEC_70x40"
                    onClick={() => handleClickMember(item.postId)}
                  />
                  <Button text="글 삭제" type="NONE__TEXT-TC2" />
                </div>

                {/*프로젝트 팀원창 */}
                {showMember[item.postId] && <MemberView postId={item.postId} />}
              </div>

              {/*프로젝트 신청자*/}
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
              <ProjectList project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyHireProj;
