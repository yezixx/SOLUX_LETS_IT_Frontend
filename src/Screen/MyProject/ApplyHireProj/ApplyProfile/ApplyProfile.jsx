import Button from "../../../../Components/Button/Button";
import Profile from "../../../../Components/Profile/Profile";
import styles from "./ApplyProfile.module.css";
import { useParams } from "react-router-dom";
import applyProfileView from "./applyProfileView";
//mockdata
const mockuser = {
  manner_tier: "B",
  manner_grade: "60",
  name: "test",
  age: "20대 초반",
  profile_url: ["링크1", "링크2"],
  profile_picture: "사진링크",
  bio: "한줄 소개",
  self_intro: "자기소개",
};
const ApplyProfile = () => {
  //applyId는 지원자 리스트 매핑 시 갖고 옴, 동적 url 할당
  const applyId = useParams();
  const { applicantView, profileView } = applyProfileView(applyId);
  return (
    <div className={styles.ApplyProfile__contWrap}>
      {/* <Profile user={profileView[0]} /> */}
      <Profile user={mockuser} />

      <div className={styles.ApplyProfile__applyDetail}>
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
        <Button text="거절" type="SEC_150x40"></Button>
        <Button text="수락"></Button>
      </div>
    </div>
  );
};

export default ApplyProfile;
