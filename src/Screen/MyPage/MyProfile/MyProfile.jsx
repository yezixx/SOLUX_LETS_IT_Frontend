import styles from "./MyProfile.module.css";
import Button from "../../../Components/Button/Button.jsx";
import Profile from "../../../Components/Profile/Profile.jsx";
import { useEffect, useState } from "react";
import { getProfile } from "../../../service/profileService.js";

const MyProfile = () => {
  const [profileData, setProfileData] = useState(null);
  //로컬스토리지에서 user, userId 갖고 옴
  const user = localStorage.getItem("user");
  const userId = JSON.parse(user).userId;
  console.log(user);
  console.log(userId);

  useEffect(() => {
    getProfile(userId)
      .then((res) => {
        console.log(res); // 확인 필요
        setProfileData(res);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={styles.myProfile__contWrap}>
      {/*프로필 */}
      <Profile user={profileData} tooltipShow={true} />
      {/*수정 버튼 */}
      <Button text="수정" />
    </div>
  );
};

export default MyProfile;
