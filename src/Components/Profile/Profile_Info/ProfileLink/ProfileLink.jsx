import styles from "./ProfileLink.module.css";

const ProfileLink = ({ url }) => {
  return (
    <div className={styles.ProfileLink}>
      <div className={styles.ProfileLink__icon}>icon</div>
      <div className={styles.ProfileLink__link}>{url}</div>
    </div>
  );
};

export default ProfileLink;
