import { useEffect, useState } from "react";
import ProfileForm from "../../Components/ProfileForm/ProfileForm";
import StepBar from "../../Components/StepBar/StepBar";
import { getProfile, saveProfileImage } from "../../service/profileService";
import Loading from "../../Components/Loading/Loading";
import styles from "./CreateProfile.module.css";

const CreateProfile = () => {
  const loginUserInfo = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [userInfo, setUserInfo] = useState({
    nickname: "",
    bio: "",
    age: loginUserInfo.ageRange,
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

  const onSaveProfileImage = async (imageFile) => {
    try {
      await saveProfileImage(loginUserInfo.kakaoId, imageFile);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.createProfile}>
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
