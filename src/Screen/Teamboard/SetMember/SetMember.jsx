import KickReport from "./KickReport/KickReport";
import styles from "./SetMember.module.css";
import Votekick from "./VoteKick/VoteKick";

const SetMember = () => {
  return (
    <div className={styles.setMember}>
      <Votekick />
      <KickReport />
    </div>
  );
};

export default SetMember;
