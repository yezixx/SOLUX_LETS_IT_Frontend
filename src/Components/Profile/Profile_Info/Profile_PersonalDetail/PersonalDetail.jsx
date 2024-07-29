import { ageMapping } from "../../ProfileTierMap";
import styles from "./PersonalDetail.module.css";

const PersonalDetail = ({ name, age }) => {
  return (
    <div className={styles.myProfile__info__personalDetail}>
      {/*이름*/}
      {name && <span className={styles.myProfile__info__name}>{name}</span>}

      {/*나이*/}
      {age && (
        <span className={styles.myProfile__info__age}>{ageMapping(age)}</span>
      )}
    </div>
  );
};

export default PersonalDetail;
