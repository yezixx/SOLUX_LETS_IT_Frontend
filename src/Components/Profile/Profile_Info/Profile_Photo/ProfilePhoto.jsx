import UserCircleIcon from "../../../../Image/Icons/UserCircleIcon";
import UserIcon from "../../../../Image/Icons/UserIcon";
import styles from "./ProfilePhoto.module.css";

const ProfilePhoto = ({ type, src }) => {
  return (
    <>
      {src ? (
        <img
          src={src}
          alt="프로필 사진"
          className={`${styles.myProfile__photo} ${
            styles[`myProfile__photo--${type}`]
          }`}
        />
      ) : (
        <div className={styles.myProfile__photo__circle}>
          <ProfilePhoto />
        </div>
      )}
    </>
  );
};

export default ProfilePhoto;
