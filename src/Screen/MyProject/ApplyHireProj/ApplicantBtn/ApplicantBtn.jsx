import { Link } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import ProfilePhoto from "../../../../components/Profile/Profile_Info/Profile_Photo/ProfilePhoto";
import styles from "./ApplicantBtn.module.css";
import useApplicant from "./useApplicant";

const ApplicantBtn = ({ postId }) => {
  const { applicantList, applicantConfirm } = useApplicant(postId);

  return (
    <div className={styles.ApplicantWrap}>
      {applicantList &&
        applicantList.map((applyUser) => (
          <div key={applyUser.applyId} className={styles.Applicant}>
            {/*applyId applicantList db에서 넘겨받음 */}

            {/* 사용자 사진 */}
            <ProfilePhoto src={applyUser.profileImage} type="applicant" />

            <div className={styles.Applicant__Application}>
              {/* 이름 + 지원서 보기 버튼 */}
              <div className={styles.Applicant__ApplicationBtn}>
                {applyUser.nickname ? applyUser.nickname : applyUser.name}{" "}
                <span>|</span>
                <Link
                  to={`/myproj/applyprofile/${applyUser.applyId}/${postId}`}
                >
                  <Button text="지원서 보기" type="NONE__TEXT-MC2-16" />
                </Link>
              </div>

              {/* 수락, 거절 버튼 */}
              <div className={styles.Applicant__buttonWrap}>
                <Button
                  onClick={() => {
                    applicantConfirm(true, applyUser.applyId, postId);
                  }}
                  text="승인"
                  type="MC2_70x40"
                />
                <Button
                  onClick={() => {
                    applicantConfirm(false, applyUser.applyId, postId);
                  }}
                  text="거절"
                  type="SEC_70x40"
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default ApplicantBtn;
