import styles from "./ProfileIntroduce.module.css";

const ProfileIntroduce = ({ introduce }) => {
  return (
    <div className={styles.myProfile__Introduce}>
      <div className={styles.myProfile__title}>INTRODUCE</div>
      {introduce && <span>{introduce}</span>}
    </div>
  );
};

export default ProfileIntroduce;
