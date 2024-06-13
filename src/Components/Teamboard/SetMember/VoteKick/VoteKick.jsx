import KickMember from "../KickMember/KickMember";
import styles from "./VoteKick.module.css";

const Votekick = () => {
  return (
    <div className={styles.voteKick}>
      <div className={styles.voteKick}>강퇴 투표</div>
      <KickMember />
    </div>
  );
};

export default Votekick;
