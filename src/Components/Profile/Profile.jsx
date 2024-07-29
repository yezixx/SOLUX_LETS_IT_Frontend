import styles from "./Profile.module.css";
import ProfileLink from "./Profile_Info/ProfileLink/ProfileLink.jsx";
import ProfilePhoto from "./Profile_Info/Profile_Photo/ProfilePhoto.jsx";
import PersonalDetail from "./Profile_Info/Profile_PersonalDetail/PersonalDetail.jsx";
import ProfileTier from "./Profile_Tier/ProfileTier.jsx";
import ProfileIntroduce from "./Profile_Introduce/ProfileIntroduce.jsx";
import ProfileSkills from "./Profile_Skills/ProfileSkills.jsx";
import Tier_A from "../../assets/Tier/tier_A.svg?react";
import Tier_B from "../../assets/Tier/tier_B.svg?react";
import Tier_C from "../../assets/Tier/tier_C.svg?react";
import Tier_F from "../../assets/Tier/tier_F.svg?react";
import Tier_S from "../../assets/Tier/tier_S.svg?react";

const Profile = ({ user, type, tooltipShow = false }) => {
  console.log(user);
  if (!user) {
    return <div>loading</div>;
  }
  const tier = user.mannerTier; //B

  const tierIcon = () => {
    switch (tier) {
      case "A":
        return <Tier_A width="50px" height="50px" />;
      case "B":
        return <Tier_B width="50px" height="50px" />;
      case "C":
        return <Tier_C width="50px" height="50px" />;
      case "F":
        return <Tier_F width="50px" height="50px" />;
      case "S":
        return <Tier_S width="50px" height="50px" />;
      default:
        return <Tier_C width="50px" height="50px" />;
    }
  };

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
          <ProfilePhoto src={user.profileImageUrl} />

          {/*이름, 나이 */}
          <PersonalDetail name={user.nickname} age={user.age} />

          {/*바이오*/}
          <div className={styles.myProfile__info__bio}>{user.bio}</div>

          {/*sns링크*/}
          <div className={styles.myProfile__info__sns}></div>
          {/* {user.sns.map((url) => {
            <ProfileLink url={url} />;
          })} */}
          <ProfileLink url={user.sns} />
          {/*객체를 순회하며 props로 값을 전달하도록 수정 예정 2024.06.20 */}
        </div>

        {/*매너티어 아이콘 */}
        <div className={styles.myProfile__tierIcon}>{tierIcon()}</div>

        <div className={styles.myProfile__right}>
          {/*매너티어, 소개글, skills */}
          <ProfileTier tierScore={user.mannerScore} tooltipShow={tooltipShow} />
          <ProfileIntroduce introduce={user.selfIntro} />
          <ProfileSkills skills={user.skills} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
