import styles from "./VoteSection.module.css";
import VoteItem from "./VoteItem/VoteItem";

const VoteSection = () => {
  const voteKickmembers = [{ id: 1, name: "Tom BE" }];

  return (
    <div className={styles.voteSection}>
      <div className={styles.voteSection__label}>강퇴 투표</div>
      <div className={styles.voteSection__item}>
        {voteKickmembers.map((member) => (
          <VoteItem key={member.id} memberName={member.name} />
        ))}
      </div>
    </div>
  );
};

export default VoteSection;
