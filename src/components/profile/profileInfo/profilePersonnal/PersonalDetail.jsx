import { ageMapping } from "../../../../util/ProfileTierMap";
import styles from "./PersonalDetail.module.css";

const PersonalDetail = ({ name, age, nickname }) => {
  console.log(name, age, nickname);
  return (
    <div className={styles.myProfile__info__personalDetail}>
      {/*이름*/}
      {nickname ? (
        <span className={styles.myProfile__info__name}>{nickname}</span>
      ) : (
        <span className={styles.myProfile__info__name}>{name}</span>
      )}

      {/*나이*/}
      {age && (
        <span className={styles.myProfile__info__age}>{ageMapping(age)}</span>
      )}
    </div>
  );
};

export default PersonalDetail;
