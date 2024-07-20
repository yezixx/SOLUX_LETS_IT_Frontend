import Button from "../../../../Components/Button/Button";
import ProfilePhoto from "../../../../Components/Profile/Profile_Info/Profile_Photo/ProfilePhoto";
import styles from "./ApplicantBtn.module.css";
import { getApplicantList } from "../../../../service/applyService";
import { useEffect, useState } from "react";

const ApplicantBtn = ({ postId }) => {
  /*구인/신청 프로젝트 리스트를 담아올 atom 설정 */
  const [applicantList, setApplicantList] = useState([]);

  useEffect(() => {
    getApplicantList({ postId }) // 가져오는 프로젝트 data에 따라 매개변수를 바꿔야 함
      .then((data) => {
        setApplicantList(data);
      })
      .catch((error) => {
        console.error("Applicant list fetch error:", error);
      });
  }, [setApplicantList]);

  return (
    <div className={styles.ApplicantWrap}>
      {applicantList.map((applyUser) => (
        <div key={applyId} className={styles.Applicant}>
          {/*applyId applicantList db에서 넘겨받음 */}

          {/* 사용자 사진 */}
          <ProfilePhoto src={applyUser.profileImage} type="applicant" />
          <div className={styles.Applicant__Application}>
            {/* 이름 + 지원서 보기 버튼 */}
            <div className={styles.Applicant__ApplicationBtn}>
              {applyUser.nickname} <span>|</span>
              <Link to={`myprofile/applyprofile/${applyId}`}>
                <Button text="지원서 보기" type="NONE__TEXT-MC2-16" />
              </Link>
            </div>

            {/* 수락, 거절 버튼 */}
            <div className={styles.Applicant__buttonWrap}>
              <Button text="거절" type="SEC_70x40" />
              <Button text="수락" type="MC2_70x40" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ApplicantBtn;
