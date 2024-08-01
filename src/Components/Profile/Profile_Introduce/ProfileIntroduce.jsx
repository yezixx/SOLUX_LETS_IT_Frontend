import styles from "./ProfileIntroduce.module.css";

const ProfileIntroduce = ({ introduce }) => {
  return (
    <div className={styles.myProfile__Introduce}>
      <div className={styles.myProfile__title}>INTRODUCE</div>
      <div className={styles.myProfile__content}>
        {introduce && <span>{introduce}</span>}
      </div>
    </div>
  );
};

export default ProfileIntroduce;
