import KickMember from "./VoteKickMember/VoteKickMember";
import styles from "./VoteKick.module.css";

const Votekick = () => {
  const voteKickmembers = [{ id: 1, name: "Tom BE" }];

  return (
    <div className={styles.voteKick}>
      <div className={styles.voteKick__label}>강퇴 투표</div>
      <div className={styles.voteKick__container}>
        {voteKickmembers.map((member) => (
          <KickMember key={member.id} memberName={member.name} />
        ))}
      </div>
    </div>
  );
};

export default Votekick;
