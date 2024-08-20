import ProfileDefaultPhoto from "../../../../image/icons/ProfileDefaultPhoto";
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
        <div
          className={`${styles.myProfile__photo__circle} ${
            styles[`myProfile__photo__circle--${type}`]
          }`}
        >
          <ProfileDefaultPhoto />
        </div>
      )}
    </>
  );
};

export default ProfilePhoto;
