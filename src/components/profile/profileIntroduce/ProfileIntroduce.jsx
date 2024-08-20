import styles from "./ProfileIntroduce.module.css";

const ProfileIntroduce = ({ introduce }) => {
  return (
    <div className={styles.myProfile__Introduce}>
      <div className={styles.myProfile__title}>INTRODUCE</div>
      <div className={styles.myProfile__content}>
        {introduce ? (
          <span>{introduce}</span>
        ) : (
          <span>프로필을 작성해 주세요</span>
        )}
      </div>
    </div>
  );
};

export default ProfileIntroduce;
