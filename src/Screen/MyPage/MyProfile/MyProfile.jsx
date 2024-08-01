import styles from "./MyProfile.module.css";
import Button from "../../../Components/Button/Button.jsx";
import Profile from "../../../Components/Profile/Profile.jsx";
import { useNavigate } from "react-router-dom";
import useMyProfileGet from "./useMyProfileGet.js";

const MyProfile = () => {
  const navigate = useNavigate();
  const { profileData } = useMyProfileGet();
  return (
    <div className={styles.myProfile__contWrap}>
      {/*프로필 */}
      <Profile user={profileData} tooltipShow={true} />
      {/*수정 버튼 */}
      <Button text="수정" onClick={() => navigate("/profile/new")} />
    </div>
  );
};

export default MyProfile;
