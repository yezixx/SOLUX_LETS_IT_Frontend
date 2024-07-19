import styles from "./VoteSection.module.css";
import VoteItem from "./VoteItem/VoteItem";
import { useContext } from "react";
import { TeamStateContext } from "../../Teamboard";

const VoteSection = () => {
  const { teamData } = useContext(TeamStateContext);
  const voteKickmembers = teamData.voteKickmembers;
  console.log(voteKickmembers);

  return (
    <div className={styles.voteSection}>
      <div className={styles.voteSection__label}>강퇴 투표</div>
      <div className={styles.voteSection__item}>
        {voteKickmembers.map(
          (member) =>
            member.name && (
              <VoteItem
                key={member.id}
                userId={member.userId}
                userName={member.name}
              />
            )
        )}
      </div>
    </div>
  );
};

export default VoteSection;
