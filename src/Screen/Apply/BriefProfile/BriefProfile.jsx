import Loading from "../../../Components/Loading/Loading";
import PersonalDetail from "../../../Components/Profile/Profile_Info/Profile_PersonalDetail/PersonalDetail";
import ProfilePhoto from "../../../Components/Profile/Profile_Info/Profile_Photo/ProfilePhoto";
import styles from "./BriefProfile.module.css";
const BriefProfile = ({ user }) => {
  if (!user) {
    return <Loading />;
  }
  return (
    <div className={styles.briefProfile}>
      <ProfilePhoto src={user.profileImageUrl} />
      {/*이름, 나이 */}
      <div className={styles.briefProfile__text}>
        <PersonalDetail
          nickname={user.nickname}
          name={user.name}
          age={user.age}
        />
        {/*바이오*/}
        <div className={styles.briefProfile__bio}>{user.bio}</div>
      </div>
    </div>
  );
};

export default BriefProfile;
