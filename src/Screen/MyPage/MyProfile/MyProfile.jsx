import styles from "./MyProfile.module.css";
import Button from "../../../Components/Button/Button.jsx";
import Profile from "../../../Components/Profile/Profile.jsx";
import { useEffect, useState } from "react";
import { getProfile } from "../../../service/profileService.js";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile()
      .then((res) => {
        console.log(res.data); // 확인 필요
        setProfileData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(profileData);
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
