import { useEffect, useState } from "react";
import ProfileForm from "../../Components/ProfileForm/ProfileForm";
import StepBar from "../../Components/StepBar/StepBar";
import { getProfile, saveProfileImage } from "../../service/profileService";
import Loading from "../../Components/Loading/Loading";
import styles from "./CreateProfile.module.css";

const CreateProfile = () => {
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    bio: "",
    age: "20~29",
    sns: [
      {
        type: "email",
        link: "",
      },
      {
        type: "github",
        link: "",
      },
    ],
    profileImage: "",
    mannerTier: "",
    introduce: "",
    skills: [
      {
        skillName: "",
        fluency: 50,
      },
      {
        skillName: "",
        fluency: 50,
      },
      {
        skillName: "",
        fluency: 50,
      },
      {
        skillName: "",
        fluency: 50,
      },
    ],
  });
  const [loading, setLoading] = useState(false);

  /*useEffect(() => {
    setLoading(true);
    try {
      const response = getProfile();
      setUserInfo(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("사용자 정보를 불러오는데 실패했습니다.");
      setLoading(false);
    }
  });*/

  const onSaveProfileImage = async (imageFile) => {
    try {
      await saveProfileImage(imageFile);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.createProfile}>
      {loading && <Loading />}
      <div className={styles.createProfile__stepBar}>
        <StepBar type="COMPLETE" />
      </div>
      <div className={styles.createProfile__profileForm}>
        <ProfileForm init={userInfo} onSaveProfileImage={onSaveProfileImage} />
      </div>
    </div>
  );
};

export default CreateProfile;
