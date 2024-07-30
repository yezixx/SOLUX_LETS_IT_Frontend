import Button from "../../../../Components/Button/Button";
import Profile from "../../../../Components/Profile/Profile";
import styles from "./ApplyProfile.module.css";
import { useParams } from "react-router-dom";
import useProfileView from "./useProfileView";
//mock user data
const mockuser = {
  name: "김코더",
  age: "20대 초반",
  bio: "시각화로 소통하는 주니어 개발자",
  sns: {
    gmail: "coderkim123@gmail.com",
    github: "http://github.com",
    blog: "htttp://vlog.com",
  },
  tierScore: 60,
  skills: {
    css: 95,
    HTML: 80,
    React: 50,
    JavaScript: 95,
  },
  introduce:
    "안녕하세요! 저는 프론트엔드 개발자로서 사용자 경험을 끊임없이 개선하고, 풍부한 인터랙션과 시각적 효과를 구현하는 데 열정을 가지고 있는 김코더입니다. 팀 내외에서의 협업을 통해 문제를 해결하고, 새로운 아이디어를 제안하는 것을 즐기며, 항상 자기 계발에 주력합니다. ",
};
const ApplyProfile = () => {
  //applyId는 지원자 리스트 매핑 시 갖고 옴, 동적 url 할당
  const { applyId } = useParams();
  const { applicantView, profileView } = useProfileView(applyId);
  return (
    <div className={styles.ApplyProfile__contWrap}>
      {/*프로필 db 구현되면 주석 처리된 코드 사용 */}
      <Profile user={profileView} />

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
