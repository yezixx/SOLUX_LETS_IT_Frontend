import styles from "./Profile.module.css";
import ProfileLink from "./Profile_Info/ProfileLink/ProfileLink.jsx";
import TierIcon from "../../assets/Tier/tier_B.svg?react";
import ProfilePhoto from "./Profile_Info/Profile_Photo/ProfilePhoto.jsx";
import PersonalDetail from "./Profile_Info/Profile_PersonalDetail/PersonalDetail.jsx";
import ProfileTier from "./Profile_Tier/ProfileTier.jsx";
import ProfileIntroduce from "./Profile_Introduce/ProfileIntroduce.jsx";
import ProfileSkills from "./Profile_Skills/ProfileSkills.jsx";

const Profile = ({ user, type }) => {
  return (
    <div
      className={`${styles.myProfile__wrap} ${
        styles[`myProfile__wrap--${type}`]
      }`}
    >
      {/*버튼 + 프로필 박스*/}

      <div
        className={`${styles.myProfile__box} ${
          styles[`myProfile__box--${type}`]
        }`}
      >
        <div className={styles.myProfile__left}>
          {/*프로필 사진, 이름, 이메일/깃허브 등 링크 */}

          {/*프로필 사진*/}
          <ProfilePhoto />

          {/*이름, 나이 */}
          <PersonalDetail name={user.name} age={user.age} />

          {/*바이오*/}
          <div className={styles.myProfile__info__bio}>{user.bio}</div>

          {/*sns링크*/}
          <div className={styles.myProfile__info__sns}></div>
          <ProfileLink />
          <ProfileLink />
          <ProfileLink />
          {/*객체를 순회하며 props로 값을 전달하도록 수정 예정 2024.06.20 */}
        </div>

        {/*매너티어 아이콘 */}
        <div className={styles.myProfile__tierIcon}>
          <TierIcon width="50px" height="50px" />
        </div>

        <div className={styles.myProfile__right}>
          {/*매너티어, 소개글, skills */}
          <ProfileTier tierScore={user.tierScore} />
          <ProfileIntroduce introduce={user.introduce} />
          <ProfileSkills skills={user.skills} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
