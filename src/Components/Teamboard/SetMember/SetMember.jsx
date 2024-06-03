import styles from "./SetMember.module.css";
import Votekick from "./VoteKick/VoteKick";

const SetMember = () => {
  return (
    <div className={styles.set_member__wrapper}>
      <Votekick />
    </div>
  );
};

export default SetMember;
