import { useEffect, useState } from "react";
import ProfileForm from "../../Components/ProfileForm/ProfileForm";
import StepBar from "../../Components/StepBar/StepBar";
import { getProfile, saveProfileImage } from "../../service/profileService";
import Loading from "../../Components/Loading/Loading";
import styles from "./CreateProfile.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const loginUserInfo = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const location = useLocation();
  const nav = useNavigate();
  const { to } = location.state || {};

  const navToApplt = () => {
    if (to) {
      nav(to);
    } else {
      nav("/");
    }
  };

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
        <ProfileForm
          init={userInfo}
          onSaveProfileImage={onSaveProfileImage}
          navTo={navToApplt}
        />
      </div>
    </div>
  );
};

export default CreateProfile;
