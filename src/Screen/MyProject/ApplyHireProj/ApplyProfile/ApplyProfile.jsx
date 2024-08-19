import Button from "../../../../components/Button/Button";
import Profile from "../../../../components/Profile/Profile";
import styles from "./ApplyProfile.module.css";
import { useNavigate, useParams } from "react-router-dom";
import useProfileView from "./useProfileView";
import useApplicant from "../ApplicantBtn/useApplicant";

const ApplyProfile = () => {
  //applyId는 지원자 리스트 매핑 시 갖고 옴, 동적 url 할당
  const { applyId, postId } = useParams();
  console.log(applyId, postId);
  const { applicantView, profileView } = useProfileView(applyId);
  //승인, 거절 기능
  const { applicantConfirm } = useApplicant(applyId); //isApprove, applyId
  //화면 이동
  const navigate = useNavigate();

  return (
    <div className={styles.ApplyProfile__contWrap}>
      <Profile user={profileView} />

      <div className={styles.ApplyProfile__applyDetail}>
        <div className={styles.ApplyProfile__applyDetail_realName}>
          실명<span>|</span>
          <span> {profileView.name}</span>
        </div>

        <div className={styles.ApplyProfile__stackField}>
          {/*선호 스택 */}
          <div className="stack">
            <div className={styles.ApplyProfile__applyDetail_title}>
              선호 스택
            </div>
            <div className={styles.ApplyProfile__detail_1}>
              {applicantView.preferStack}
            </div>
          </div>
          {/*희망 분야 */}
          <div className="field">
            <div className={styles.ApplyProfile__applyDetail_title}>
              희망 분야
            </div>
            <div className={styles.ApplyProfile__detail_1}>
              {applicantView.desiredField}
            </div>
          </div>
        </div>
        {/*전달 사항 */}
        <div className="message">
          <div className={styles.ApplyProfile__applyDetail_title}>
            전달 사항
          </div>
          <div className={styles.ApplyProfile__detail_2}>
            {applicantView.applyContent}
          </div>
        </div>
        {/*연락 수단 */}
        <div className="contact">
          <div className={styles.ApplyProfile__applyDetail_title}>
            연락 수단
          </div>
          <div className={styles.ApplyProfile__detail_1}>
            {applicantView.contact}
          </div>
        </div>
      </div>

      <div className={styles.ApplyProfile__buttonWrap}>
        <Button
          text="거절"
          type="SEC_150x40"
          onClick={() => {
            applicantConfirm(false, applyId, postId);
            navigate("/myproj/hiring-and-applied");
          }}
        ></Button>
        <Button
          text="수락"
          onClick={() => {
            applicantConfirm(true, applyId, postId);
            navigate("/myproj/hiring-and-applied");
          }}
        ></Button>
      </div>
    </div>
  );
};

export default ApplyProfile;
