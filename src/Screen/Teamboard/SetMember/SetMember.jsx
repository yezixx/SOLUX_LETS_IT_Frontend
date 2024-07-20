import styles from "./SetMember.module.css";
import VoteSection from "./VoteSection/VoteSection";
import ReportSection from "./ReportSection/ReportSection";

const SetMember = () => {
  return (
    <div className={styles.setMember}>
      <VoteSection />
      <ReportSection />
    </div>
  );
};

export default SetMember;
