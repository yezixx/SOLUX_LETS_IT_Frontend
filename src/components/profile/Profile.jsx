import styles from "./Profile.module.css";
import ProfileLink from "./profileInfo/profileSns/ProfileSns.jsx";
import ProfilePhoto from "./profileInfo/profilePhoto/ProfilePhoto.jsx";
import PersonalDetail from "./profileInfo/profilePersonnal/PersonalDetail.jsx";
import ProfileTier from "./profileTier/ProfileTier.jsx";
import ProfileIntroduce from "./profileIntroduce/ProfileIntroduce.jsx";
import ProfileSkills from "./profileSkills/ProfileSkills.jsx";
import Tier_A from "../../assets/tier/tier_A.svg?react";
import Tier_B from "../../assets/tier/tier_B.svg?react";
import Tier_C from "../../assets/tier/tier_C.svg?react";
import Tier_F from "../../assets/tier/tier_F.svg?react";
import Tier_S from "../../assets/tier/tier_S.svg?react";
import Loading from "../loading/Loading.jsx";

const Profile = ({ user, type, tooltipShow = false }) => {
  if (!user) {
    return <Loading />;
  }
  console.log(user);
  //유저의 tier
  const tier = user.mannerTier;
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
          <PersonalDetail
            name={user.name}
            age={user.age}
            nickname={user.nickname}
          />

          {/*바이오*/}
          <div className={styles.myProfile__info__bio}>{user.bio}</div>

          {/*sns링크*/}
          <div className={styles.myProfile__info__sns}></div>
          {user.sns && <ProfileLink url={user.sns} />}
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
