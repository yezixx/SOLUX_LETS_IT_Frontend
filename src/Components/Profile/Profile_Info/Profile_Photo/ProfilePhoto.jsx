import styles from "./ProfilePhoto.module.css";

const ProfilePhoto = ({ type, src }) => {
  return (
    <img
      src={src}
      alt="프로필 사진"
      className={`${styles.myProfile__photo} ${
        styles[`myProfile__photo--${type}`]
      }`}
    />
  );
};

export default ProfilePhoto;
